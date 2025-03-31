import { enhancedApi as genProductApi } from './product.gen';

export const productApi = genProductApi.enhanceEndpoints({});
export const {
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetProductsQuery,
    useLazyGetProductsQuery,
} = productApi;

export type { CreateProductDto, GetProductsApiArg, GetProductsApiResponse } from './product.gen';
