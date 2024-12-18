import { api } from '/home/vladimir/Desktop/projects/metallic-fe/src/shared/config/api';

export const addTagTypes = ['product-categories'] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            createProductCategory: build.mutation<
                CreateProductCategoryApiResponse,
                CreateProductCategoryApiArg
            >({
                query: (queryArg) => ({
                    url: `/product-categories`,
                    method: 'POST',
                    body: queryArg.createProductCategoryDto,
                }),
                invalidatesTags: ['product-categories'],
            }),
            updateProductCategory: build.mutation<
                UpdateProductCategoryApiResponse,
                UpdateProductCategoryApiArg
            >({
                query: (queryArg) => ({
                    url: `/product-categories/${queryArg.id}`,
                    method: 'PATCH',
                    body: queryArg.updateProductCategoryDto,
                }),
                invalidatesTags: ['product-categories'],
            }),
            deleteProductCategory: build.mutation<
                DeleteProductCategoryApiResponse,
                DeleteProductCategoryApiArg
            >({
                query: (queryArg) => ({
                    url: `/product-categories/${queryArg.id}`,
                    method: 'DELETE',
                }),
                invalidatesTags: ['product-categories'],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as enhancedApi };
export type CreateProductCategoryApiResponse = unknown;
export type CreateProductCategoryApiArg = {
    createProductCategoryDto: CreateProductCategoryDto;
};
export type UpdateProductCategoryApiResponse = unknown;
export type UpdateProductCategoryApiArg = {
    id: number;
    updateProductCategoryDto: UpdateProductCategoryDto;
};
export type DeleteProductCategoryApiResponse = unknown;
export type DeleteProductCategoryApiArg = {
    id: number;
};
export type CreateProductCategoryDto = {
    title: string;
    code: string;
};
export type UpdateProductCategoryDto = {
    title?: string;
    code?: string;
};
