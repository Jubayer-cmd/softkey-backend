import { Prisma, User } from "@prisma/client";
import { IGenericResponse } from "../../../interface/common";
import { IPaginationOptions } from "../../../interface/pagination";
import { paginationHelpers } from "../../../utils/paginationHelper";
import prisma from "../../../utils/prisma";
import { IUserFilterRequest, userSearchableFields } from "./user.interface";

const getAllUser = async (
  filters: IUserFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<User[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: userSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }
  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.user.findMany({
    where: whereConditions,
    skip,
    take: limit,
  });

  const total = await prisma.user.count({
    where: whereConditions,
  });

  const totalPages = Math.ceil(total / Number(limit));
  return {
    meta: {
      total,
      page,
      limit,
      totalPages,
    },
    data: result,
  };
};

const getUserById = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const getSingleUser = async (
  id: string
): Promise<Omit<User, "password"> | {}> => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  const { password, ...rest } = user || {};
  return rest;
};

const updateIntoDB = async (
  id: string,
  payload: Partial<User>
): Promise<User> => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteFromDB = async (id: string): Promise<User> => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  return result;
};

export const userService = {
  getAllUser,
  getUserById,
  updateIntoDB,
  deleteFromDB,
  getSingleUser,
};
