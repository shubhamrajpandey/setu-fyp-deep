import Otp from "./otp.model.js";
import bcrypt from "bcrypt";
import sendEmail from "../../services/mail.service.js";
import { StatusCodes } from "http-status-codes";
import User from "../users/user.model.js";

export const generateOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const hashedOtp = await bcrypt.hash(otp.toString(), 10);

    const otpDoc = await Otp.create({
      user: user._id,
      otp: hashedOtp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    await sendEmail(
      email,
      "SETU - OTP Verification",
      `Your OTP is: ${otp}`,
      `
  <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: auto; border:1px solid #e5e7eb; border-radius:14px; overflow:hidden; box-shadow:0 6px 18px rgba(0,0,0,0.06); background-color:#ffffff;">
    
    <div style="background: linear-gradient(135deg, #0f9d58, #16a34a); color:#ffffff; text-align:center; padding:28px 20px;">
      <h1 style="margin:0; font-size:30px; letter-spacing:1px; font-weight:700;">
        SETU
      </h1>
      <p style="margin:8px 0 0; font-size:14px; opacity:0.9;">
        Connecting Donors. Empowering Communities.
      </p>
    </div>

    <div style="padding:40px 28px; text-align:center; color:#1f2937;">
      <h2 style="margin-bottom:14px; font-size:22px; color:#16a34a;">
        OTP Verification
      </h2>

      <p style="margin:0 0 24px; font-size:15px; line-height:1.6; color:#4b5563;">
        Use the One-Time Password (OTP) below to continue securely with your SETU account.
      </p>

      <div style="display:inline-block; background:#f0fdf4; border:2px solid #16a34a; border-radius:12px; padding:18px 48px; margin:20px 0;">
        <span style="font-size:38px; font-weight:700; color:#16a34a; letter-spacing:6px;">
          ${otp}
        </span>
      </div>

      <p style="margin:18px 0 0; font-size:14px; color:#6b7280;">
        This OTP is valid for <strong style="color:#16a34a;">10 minutes</strong>.
      </p>

      <p style="margin:8px 0 0; font-size:13px; color:#9ca3af;">
        Do not share this code with anyone. SETU will never ask for your OTP.
      </p>
    </div>

    <div style="height:1px; background:#e5e7eb;"></div>

    <div style="background-color:#f9fafb; text-align:center; padding:18px; font-size:13px; color:#6b7280;">
      &copy; 2026 <span style="color:#16a34a; font-weight:600;">SETU</span>. All rights reserved.
      <br/>
      Building trust through transparency.
    </div>

  </div>
  `,
    );

    console.log(`OTP sent to ${email}: ${otp}`);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "OTP sent successfully",
      otpRequested: otpDoc._id,
      userId: user._id,
    });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Internal server error" });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { otpRequested, otp, newPassword } = req.body;

    if (!otpRequested || !otp || !newPassword) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "OTP, request ID, and new password are required." });
    }

    const otpDoc = await Otp.findOne({
      _id: otpRequested,
      used: false,
      expiresAt: { $gt: new Date() },
    });

    if (!otpDoc) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Invalid or expired OTP request." });
    }

    const isOtpValid = await bcrypt.compare(otp.toString(), otpDoc.otp);
    if (!isOtpValid) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid OTP" });
    }

    const user = await User.findById(otpDoc.user);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    otpDoc.used = true;
    await otpDoc.save();

    res
      .status(StatusCodes.OK)
      .json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Internal server error" });
  }
};
