"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSearchableFields = exports.userFilterableFields = void 0;
var Role;
(function (Role) {
    Role["admin"] = "admin";
    Role["user"] = "user";
    Role["superAdmin"] = "superAdmin";
})(Role || (Role = {}));
exports.userFilterableFields = ["searchTerm", "email", "role"];
exports.userSearchableFields = ["name", "email"];
