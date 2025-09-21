import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
  Image,
} from "@react-pdf/renderer";
import { formatNumber } from "@/lib/utils";

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#8B857B", // Taupe background
    padding: 20,
    fontFamily: "Helvetica",
  },
  container: {
    flex: 1,
    border: "3px solid white",
    borderRadius: "12px",
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: "100%",
    height: 50,
    marginBottom: 20,
    alignSelf: "center",
    objectFit: "contain",
  },
  title: {
    fontSize: 28,
    color: "#2C2C2C",
    marginBottom: 60,
    fontWeight: "normal",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#2C2C2C",
    marginBottom: 40,
    textAlign: "center",
  },
  name: {
    fontSize: 24,
    color: "#2C2C2C",
    fontWeight: "normal",
    marginBottom: 30,
    textAlign: "center",
  },
  country: {
    fontSize: 16,
    color: "#2C2C2C",
    marginBottom: 40,
    textAlign: "center",
  },
  descriptionContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  description: {
    fontSize: 12,
    color: "#3C3C3C",
    textAlign: "center",
    marginBottom: 5,
    lineHeight: 1.5,
  },
  points: {
    fontSize: 10,
    color: "#3C3C3C",
    marginTop: 10,
    marginBottom: 20,
  },
  team: {
    fontSize: 14,
    color: "#3C3C3C",
  },
});

// Certificate Component
const CertificateDocument = ({ researcher }) => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          src="/lovable-uploads/dd13495d-882c-427e-b730-432eff1e26aa.png"
        />

        <Text style={styles.title}>Certificate of Appreciation</Text>

        <Text style={styles.subtitle}>This certificate is awarded to:</Text>

        <Text style={styles.name}>{researcher.name}</Text>

        <Text style={styles.country}>From: {researcher.country}</Text>

        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            For outstanding contributions to cybersecurity research
          </Text>
          <Text style={styles.description}>
            and being a valued member of our Hall of Fame since{" "}
            {researcher.firstBugYear}.
          </Text>
        </View>

        <Text style={styles.points}>
          Total Points: {formatNumber(researcher.points, "comma")}
        </Text>

        <Text style={styles.team}>Bug Bounty Syria Team</Text>
      </View>
    </Page>
  </Document>
);

// Updated generatePDF function using react-pdf with proper async handling
const generatePDF = async (researcher) => {
  try {
    // Generate the PDF blob
    const blob = await pdf(
      <CertificateDocument researcher={researcher} />
    ).toBlob();

    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${researcher.name}_certificate.pdf`;

    // Trigger download
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};

export { generatePDF, CertificateDocument };
