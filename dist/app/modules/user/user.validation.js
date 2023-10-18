"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
// Add validation for the User model using zod
const zod_1 = require("zod");
const createUser = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required",
        }),
        email: zod_1.z.string().email({ message: "Invalid email format" }),
        password: zod_1.z.string({
            required_error: "Password is required",
        }),
        image: zod_1.z.string().optional(),
        role: zod_1.z.enum(["admin", "user", "superadmin"]),
        contactNo: zod_1.z.string(),
        address: zod_1.z.string().optional(), // Updated: Made the "address" field optional.
    }),
});
const updateUser = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        password: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
        role: zod_1.z.enum(["admin", "user"]).optional(),
        contactNo: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(), // Updated: Made the "address" field optional for updates.
    }),
});
exports.UserValidation = {
    createUser,
    updateUser,
};
