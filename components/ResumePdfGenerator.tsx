import {
  View,
  Text,
  Alert,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import * as Print from "expo-print";
import React, { useState } from "react";
import * as Sharing from "expo-sharing";
import { EnhancedResume } from "@/types";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

export default function ResumePdfGenerator({
  resumeData,
}: {
  resumeData: EnhancedResume;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [savedFilePath, setSavedFilePath] = useState<string | null>(null);

  // Check and request storage permissions
  const requestPermissions = async () => {
    if (Platform.OS === "ios") {
      return true; // iOS doesn't need explicit permission for sharing
    }
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      return status === "granted";
    } catch (error) {
      console.error("Error requesting permissions:", error);
      return false;
    }
  };

  // Generate HTML with resume data
  const createResumeHTML = (data: EnhancedResume) => {
    // Extract data from the resume object
    const { personal_info, summary, skills, experience, education, projects } =
      data;

    // Create skills HTML
    const skillsHTML = skills
      .map((skill) => `<span class="skill-tag">${skill}</span>`)
      .join("");

    // Create experience HTML
    const experienceHTML = experience
      .map(
        (exp) => `
      <div class="experience-item">
        <div class="job-header">
          <h3>${exp.company}</h3>
          <span class="date">${exp.dates}</span>
        </div>
        <div class="job-role">${exp.role}</div>
        <ul class="responsibilities">
          <li>${exp.responsibilities}</li>
        </ul>
      </div>
    `
      )
      .join("");

    // Create education HTML
    const educationHTML = education
      .map(
        (edu) => `
      <div class="education-item">
        <div class="education-header">
          <h3>${edu.institution}</h3>
          <span class="date">${edu.dates}</span>
        </div>
        <div class="degree">${edu.degree}</div>
      </div>
    `
      )
      .join("");

    // Create projects HTML
    const projectsHTML = projects
      .map(
        (project) => `
      <div class="project-item">
        <h3>${project.title}</h3>
        <div class="tech-stack"><strong>Tech Stack:</strong> ${project.tech_stack}</div>
        <p class="project-desc">${project.description}</p>
      </div>
    `
      )
      .join("");

    // Complete HTML with styling
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        <style>
          body {
            font-family: 'Helvetica', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          
          .resume-header {
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 2px solid #3498db;
            padding-bottom: 15px;
          }
          
          .name {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 5px;
            color: #2c3e50;
          }
          
          .contact-info {
            font-size: 14px;
            color: #555;
            margin-bottom: 10px;
          }
          
          .contact-info span {
            margin: 0 8px;
          }
          
          .section {
            margin-bottom: 25px;
          }
          
          .section-title {
            font-size: 20px;
            font-weight: bold;
            border-bottom: 1px solid #ddd;
            padding-bottom: 5px;
            color: #3498db;
            margin-bottom: 15px;
          }
          
          .summary {
            text-align: justify;
          }
          
          .skill-tags {
            display: flex;
            flex-wrap: wrap;
          }
          
          .skill-tag {
            background-color: #edf2f7;
            border-radius: 4px;
            padding: 4px 10px;
            margin: 4px;
            font-size: 14px;
            display: inline-block;
          }
          
          .experience-item, .education-item, .project-item {
            margin-bottom: 20px;
          }
          
          .job-header, .education-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 5px;
          }
          
          .job-header h3, .education-header h3 {
            margin: 0;
            font-size: 18px;
            color: #2c3e50;
          }
          
          .job-role, .degree {
            font-weight: 500;
            font-style: italic;
            margin-bottom: 10px;
          }
          
          .date {
            color: #7f8c8d;
            font-size: 14px;
          }
          
          .responsibilities {
            padding-left: 20px;
            margin: 10px 0;
          }
          
          .responsibilities li {
            margin-bottom: 5px;
          }
          
          .tech-stack {
            font-size: 14px;
            margin-bottom: 5px;
            color: #555;
          }
          
          .project-desc {
            text-align: justify;
            margin-top: 5px;
            font-size: 15px;
          }
          
          .additional-info {
            font-style: italic;
            text-align: center;
            margin-top: 30px;
            color: #7f8c8d;
          }
        </style>
      </head>
      <body>
        <div class="resume-header">
          <div class="name">${personal_info.name}</div>
          <div class="contact-info">
            <span>${personal_info.email}</span> | 
            <span>${personal_info.phone}</span> | 
            <span>${personal_info.linkedin}</span> |
            <span>${personal_info.github}</span>
          </div>
        </div>

        <div class="section">
          <div class="section-title">SUMMARY</div>
          <div class="summary">${summary}</div>
        </div>

        <div class="section">
          <div class="section-title">SKILLS</div>
          <div class="skill-tags">${skillsHTML}</div>
        </div>

        <div class="section">
          <div class="section-title">EXPERIENCE</div>
          ${experienceHTML}
        </div>

        <div class="section">
          <div class="section-title">EDUCATION</div>
          ${educationHTML}
        </div>

        <div class="section">
          <div class="section-title">PROJECTS</div>
          ${projectsHTML}
        </div>

        <div class="additional-info">
          Generated on ${new Date().toLocaleDateString()}
        </div>
      </body>
      </html>
    `;
  };

  // Generate and save PDF
  const generateResumePDF = async () => {
    try {
      setIsLoading(true);
      // Request storage permissions - needs to be WRITE_EXTERNAL_STORAGE for Android
      const hasPermission = await requestPermissions();
      if (!hasPermission && Platform.OS === "android") {
        Alert.alert(
          "Permission Denied",
          "Storage permission is required to save the PDF.",
          [{ text: "OK" }]
        );
        setIsLoading(false);
        return;
      }
      // Generate HTML from resume data
      const html = createResumeHTML(resumeData);
      // Convert HTML to PDF
      const { uri } = await Print.printToFileAsync({
        html,
        base64: false,
      });
      console.log("Generated PDF URI:", uri);
      // Generate filename
      const name = resumeData.personal_info.name.replace(/\s+/g, "_");
      const timestamp = new Date().getTime();
      const filename = `${name}_Resume_${timestamp}.pdf`;
      // For Android API level 29+ (Android 10+)
      if (
        Platform.OS === "android" &&
        parseInt(String(Platform.Version), 10) >= 29
      ) {
        try {
          const permissions =
            await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
          if (permissions.granted) {
            // Get the Downloads directory
            const downloadUri = permissions.directoryUri;
            // Create new file in Download directory
            const destinationUri =
              await FileSystem.StorageAccessFramework.createFileAsync(
                downloadUri,
                filename,
                "application/pdf"
              );
            // Read the PDF content
            const pdfContent = await FileSystem.readAsStringAsync(uri, {
              encoding: FileSystem.EncodingType.Base64,
            });
            // Write to the destination file
            await FileSystem.StorageAccessFramework.writeAsStringAsync(
              destinationUri,
              pdfContent,
              { encoding: FileSystem.EncodingType.Base64 }
            );
            setSavedFilePath(destinationUri);
            Alert.alert(
              "Success",
              `Resume PDF saved to Downloads as "${filename}"`
            );
          } else {
            // Fall back to sharing
            await Sharing.shareAsync(uri);
          }
        } catch (error) {
          console.error("SAF error:", error);
          // Fallback to sharing
          await Sharing.shareAsync(uri);
        }
      } else {
        // On iOS, share instead of direct save
        await Sharing.shareAsync(uri, {
          UTI: ".pdf",
          mimeType: "application/pdf",
          dialogTitle: `Share ${filename}`,
        });
        setSavedFilePath(uri);
      }
    } catch (error: any) {
      console.error("Error generating PDF:", error);
      Alert.alert(
        "Error",
        "Failed to generate or save the PDF. " +
          (error.message || "Unknown error")
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="w-full flex-1 p-3">
      <TouchableOpacity
        className="w-full py-2 rounded-md bg-violet-500 items-center justify-center"
        activeOpacity={0.8}
        onPress={generateResumePDF}
        disabled={isLoading}
      >
        <Text className="text-xl text-white text-center font-pregular">
          Generate Resume PDF
        </Text>
      </TouchableOpacity>
      {isLoading && (
        <View className="w-full h-20 items-center justify-center mt-6">
          <ActivityIndicator size="large" color="#3498db" />
          <Text className="text-xl font-psemibold text-purple-500 mt-2">
            ......generating......
          </Text>
        </View>
      )}
    </View>
  );
}
