import { JwtPayload, Secret } from "jsonwebtoken";
import httpStatus from "http-status";
import * as bcrypt from "bcrypt";
import { jwtHelper } from "../../helper/jwtHelper";

import { TChangePassword } from "./auth.constants";
import prisma from "../../shared/prisma";
import config from "../../config";
import AppError from "../../shared/AppError";

const loginUser = async (payload: { email: string; password: string }) => {
  //find valid user
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });
  //check password
  const checkPassword = await bcrypt.compare(
    payload.password,
    userData.password
  );
  if (!checkPassword) {
    throw new AppError(httpStatus.NOT_FOUND, "Password is incorrect");
  }
  // Token Data
  const tokenData = {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    role: userData.role,
  };

  const accessToken = jwtHelper.generateToken(
    tokenData,
    config.jwt.jwt_access_secret as Secret,
    config.jwt.jwt_access_expire_in as string
  );
  const refreshToken = jwtHelper.generateToken(
    tokenData,
    config.jwt.jwt_refresh_secret as Secret,
    config.jwt.jwt_refresh_expire_in as string
  );
  return {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    token: accessToken,
    refreshToken,
  };
};
const refreshToken = async (token: string) => {
  const verifiedUser = jwtHelper.verifyToken(
    token,
    config.jwt.jwt_refresh_secret as Secret
  ) as JwtPayload;
  if (!verifiedUser) {
    throw new AppError(httpStatus.UNAUTHORIZED, "user Unauthorized");
  }
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: verifiedUser.id,
    },
  });
  // Token Data
  const tokenData = {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    role: userData.role,
  };

  const accessToken = jwtHelper.generateToken(
    tokenData,
    config.jwt.jwt_access_secret as Secret,
    config.jwt.jwt_access_expire_in as string
  );
  return accessToken;
};

const changedPassword = async (user: JwtPayload, payload: TChangePassword) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: user.id,
    },
  });

  const isValidPassword = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );
  if (!isValidPassword) {
    throw new AppError(httpStatus.FORBIDDEN, "password do not match");
  }
  const hashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_round)
  );
  await prisma.user.update({
    where: {
      id: userData.id,
    },
    data: {
      password: hashedPassword,
    },
  });
  return null;
};


export const authService = {
  loginUser,
  refreshToken,
  changedPassword,
};
