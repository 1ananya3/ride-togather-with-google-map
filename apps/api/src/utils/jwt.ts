import jwt, { type SignOptions } from "jsonwebtoken";

interface JwtPayload {
  userId: number;
}

export function generateAccessToken(userId: number) {
  const secret = process.env.JWT_SECRET as string;
  return jwt.sign(
    {
      userId,
    },
    secret,
    {
      expiresIn: "7d",
    }
  );
}
