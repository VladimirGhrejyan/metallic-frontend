import { api } from '~shared/config/api';

export const addTagTypes = ['orders'] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            getOrders: build.query<GetOrdersApiResponse, GetOrdersApiArg>({
                query: (queryArg) => ({
                    url: `/orders`,
                    params: {
                        search: queryArg.search,
                        order: queryArg.order,
                        sortBy: queryArg.sortBy,
                        clientId: queryArg.clientId,
                        page: queryArg.page,
                        itemsPerPage: queryArg.itemsPerPage,
                    },
                }),
                providesTags: ['orders'],
            }),
            createOrder: build.mutation<CreateOrderApiResponse, CreateOrderApiArg>({
                query: (queryArg) => ({
                    url: `/orders`,
                    method: 'POST',
                    body: queryArg.createOrderDto,
                }),
                invalidatesTags: ['orders'],
            }),
            getOrderById: build.query<GetOrderByIdApiResponse, GetOrderByIdApiArg>({
                query: (queryArg) => ({ url: `/orders/${queryArg.id}` }),
                providesTags: ['orders'],
            }),
            updateOrder: build.mutation<UpdateOrderApiResponse, UpdateOrderApiArg>({
                query: (queryArg) => ({
                    url: `/orders/${queryArg.id}`,
                    method: 'PATCH',
                    body: queryArg.updateOrderDto,
                }),
                invalidatesTags: ['orders'],
            }),
            deleteOrder: build.mutation<DeleteOrderApiResponse, DeleteOrderApiArg>({
                query: (queryArg) => ({
                    url: `/orders/${queryArg.id}`,
                    method: 'DELETE',
                }),
                invalidatesTags: ['orders'],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as enhancedApi };
export type GetOrdersApiResponse = /** status 200  */ GetAllOrdersOutputDto;
export type GetOrdersApiArg = {
    search?: string;
    order?: 'ASC' | 'DESC';
    sortBy?: 'createdAt' | 'updatedAt';
    clientId?: string;
    page?: string;
    itemsPerPage?: string;
};
export type CreateOrderApiResponse = /** status 201  */ GetOneOrderOutputDto;
export type CreateOrderApiArg = {
    createOrderDto: CreateOrderDto;
};
export type GetOrderByIdApiResponse = /** status 200  */ GetOneOrderOutputDto;
export type GetOrderByIdApiArg = {
    id: number;
};
export type UpdateOrderApiResponse = /** status 200  */ GetOneOrderOutputDto;
export type UpdateOrderApiArg = {
    id: number;
    updateOrderDto: UpdateOrderDto;
};
export type DeleteOrderApiResponse = unknown;
export type DeleteOrderApiArg = {
    id: number;
};
export type GetAllOrdersOutputDto = {
    items: {
        clientId: number;
        client: {
            id: number;
            name: string;
            taxpayerRegistrationNumber: string | null;
        };
        items: {
            orderId: number;
            productId: number | null;
            count: number;
            price: number;
            productSnapshot: {
                title: string;
                code: string;
            };
            product: {
                id: number;
                title: string;
                code: string;
            } | null;
            id: number;
            createdAt: string;
            updatedAt: string | null;
            deletedAt: string | null;
        }[];
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
export type GetOneOrderOutputDto = {
    clientId: number;
    client: {
        id: number;
        name: string;
        taxpayerRegistrationNumber: string | null;
    };
    items: {
        orderId: number;
        productId: number | null;
        count: number;
        price: number;
        productSnapshot: {
            title: string;
            code: string;
        };
        product: {
            id: number;
            title: string;
            code: string;
        } | null;
        id: number;
        createdAt: string;
        updatedAt: string | null;
        deletedAt: string | null;
    }[];
    id: number;
    createdAt: string;
    updatedAt: string | null;
    deletedAt: string | null;
};
export type CreateOrderDto = {
    clientId: number;
    items: {
        productId: number;
        count: number;
    }[];
};
export type UpdateOrderDto = {
    clientId?: number;
    items?: {
        productId: number;
        count: number;
    }[];
};
