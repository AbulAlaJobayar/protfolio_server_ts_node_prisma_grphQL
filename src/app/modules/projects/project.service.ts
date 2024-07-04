import { Project } from "@prisma/client";
import prisma from "../../shared/prisma";

const createProjectIntoDB = async (payload: Project, id: string) => {
  const result = await prisma.project.create({ data: payload });
  return result;
};
const getProjectFromDB = async () => {
  const result = await prisma.project.findMany({ include: { user: true } });
  return result;
};
const getSingleProjectFromDB = async (id: string) => {
  const result = await prisma.project.findUniqueOrThrow({
    where: {
      id: id,
    },
   
  });
 return result
};

export const ProjectService = {
  createProjectIntoDB,
  getProjectFromDB,
  getSingleProjectFromDB,
};
