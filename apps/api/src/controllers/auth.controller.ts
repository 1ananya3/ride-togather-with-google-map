import { Request, Response } from "express";

import { verifyGoogleToken } from "../services/google-auth.service";
import { findOrCreateUser } from "../services/auth.service";
import { generateAccessToken } from "../utils/jwt";

export async function googleLogin(
  req: Request,
  res: Response
) {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        message: "Google credential is required",
      });
    }

    const googleUser = await verifyGoogleToken(
      credential
    );

    const user = await findOrCreateUser(googleUser);

    const token = generateAccessToken(user.id);

    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
      },
      token,
    });
  } catch (error) {
    console.error("Google login error:", error);

    return res.status(401).json({
      message: "Google authentication failed",
    });
  }
}