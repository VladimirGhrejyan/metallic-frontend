import { api } from '/Users/surenstepanyan/Desktop/DEVELOPMENT/METALIC PROJECT/metallic-frontend/src/shared/config/api';

export const addTagTypes = ['products'] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            getProducts: build.query<GetProductsApiResponse, GetProductsApiArg>({
                query: (queryArg) => ({
                    url: `/products`,
                    params: {
                        search: queryArg.search,
                        order: queryArg.order,
                        sortBy: queryArg.sortBy,
                        categoryId: queryArg.categoryId,
                        page: queryArg.page,
                        itemsPerPage: queryArg.itemsPerPage,
                    },
                }),
                providesTags: ['products'],
            }),
            createProduct: build.mutation<CreateProductApiResponse, CreateProductApiArg>({
                query: (queryArg) => ({
                    url: `/products`,
                    method: 'POST',
                    body: queryArg.createProductDto,
                }),
                invalidatesTags: ['products'],
            }),
            getProductById: build.query<GetProductByIdApiResponse, GetProductByIdApiArg>({
                query: (queryArg) => ({ url: `/products/${queryArg.id}` }),
                providesTags: ['products'],
            }),
            updateProduct: build.mutation<UpdateProductApiResponse, UpdateProductApiArg>({
                query: (queryArg) => ({
                    url: `/products/${queryArg.id}`,
                    method: 'PATCH',
                    body: queryArg.updateProductDto,
                }),
                invalidatesTags: ['products'],
            }),
            deleteProduct: build.mutation<DeleteProductApiResponse, DeleteProductApiArg>({
                query: (queryArg) => ({
                    url: `/products/${queryArg.id}`,
                    method: 'DELETE',
                }),
                invalidatesTags: ['products'],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as enhancedApi };
export type GetProductsApiResponse = /** status 200  */ GetAllProductsOutputDto;
export type GetProductsApiArg = {
    search?: string;
    order?: 'ASC' | 'DESC';
    sortBy?: 'title' | 'code' | 'costPrice' | 'categoryId' | 'createdAt' | 'updatedAt';
    categoryId?: string;
    page?: string;
    itemsPerPage?: string;
};
export type CreateProductApiResponse = unknown;
export type CreateProductApiArg = {
    createProductDto: CreateProductDto;
};
export type GetProductByIdApiResponse = /** status 200  */ GetOneProductOutputDto;
export type GetProductByIdApiArg = {
    id: number;
};
export type UpdateProductApiResponse = unknown;
export type UpdateProductApiArg = {
    id: number;
    updateProductDto: UpdateProductDto;
};
export type DeleteProductApiResponse = unknown;
export type DeleteProductApiArg = {
    id: number;
};
export type GetAllProductsOutputDto = {
    items: {
        title: string;
        code: string;
        costPrice: number;
        markup: number;
        categoryId: number;
        id: number;
        createdAt: string;
        updatedAt: string | null;
        deletedAt: string | null;
    }[];
    meta: {
        totalItems: number;
        totalPages: number;
        currentPage: number;
        itemsPerPage: number;
    };
};
export type CreateProductDto = {
    title: string;
    code: string;
    costPrice: number;
    markup: number;
    categoryId: number;
};
export type GetOneProductOutputDto = {
    title: string;
    code: string;
    costPrice: number;
    markup: number;
    categoryId: number;
    id: number;
    createdAt: string;
    updatedAt: string | null;
    deletedAt: string | null;
};
export type UpdateProductDto = {
    title?: string;
    code?: string;
    costPrice?: number;
    markup?: number;
    categoryId?: number;
};
