"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceValidation = void 0;
const zod_1 = require("zod");
const createService = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required",
        }),
        description: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
        price: zod_1.z.number({
            required_error: "Price is required",
        }),
    }),
});
const updateService = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(), // Made the "price" field optional for updates.
    }),
});
exports.ServiceValidation = {
    createService,
    updateService,
};
