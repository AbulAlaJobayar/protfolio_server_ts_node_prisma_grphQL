import {Blog } from "@prisma/client";
import prisma from "../../shared/prisma";

const createBlogIntoDB = async (payload: Blog, id: string) => {
  const result = await prisma.blog.create({ data: payload });
  return result;
};
const getBlogFromDB = async () => {
  const result = await prisma.blog.findMany({ include: { user: true } });
  return result;
};

export const BlogService = {
        createBlogIntoDB,
        getBlogFromDB,
};
