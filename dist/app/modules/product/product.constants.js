"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRelationalFieldsMapper = exports.productRelationalFields = exports.productSearchableFields = exports.productFilterableFields = void 0;
exports.productFilterableFields = [
    "search",
    "minPrice",
    "maxPrice",
    "category",
];
exports.productSearchableFields = ["title", "author", "genre"];
exports.productRelationalFields = ["categoryId"];
exports.productRelationalFieldsMapper = {
    categoryId: "category",
};
