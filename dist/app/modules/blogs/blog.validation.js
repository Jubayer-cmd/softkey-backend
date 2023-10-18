"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "Title is required",
        }),
        content: zod_1.z.string({
            // Fixed: Changed "code" to "content" for the content field.
            required_error: "Content is required", // Updated: Changed error message for content.
        }),
        authorId: zod_1.z.string(), // Added: Validation for authorId.
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        content: zod_1.z.string().optional(),
        authorId: zod_1.z.string().optional(), // Added: Validation for authorId.
    }),
});
exports.BlogValidation = {
    create,
    update,
};
