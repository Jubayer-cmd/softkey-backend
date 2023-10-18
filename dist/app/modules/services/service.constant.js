"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRelationalFieldsMapper = exports.serviceRelationalFields = exports.serviceSearchableFields = exports.serviceFilterableFields = void 0;
exports.serviceFilterableFields = [
    "search",
    "minPrice",
    "maxPrice",
    "category",
];
exports.serviceSearchableFields = ["title", "author", "genre"];
exports.serviceRelationalFields = ["categoryId"];
exports.serviceRelationalFieldsMapper = {
    categoryId: "category",
};
