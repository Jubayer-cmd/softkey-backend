"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRelationalFieldsMapper = exports.productRelationalFields = exports.productSearchableFields = exports.productFilterableFields = void 0;
exports.productFilterableFields = [
    "searchTerm",
    "minPrice",
    "maxPrice",
    "category",
];
exports.productSearchableFields = ["name", "description"];
exports.productRelationalFields = ["categoryId"];
exports.productRelationalFieldsMapper = {
    categoryId: "category",
};
