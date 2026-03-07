import { enhancedApi as genOrderApi } from './order.gen';

export const orderApi = genOrderApi.enhanceEndpoints({});
export const {
    useGetOrdersQuery,
    useLazyGetOrdersQuery,
    useGetOrderByIdQuery,
    useLazyGetOrderByIdQuery,
    useCreateOrderMutation,
    useUpdateOrderMutation,
    useDeleteOrderMutation,
} = orderApi;

export type {
    CreateOrderApiArg,
    CreateOrderDto,
    GetOrderByIdApiResponse,
    GetOrdersApiArg,
    GetOrdersApiResponse,
    UpdateOrderDto,
} from './order.gen';
