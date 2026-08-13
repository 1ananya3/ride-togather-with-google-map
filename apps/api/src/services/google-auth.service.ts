import { OAuth2Client } from "google-auth-library";

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);

interface GoogleUser {
  googleId: string;
  email: string;
  name: string;
  profileImage?: string;
}

export async function verifyGoogleToken(
  credential: string
): Promise<GoogleUser> {
  const ticket = await googleClient.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  if (!payload) {
    throw new Error("Invalid Google token");
  }

  if (!payload.sub || !payload.email || !payload.name) {
    throw new Error("Incomplete Google user information");
  }

  return {
    googleId: payload.sub,
    email: payload.email,
    name: payload.name,
    profileImage: payload.picture,
  };
}