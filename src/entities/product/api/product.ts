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
} = productApi;

export type {
    CreateProductDto,
    GetProductByIdApiResponse,
    GetProductsApiArg,
    GetProductsApiResponse,
    UpdateProductDto,
} from './product.gen';
