import { GetProductCategoriesApiArg } from '~entities/product-category';

export type TProductsCategoriesFiltersFormValues = {
    order: GetProductCategoriesApiArg['order'];
    sortBy: GetProductCategoriesApiArg['sortBy'];
};
