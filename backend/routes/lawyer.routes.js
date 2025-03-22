const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Tesseract = require("tesseract.js");
const Lawyer = require("../models/lawyer.models");

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = "uploads/lawyerDocs/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF, JPG, and PNG files are allowed!"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Dummy lawyer database (replace with actual DB/API verification)
const lawyerDatabase = [
  { licenseNumber: "123456", name: "John Doe", status: "active" },
  { licenseNumber: "789101", name: "Jane Smith", status: "active" },
];

// Function to verify document
async function verifyDocument(documentPath) {
  try {
    // Step 1: Validate File Type
    const allowedFormats = ["pdf", "png", "jpeg", "jpg"];
    const fileExtension = documentPath.split(".").pop().toLowerCase();
    if (!allowedFormats.includes(fileExtension)) {
      return { success: false, message: "Invalid file format" };
    }

    // Step 2: Extract Text Using OCR
    const { data: ocrResult } = await Tesseract.recognize(documentPath, "eng");
    const extractedText = ocrResult.text;

    // Step 3: Extract License Details
    const licenseMatch = extractedText.match(/License Number:\s*(\d+)/);
    const nameMatch = extractedText.match(/Name:\s*([A-Za-z\s]+)/);

    if (!licenseMatch || !nameMatch) {
      return { success: false, message: "Could not extract license details" };
    }

    const licenseNumber = licenseMatch[1];
    const lawyerName = nameMatch[1].trim();

    // Step 4: Cross-check with Registry API or Database
    const lawyer = lawyerDatabase.find(
      (l) => l.licenseNumber === licenseNumber && l.name === lawyerName
    );

    if (lawyer && lawyer.status === "active") {
      return { success: true, message: "License verified successfully", licenseNumber, lawyerName };
    } else {
      return { success: false, message: "Invalid or unverified license" };
    }
  } catch (error) {
    console.error("Verification Error:", error);
    return { success: false, message: "Verification failed" };
  }
}

// Routes

router.get("/signin", (req, res) => {
  res.send("Signin page");
});

router.get("/verify", (req, res) => {
  res.send("Verify page");
});

router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/lawyer/signin");
});

// Lawyer Sign-in Route
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await Lawyer.matchPasswordAndGenerateToken(email, password);
    return res.cookie("token", token).json({ success: true, message: "Signed in successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Lawyer Signup Route (Now triggered inside verify)
// router.post("/signup", async (req, res) => {
//   try {
//     const { fullName, email, phone, password, document } = req.body;

//     const newLawyer = await Lawyer.create({
//       fullName,
//       email,
//       phone,
//       password,
//       document,
//       isVerified: true,
//     });

//     return res.status(201).json({ success: true, message: "Signup successful", lawyer: newLawyer });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Signup failed", error });
//   }
// });

// Lawyer Document Verification & Auto Signup
router.post("/verify", upload.single("document"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No document uploaded" });
    }

    const documentPath = req.file.path;
    const { fullName, email, phone, password } = req.body; // Get other lawyer details

    const verificationResult = await verifyDocument(documentPath);

    if (!verificationResult.success) {
      return res.status(400).json({ success: false, message: verificationResult.message });
    }

    // If document is valid, trigger signup
    const newLawyer = await Lawyer.create({
      fullName,
      email,
      phone,
      password,
      document: documentPath,
      isVerified: true,
    });

    res.status(201).json({ success: true, message: "Verification successful, lawyer registered", lawyer: newLawyer });
  } catch (error) {
    res.status(500).json({ success: false, message: "Verification failed", error });
  }
});

module.exports = router;
