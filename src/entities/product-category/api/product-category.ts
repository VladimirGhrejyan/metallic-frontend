import { enhancedApi as genProductCategoryApi } from './product-category.gen';

export const productCategoryApi = genProductCategoryApi.enhanceEndpoints({});
export const {
    useCreateProductCategoryMutation,
    useUpdateProductCategoryMutation,
    useDeleteProductCategoryMutation,
    useGetProductCategoriesQuery,
    useLazyGetProductCategoriesQuery,
    useGetProductCategoryByIdQuery,
    useLazyGetProductCategoryByIdQuery,
} = productCategoryApi;

export type {
    CreateProductCategoryApiArg,
    GetProductCategoriesApiArg,
    GetProductCategoriesApiResponse,
    GetProductCategoryByIdApiResponse,
    UpdateProductCategoryDto,
} from './product-category.gen';
