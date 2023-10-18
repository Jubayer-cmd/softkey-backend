"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryValidation = void 0;
// Add validation for the Category model using zod
const zod_1 = require("zod");
const createCategory = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required",
        }),
        description: zod_1.z.string().optional(), // Updated: Changed to string validation and made it optional.
    }),
});
const updateCategory = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(), // Updated: Changed to string validation and made it optional.
    }),
});
exports.CategoryValidation = {
    createCategory,
    updateCategory,
};
