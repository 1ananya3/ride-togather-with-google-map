import { prisma } from "../config/prisma";

interface GoogleUserData {
  googleId: string;
  email: string;
  name: string;
  profileImage?: string;
}

export async function findOrCreateUser(data: GoogleUserData) {
  const existingUser = await prisma.user.findUnique({
    where: {
      googleId: data.googleId,
    },
  });

  if (existingUser) {
    return existingUser;
  }

  return prisma.user.create({
    data: {
      googleId: data.googleId,
      email: data.email,
      name: data.name,
      profileImage: data.profileImage,
    },
  });
}