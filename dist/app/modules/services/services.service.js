"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceService = void 0;
const prisma_1 = __importDefault(require("../../../utils/prisma"));
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.service.create({
        data,
    });
    return result;
});
// const getAllservices = async (
//   filters: IServiceFilterRequest,
//   options: IPaginationOptions
// ): Promise<IGenericResponse<Service[]>> => {
//   const { limit, page, skip, sortBy, sortOrder } =
//     paginationHelpers.calculatePagination(options);
//   const { search, ...filterData } = filters; // Removed 'category' from filters
//   const andConditions = [];
//   if (search) {
//     andConditions.push({
//       OR: serviceSearchableFields.map((field) => ({
//         [field]: {
//           contains: search,
//           mode: "insensitive",
//         },
//       })),
//     });
//   }
//   if (Object.keys(filterData).length > 0) {
//     andConditions.push({
//       AND: Object.keys(filterData).map((key) => {
//         if (serviceRelationalFields.includes(key)) {
//           return {
//             [serviceRelationalFieldsMapper[key]]: {
//               id: (filterData as any)[key],
//             },
//           };
//         } else if (serviceSearchableFields.includes(key)) {
//           return {
//             [key]: {
//               contains: (filterData as any)[key],
//               mode: "insensitive",
//             },
//           };
//         } else {
//           return {
//             [key]: {
//               equals: (filterData as any)[key],
//             },
//           };
//         }
//       }),
//     });
//   }
//   const whereConditions: Prisma.ServiceWhereInput =
//     andConditions.length > 0 ? { AND: andConditions } : {};
//   const result = await prisma.service.findMany({
//     skip,
//     take: Number(limit),
//     orderBy: {
//       [sortBy]: sortOrder,
//     },
//     where: whereConditions,
//   });
//   const total = await prisma.service.count({
//     where: whereConditions,
//   });
//   const totalPages = Math.ceil(total / Number(limit));
//   return {
//     meta: {
//       total,
//       page,
//       limit,
//       totalPages,
//     },
//     data: result,
//   };
// };
const getAllservices = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.service.findMany();
    return result;
});
// const getAllservices = async (
//   filters: IServiceFilterRequest,
//   options: IPaginationOptions
// ): Promise<IGenericResponse<Service[]>> => {
//   const { limit, page, skip, sortBy, sortOrder } =
//     paginationHelpers.calculatePagination(options);
//   const { search, maxPrice, minPrice, category, ...filterData } = filters;
//   const andConditions = [];
//   if (search) {
//     andConditions.push({
//       OR: serviceSearchableFields.map((field) => ({
//         [field]: {
//           contains: search,
//           mode: "insensitive",
//         },
//       })),
//     });
//   }
//   if (minPrice !== undefined) {
//     andConditions.push({
//       price: {
//         gte: parseFloat(minPrice.toString()),
//       },
//     });
//   }
//   if (maxPrice !== undefined) {
//     andConditions.push({
//       price: {
//         lte: parseFloat(maxPrice.toString()),
//       },
//     });
//   }
//   if (category) {
//     andConditions.push({
//       categoryId: category,
//     });
//   }
//   if (Object.keys(filterData).length > 0) {
//     andConditions.push({
//       AND: Object.keys(filterData).map((key) => {
//         if (serviceRelationalFields.includes(key)) {
//           return {
//             [serviceRelationalFieldsMapper[key]]: {
//               id: (filterData as any)[key],
//             },
//           };
//         } else if (serviceSearchableFields.includes(key)) {
//           return {
//             [key]: {
//               contains: (filterData as any)[key],
//               mode: "insensitive",
//             },
//           };
//         } else {
//           return {
//             [key]: {
//               equals: (filterData as any)[key],
//             },
//           };
//         }
//       }),
//     });
//   }
//   const whereConditions: Prisma.serviceWhereInput =
//     andConditions.length > 0 ? { AND: andConditions } : {};
//   const result = await prisma.service.findMany({
//     skip,
//     take: Number(limit),
//     orderBy: {
//       [sortBy]: sortOrder,
//     },
//     where: whereConditions,
//   });
//   const total = await prisma.service.count({
//     where: whereConditions,
//   });
//   const totalPages = Math.ceil(total / Number(limit));
//   return {
//     meta: {
//       total,
//       page,
//       limit,
//       totalPages,
//     },
//     data: result,
//   };
// };
const getserviceById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.service.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const updateIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.service.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.service.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.serviceService = {
    insertIntoDB,
    getserviceById,
    updateIntoDB,
    deleteFromDB,
    getAllservices,
};
