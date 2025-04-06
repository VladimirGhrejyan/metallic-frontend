import { enhancedApi as genProductApi } from './product.gen';

export const productApi = genProductApi.enhanceEndpoints({});
export const {
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetProductsQuery,
    useLazyGetProductsQuery,
    useGetProductByIdQuery,
    useLazyGetProductByIdQuery,
    useUpdateProductImageMutation,
} = productApi;

export type {
    CreateProductDto,
    GetProductByIdApiResponse,
    GetProductsApiArg,
    GetProductsApiResponse,
    UpdateProductDto,
    UpdateProductImageApiArg,
} from './product.gen';
