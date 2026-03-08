import { GetOrdersApiArg } from '~entities/order';

export interface IAdminOrdersQueryArgs extends Omit<GetOrdersApiArg, 'page' | 'itemsPerPage'> {
    page?: number;
    itemsPerPage?: number;
}
