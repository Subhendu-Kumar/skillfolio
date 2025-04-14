import {
  doc,
  query,
  addDoc,
  orderBy,
  getDocs,
  updateDoc,
  arrayUnion,
  collection,
  serverTimestamp,
  limit,
  where,
  getDoc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebaseconfig";
import { Message } from "@/types";

export const createGroup = async (
  groupName: string,
  creatorId: string,
  creatorName: string,
  groupIconUrl: string
) => {
  const newGroup = {
    groupName,
    groupIconUrl,
    createdAt: serverTimestamp(),
    createdBy: creatorId,
    memberList: [
      {
        userId: creatorId,
        userName: creatorName,
      },
    ],
    memberIds: [creatorId],
  };
  const docRef = await addDoc(collection(db, "chat_groups"), newGroup);
  return docRef.id;
};

export const fetchGroups = async (userId: string) => {
  const snapshot = await getDocs(collection(db, "chat_groups"));
  if (snapshot.empty) return [];
  const groups = snapshot.docs
    .map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        groupName: data.groupName,
        groupIconUrl: data.groupIconUrl,
        memberIds: data.memberIds || [],
      };
    })
    .filter((group) => !group.memberIds.includes(userId));
  return groups.map(({ id, groupName, groupIconUrl }) => ({
    id,
    groupName,
    groupIconUrl,
  }));
};

export const joinGroup = async (
  groupId: string,
  userId: string,
  userName: string
) => {
  if (!userId || !userName || !groupId) {
    console.log("Invalid input to joinGroup", { userId, userName, groupId });
    return "Missing required fields";
  }
  try {
    const groupRef = doc(db, "chat_groups", groupId);
    const groupSnap = await getDoc(groupRef);
    const data = groupSnap.data();
    const alreadyJoined = data?.memberIds?.includes(userId);
    if (alreadyJoined) {
      return "User already a member";
    }
    await updateDoc(groupRef, {
      memberList: arrayUnion({ userId, userName }),
      memberIds: arrayUnion(userId),
    });
    return "Joined successfully";
  } catch (error) {
    console.log("Error joining group:", error);
    return "Failed to join group";
  }
};

export const fetchLatestMessage = async (groupId: string) => {
  const messagesRef = collection(db, "chat_groups", groupId, "messages");
  const q = query(messagesRef, orderBy("timestamp", "desc"), limit(1));
  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    const doc = snapshot.docs[0];
    const data = doc.data();
    return {
      id: doc.id,
      message: data.message,
      timestamp: data.timestamp.toDate(),
      senderId: data.senderId,
      senderName: data.senderName,
    };
  }
  return null;
};

export const fetchJoinedGroupsWithLatestMessage = async (userId: string) => {
  const q = query(
    collection(db, "chat_groups"),
    where("memberIds", "array-contains", userId)
  );
  const snapshot = await getDocs(q);
  const groupsWithMessages = await Promise.all(
    snapshot.docs.map(async (doc) => {
      const data = doc.data();
      const latestMessage = await fetchLatestMessage(doc.id);
      return {
        id: doc.id,
        groupName: data.groupName || "",
        groupIconUrl: data.groupIconUrl || "",
        latestMessage: latestMessage ? latestMessage : null,
      };
    })
  );
  return groupsWithMessages;
};

export const sendMessage = async (
  groupId: string,
  senderId: string,
  senderName: string,
  messageText: string
) => {
  try {
    const message = {
      senderId,
      senderName,
      messageText,
      timestamp: serverTimestamp(),
    };

    // Use a more reliable approach with doc() and setDoc() instead of addDoc()
    const messageRef = doc(collection(db, "chat_groups", groupId, "messages"));
    await setDoc(messageRef, message);

    // Update the last message in the group document
    await setDoc(
      doc(db, "chat_groups", groupId),
      {
        lastMessage: messageText,
        lastMessageTimestamp: serverTimestamp(),
        lastMessageSender: senderName,
      },
      { merge: true }
    );

    return true;
  } catch (error) {
    console.error("Error sending message:", error);
    return false;
  }
};

export const subscribeToMessages = (
  groupId: string,
  callback: (messages: Message[]) => void
) => {
  try {
    const q = query(
      collection(db, "chat_groups", groupId, "messages"),
      orderBy("timestamp", "desc") // Changed to desc since you're inverting the list
    );

    return onSnapshot(
      q,
      (snapshot) => {
        const messages = snapshot.docs.map((doc) => ({
          id: doc.id,
          senderId: doc.data().senderId || "",
          senderName: doc.data().senderName || "",
          messageText: doc.data().messageText || "",
          timestamp: doc.data().timestamp?.toDate() || new Date(),
        }));
        callback(messages);
      },
      (error) => {
        console.error("Error subscribing to messages:", error);
        callback([]); // Return empty array on error
      }
    );
  } catch (error) {
    console.error("Error setting up message subscription:", error);
    return () => {}; // Return empty function as unsubscribe
  }
};
