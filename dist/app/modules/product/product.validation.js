"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidation = void 0;
const zod_1 = require("zod");
const createProduct = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required",
        }),
        description: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
        price: zod_1.z.number({
            required_error: "Price is required",
        }),
        categoryId: zod_1.z.string().optional(),
        stock: zod_1.z.boolean(),
        quantity: zod_1.z.number(),
        saleCount: zod_1.z.number(), // Updated: Changed to number validation.
    }),
});
const updateProduct = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        categoryId: zod_1.z.string().optional(),
        stock: zod_1.z.boolean().optional(),
        quantity: zod_1.z.number().optional(),
        saleCount: zod_1.z.number().optional(), // Updated: Made the "saleCount" field optional for updates.
    }),
});
exports.ProductValidation = {
    createProduct,
    updateProduct,
};
