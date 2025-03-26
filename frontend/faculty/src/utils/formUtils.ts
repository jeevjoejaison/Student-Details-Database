import axios from "axios";

/**
 * Form utilities for the student management system
 */

// Dropdown options for various forms
export const formDropdowns = {
  awards: [
    "First Place",
    "Second Place",
    "Third Place",
    "Honorable Mention",
    "Best Performance",
    "Best Project",
    "Merit Award",
    "None"
  ],
  categories: [
    "Music",
    "Dance",
    "Drama",
    "Art",
    "Debate",
    "Quiz",
    "Technical",
    "Other"
  ],
  participationType: [
    "Individual",
    "Team",
    "College Representative"
  ],
  hiringMode: [
    "On-Campus",
    "Off-Campus",
    "Internship Conversion",
    "Referral"
  ],
  companyCore: [
    "Yes",
    "No"
  ],
  societyCategory: [
    "Technical",
    "Cultural",
    "Sports",
    "Social Service",
    "Academic"
  ],
  membershipType: [
    "Core Team",
    "Volunteer",
    "Member",
    "President",
    "Vice President",
    "Secretary",
    "Treasurer"
  ],
  researchPaperType: [
    "Journal Article",
    "Conference Paper"
  ]
};

export const fetchDropdownOptions = async (category: any, dropdownName: any) => {
  try {
      const response = await axios.get('http://localhost:8080/dropdown/fetch', {
          params: { category, dropdownName }
      });
      return response.data;  // Return the fetched dropdown options
  } catch (error) {
      console.error("Error fetching dropdown data:", error);
      return [];  // Return an empty array in case of error
  }
};

// Mock API call to submit form data
export const submitForm = async (formType: string, formData: FormData): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axios.post(`http://localhost:8080/${formType}/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Required for FormData
      },
    });

    return {
      success: true,
      message: response.data.message || `${formType} data submitted successfully!`,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "An error occurred while submitting the form.",
    };
  }
};

// Mock API call to fetch form data
export const fetchFormData = async (formType: string, userId: any) => {
  try {
    const response = await axios.get(`http://localhost:8080/${formType}/get-all`, {
      params: { studentId: userId }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching cultural events:", error);
    return [];
  }
};

export const handleDownloadProof = (proof: string, eventName: any) => {
  if (!proof) {
    alert("No proof file available for this event.");
    return;
  }

  try {
    // Extract MIME type from Base64 (if available)
    const matches = proof.match(/^data:(.*?);base64,/);
    let mimeType = matches ? matches[1] : "application/octet-stream"; // Default fallback type
    let base64Data = proof.replace(/^data:.*?;base64,/, ""); // Remove the data prefix if present

    // Convert Base64 to Binary Data
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Uint8Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    // Create a Blob
    const blob = new Blob([byteNumbers], { type: mimeType });
    const url = URL.createObjectURL(blob);

    // Determine File Extension
    let extension = mimeType.split("/")[1] || "file"; // Extract extension (e.g., pdf, png, jpeg)
    if (extension === "jpeg") extension = "jpg"; // Normalize JPEG

    // Create a download link
    const link = document.createElement("a");
    link.href = url;
    link.download = `${eventName}_proof.${extension}`; // Set filename with correct extension
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading proof file:", error);
    alert("Failed to download proof file.");
  }
};



// Validate required fields
export const validateRequiredFields = (data: any, requiredFields: string[]): { valid: boolean, missingFields: string[] } => {
  const missingFields = requiredFields.filter(field => !data[field]);
  return {
    valid: missingFields.length === 0,
    missingFields
  };
};

// Format date for display
export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
