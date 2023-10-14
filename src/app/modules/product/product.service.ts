import { Prisma, Product } from "@prisma/client";
import { IGenericResponse } from "../../../interface/common";
import { IPaginationOptions } from "../../../interface/pagination";
import { paginationHelpers } from "../../../utils/paginationHelper";
import prisma from "../../../utils/prisma";
import {
  IProductFilterRequest,
  productRelationalFields,
  productRelationalFieldsMapper,
  productSearchableFields,
} from "./product.constants";

const insertIntoDB = async (data: Product): Promise<Product> => {
  const result = await prisma.product.create({
    data,
  });
  return result;
};

const getAllProducts = async (
  filters: IProductFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Product[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const { search, maxPrice, minPrice, category, ...filterData } = filters;

  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: productSearchableFields.map((field) => ({
        [field]: {
          contains: search,
          mode: "insensitive",
        },
      })),
    });
  }

  if (minPrice !== undefined) {
    andConditions.push({
      price: {
        gte: parseFloat(minPrice.toString()),
      },
    });
  }

  if (maxPrice !== undefined) {
    andConditions.push({
      price: {
        lte: parseFloat(maxPrice.toString()),
      },
    });
  }

  if (category) {
    andConditions.push({
      categoryId: category,
    });
  }
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => {
        if (productRelationalFields.includes(key)) {
          return {
            [productRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else if (productSearchableFields.includes(key)) {
          return {
            [key]: {
              contains: (filterData as any)[key],
              mode: "insensitive",
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.ProductWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.product.findMany({
    include: {
      Category: true,
    },
    skip,
    take: Number(limit),
    orderBy: {
      [sortBy]: sortOrder,
    },
    where: whereConditions,
  });

  const total = await prisma.product.count({
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

// get by category
const getProductsbyCategoryService = async (
  id: string,
  options: IPaginationOptions
): Promise<IGenericResponse<Product[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const andConditions = [];

  if (id) {
    andConditions.push({
      categoryId: id,
    });
  }

  const whereConditions: Prisma.ProductWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.product.findMany({
    include: {
      Category: true,
    },
    skip,
    take: Number(limit),

    where: whereConditions,
  });

  const total = await prisma.product.count({
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

const getProductById = async (id: string): Promise<Product | null> => {
  const result = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      Category: true,
    },
  });
  return result;
};

const updateIntoDB = async (
  id: string,
  payload: Partial<Product>
): Promise<Product> => {
  const result = await prisma.product.update({
    where: {
      id,
    },
    data: payload,
    include: {
      Category: true,
    },
  });
  return result;
};

const deleteFromDB = async (id: string): Promise<Product> => {
  const result = await prisma.product.delete({
    where: {
      id,
    },
    include: {
      Category: true,
    },
  });
  return result;
};

export const productService = {
  insertIntoDB,
  getProductById,
  updateIntoDB,
  deleteFromDB,
  getAllProducts,
  getProductsbyCategoryService,
};
