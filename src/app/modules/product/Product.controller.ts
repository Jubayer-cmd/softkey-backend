import { Product } from "@prisma/client";
import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import pick from "../../../utils/pick";
import sendResponse from "../../../utils/sendResponse";
import { productFilterableFields } from "./product.constants";
import { productService } from "./product.service";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await productService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "product created successfully",
    data: result,
  });
});

// get all products
const getproducts: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const filters = pick(req.query, productFilterableFields);

    const result = await productService.getAllProducts(filters, options);

    sendResponse<Product[]>(res, {
      statusCode: 200,
      success: true,
      message: "products fetched successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

const getproductsbyCategory: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    const options = pick(req.query, ["limit", "page"]);
    const result = await productService.getProductsbyCategoryService(
      categoryId,
      options
    );

    sendResponse<Product[]>(res, {
      statusCode: 200,
      success: true,
      message: "products with associated category data fetched successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const result = await productService.getProductById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "product fetched successfully",
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await productService.deleteFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "product deleted successfully",
    data: result,
  });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await productService.updateIntoDB(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "product updated successfully",
    data: result,
  });
});

export const productController = {
  insertIntoDB,
  getUserById,
  updateIntoDB,
  deleteFromDB,
  getproducts,
  getproductsbyCategory,
};
