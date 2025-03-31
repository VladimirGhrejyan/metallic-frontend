import { enhancedApi as genProductCategoryApi } from './product-category.gen';

export const productCategoryApi = genProductCategoryApi.enhanceEndpoints({});
export const {
    useCreateProductCategoryMutation,
    useUpdateProductCategoryMutation,
    useDeleteProductCategoryMutation,
    useGetProductCategoriesQuery,
    useLazyGetProductCategoriesQuery,
} = productCategoryApi;

export type {
    CreateProductCategoryApiArg,
    GetProductCategoriesApiArg,
} from './product-category.gen';
