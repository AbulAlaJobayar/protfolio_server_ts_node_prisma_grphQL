import { Experience } from "@prisma/client";
import prisma from "../../../shared/prisma";

const createExperienceIntoDB = async (payload: Experience, id: string) => {
//   payload.userId = id;
console.log(payload)
  const result = await prisma.experience.create({
    data: payload,
  });
  return result;
};
const getExperienceFromDB = async () => {
  const result = await prisma.experience.findMany({include:{user:true}});
  return result;
};

export const ExperienceService = {
  createExperienceIntoDB,
  getExperienceFromDB,
};
