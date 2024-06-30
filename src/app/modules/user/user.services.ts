import { User } from "@prisma/client";
import prisma from "../../../shared/prisma";
import config from "../../config";
import bcrypt from "bcrypt";

const createUserIntoDB = async (payload: User) => {
  console.log("services",payload.password)
        const hashedPassword = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_round)
  );
  const result = await prisma.user.create({
    data: { ...payload, password: hashedPassword },
  });
  return result;
};
const getUserFromDB = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: { id: id },
  });
  return result;
};
export const userServices = {
  createUserIntoDB,
  getUserFromDB,
};
