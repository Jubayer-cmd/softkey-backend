import { Service } from "@prisma/client";
import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import pick from "../../../utils/pick";
import sendResponse from "../../../utils/sendResponse";
import { serviceFilterableFields } from "./service.constant";
import { serviceService } from "./services.service";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await serviceService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "service created successfully",
    data: result,
  });
});

// get all services
const getservices: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const filters = pick(req.query, serviceFilterableFields);

    const result = await serviceService.getAllservices(filters, options);

    sendResponse<Service[]>(res, {
      statusCode: 200,
      success: true,
      message: "services fetched successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const result = await serviceService.getserviceById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "service fetched successfully",
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await serviceService.deleteFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "service deleted successfully",
    data: result,
  });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await serviceService.updateIntoDB(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "service updated successfully",
    data: result,
  });
});

export const serviceController = {
  insertIntoDB,
  getUserById,
  updateIntoDB,
  deleteFromDB,
  getservices,
};
