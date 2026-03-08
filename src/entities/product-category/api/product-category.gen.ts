import { api } from '~shared/config/api';

export const addTagTypes = ['product-categories'] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            getProductCategories: build.query<
                GetProductCategoriesApiResponse,
                GetProductCategoriesApiArg
            >({
                query: (queryArg) => ({
                    url: `/product-categories/all`,
                    params: {
                        search: queryArg.search,
                        order: queryArg.order,
                        sortBy: queryArg.sortBy,
                    },
                }),
                providesTags: ['product-categories'],
            }),
            getProductCategoryById: build.query<
                GetProductCategoryByIdApiResponse,
                GetProductCategoryByIdApiArg
            >({
                query: (queryArg) => ({ url: `/product-categories/${queryArg.id}` }),
                providesTags: ['product-categories'],
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
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as enhancedApi };
export type GetProductCategoriesApiResponse = /** status 200  */ GetAllCategoriesOutputDto;
export type GetProductCategoriesApiArg = {
    search?: string;
    order?: 'ASC' | 'DESC';
    sortBy?: 'title' | 'code' | 'createdAt' | 'updatedAt';
};
export type GetProductCategoryByIdApiResponse = /** status 200  */ GetOneCategoryDto;
export type GetProductCategoryByIdApiArg = {
    id: number;
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
export type CreateProductCategoryApiResponse = unknown;
export type CreateProductCategoryApiArg = {
    createProductCategoryDto: CreateProductCategoryDto;
};
export type GetAllCategoriesOutputDto = {
    items: {
        title: string;
        code: string;
        id: number;
        createdAt: string;
        updatedAt: string | null;
        deletedAt: string | null;
    }[];
};
export type GetOneCategoryDto = {
    title: string;
    code: string;
    id: number;
    createdAt: string;
    updatedAt: string | null;
    deletedAt: string | null;
};
export type UpdateProductCategoryDto = {
    title?: string;
    code?: string;
};
export type CreateProductCategoryDto = {
    title: string;
    code: string;
};
