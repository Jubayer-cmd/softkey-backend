"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserReviewValidation = void 0;
// Add validation for the UserReview model using zod
const zod_1 = require("zod");
const createUserReview = zod_1.z.object({
    body: zod_1.z.object({
        rating: zod_1.z.number({
            required_error: "Rating is required",
        }),
        content: zod_1.z.string().optional(),
        serviceId: zod_1.z.string(),
        productId: zod_1.z.string(),
        userId: zod_1.z.string(), // Added: Validation for "userId".
    }),
});
const updateUserReview = zod_1.z.object({
    body: zod_1.z.object({
        rating: zod_1.z.number().optional(),
        content: zod_1.z.string().optional(),
        serviceId: zod_1.z.string().optional(),
        productId: zod_1.z.string().optional(),
        userId: zod_1.z.string().optional(), // Made the "userId" field optional for updates.
    }),
});
exports.UserReviewValidation = {
    createUserReview,
    updateUserReview,
};
