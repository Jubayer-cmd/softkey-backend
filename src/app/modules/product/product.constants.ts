export const productFilterableFields: string[] = [
  "search",
  "minPrice",
  "maxPrice",
  "category",
];

export const productSearchableFields: string[] = ["title", "author", "genre"];
export const productRelationalFields: string[] = ["categoryId"];
export const productRelationalFieldsMapper: { [key: string]: string } = {
  categoryId: "category",
};
export type IProductFilterRequest = {
  search?: string | undefined;
  minPrice?: number;
  maxPrice?: number;
  category?: string;
};
