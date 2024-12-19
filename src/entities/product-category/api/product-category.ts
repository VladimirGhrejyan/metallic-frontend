import { enhancedApi as genProductCategoryApi } from './product-category.gen';

export const productCategoryApi = genProductCategoryApi.enhanceEndpoints({});
export const {
    useCreateProductCategoryMutation,
    useUpdateProductCategoryMutation,
    useDeleteProductCategoryMutation,
} = productCategoryApi;
