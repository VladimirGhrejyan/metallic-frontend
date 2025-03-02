import { api } from '/Users/surenstepanyan/Desktop/DEVELOPMENT/METALIC PROJECT/metallic-frontend/src/shared/config/api';

export const addTagTypes = ['products'] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            createProduct: build.mutation<CreateProductApiResponse, CreateProductApiArg>({
                query: (queryArg) => ({
                    url: `/products`,
                    method: 'POST',
                    body: queryArg.createProductDto,
                }),
                invalidatesTags: ['products'],
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
export type CreateProductApiResponse = unknown;
export type CreateProductApiArg = {
    createProductDto: CreateProductDto;
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
export type CreateProductDto = {
    title: string;
    code: string;
    costPrice: number;
    markup: number;
    categoryId: number;
};
export type UpdateProductDto = {
    title?: string;
    code?: string;
    costPrice?: number;
    markup?: number;
    categoryId?: number;
};
