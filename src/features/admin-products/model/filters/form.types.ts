import { GetProductsApiArg } from '~entities/product';

export type TProductsFiltersFormValues = {
    categoryId: string | undefined;
    order: GetProductsApiArg['order'];
    sortBy: GetProductsApiArg['sortBy'];
};
