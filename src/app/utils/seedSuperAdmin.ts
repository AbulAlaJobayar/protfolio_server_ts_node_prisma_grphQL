import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import AppError from "../shared/AppError";
import httpStatus from "http-status";

const prisma = new PrismaClient();

async function main() {
  const superAdminEmail = "abulalajobayar@gmail.com";

  // Check if super admin already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: superAdminEmail },
  });

  if (existingUser) {
    throw new AppError(httpStatus.CONFLICT, "Super admin already exists.");
  }

  const hashedPassword = await bcrypt.hash("jobayar12345@", 10);

  await prisma.user.create({
    data: {
      name: "Abul Ala Jobayar",
      email: superAdminEmail,
      password: hashedPassword,
      photo: "https://i.ibb.co/cCNWdT6/about.jpg",
      description:
        "Hello, I am Abul Ala Jobayar, a Full Stack Developer with expertise in Node.js, Express.js, React.js, and MongoDB. I have a passion for building scalable web applications and delivering high-quality software solutions.",
      role: "admin",
    },
  });

  console.log("✅ Super admin created.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
