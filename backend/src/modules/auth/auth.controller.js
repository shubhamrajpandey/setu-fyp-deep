import User from "../user/user.model.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    if (!name || !email || !password || !confirmPassword) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "All fields are required.",
      });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "User already exists.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);
    const hashConfirmPass = await bcrypt.hash(confirmPassword, salt);

    if (hashPass !== hashConfirmPass) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Passwords do not match.",
      });
    }

    const user = await User.create({
      name,
      email,
      password: hashPass,
      confirmPassword: hashConfirmPass,
    });

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "User registered successfully.",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "User not found. Please register first.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid password.",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10h",
    });

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "User logged in successfully.",
      data: user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
