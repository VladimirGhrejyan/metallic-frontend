export type CreateProductFormValues = {
    title: string;
    code: string;
    costPrice: number;
    markup: number;
    categoryId: number | null;
    quantityAvailable: number;
    description?: string;
};
