import { api } from '/Users/surenstepanyan/Desktop/DEVELOPMENT/METALIC PROJECT/metallic-frontend/src/shared/config/api';

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
            getProductCategories: build.query<
                GetProductCategoriesApiResponse,
                GetProductCategoriesApiArg
            >({
                query: () => ({ url: `/product-categories/all` }),
                providesTags: ['product-categories'],
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
export type GetProductCategoriesApiResponse = /** status 200  */ GetAllCategoriesDto;
export type GetProductCategoriesApiArg = void;
export type CreateProductCategoryDto = {
    title: string;
    code: string;
};
export type UpdateProductCategoryDto = {
    title?: string;
    code?: string;
};
export type GetAllCategoriesDto = {
    id: number;
    title: string;
    code: string;
}[];
