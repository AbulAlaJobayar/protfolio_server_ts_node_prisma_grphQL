import {Skill } from "@prisma/client";
import prisma from "../../shared/prisma";

const createSkillIntoDB = async (payload: Skill, id: string) => {
  const result = await prisma.skill.create({ data: payload });
  return result;
};
const getSkillFromDB = async () => {
  const result = await prisma.skill.findMany({ include: { user: true } });
  return result;
};

export const SkillService = {
        createSkillIntoDB,
        getSkillFromDB,
};
