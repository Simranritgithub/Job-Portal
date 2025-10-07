import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary"; // Cloudinary for file upload
import getDataUri from "../utils/datauri.js"; // Utility to get file URI from the buffer
import { singleUpload } from "../middlewares/multer.js"; // Multer middleware for file handling

// Register a new user
export const register = async (req, res) => {
  try {
    const { fullname, email, mobileno, password, role } = req.body;

    if (!fullname || !email || !mobileno || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      mobileno,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error in register:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with this role",
        success: false,
      });
    }

    // Create Token
    const tokenData = { userId: user._id };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" });

    const userData = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      mobileno: user.mobileno,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,
        sameSite: "Strict",
      })
      .header("Authorization", `Bearer ${token}`)
      .json({
        message: `Welcome back, ${user.fullname}`,
        user: userData,
        token,
        success: true,
      });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// Logout user
export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({
        message: "Logout successful",
        success: true,
      });
  } catch (error) {
    console.error("Error in logout:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// Update user profile (including file upload)
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, mobileno, bio, skills } = req.body;
    const file = req.file; // Assuming the file is being sent as multipart form-data

    if (!req.user?.id) {
      return res.status(401).json({
        message: "Unauthorized access",
        success: false,
      });
    }

    // Find the user by ID
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Handle file upload if a file is provided
    let resume = user.profile?.resume;
    let resumeOriginalName = user.profile?.resumeOriginalName;

    if (file) {
      // Use getDataUri to process the file
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

      // If file uploaded successfully to Cloudinary, update the user's profile
      resume = cloudResponse.secure_url;
      resumeOriginalName = file.originalname;
    }

    // Update user data (excluding the file for now)
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (mobileno) user.mobileno = mobileno;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skills.split(",").map((s) => s.trim());

    // Update the resume URL if a file was uploaded
    if (resume) {
      user.profile.resume = resume;
      user.profile.resumeOriginalName = resumeOriginalName;
    }

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        mobileno: user.mobileno,
        role: user.role,
        profile: user.profile,
      },
      success: true,
    });
  } catch (error) {
    console.error("Error in updateProfile:", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// Upload Resume (Handle file upload)
export const uploadResume = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.user?.id) {
      return res.status(401).json({
        message: "Unauthorized access",
        success: false,
      });
    }

    // Find the user by ID
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const file = req.file; // Access the uploaded file from the request

    if (!file) {
      return res.status(400).json({
        message: "No file uploaded",
        success: false,
      });
    }

    // Process file upload to Cloudinary
    const fileUri = getDataUri(file); // Assuming you have a utility for this
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    // If file uploaded successfully, update user profile with resume URL
    user.profile.resume = cloudResponse.secure_url; // Save Cloudinary URL in profile
    user.profile.resumeOriginalName = file.originalname; // Store the original file name

    await user.save();

    return res.status(200).json({
      message: "Resume uploaded successfully",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        mobileno: user.mobileno,
        role: user.role,
        profile: user.profile,
      },
      success: true,
    });
  } catch (error) {
    console.error("Error in uploadResume:", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
