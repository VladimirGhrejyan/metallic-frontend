import { GetProductsApiArg } from '~entities/product';

export interface IProductsQueryArgs extends Omit<GetProductsApiArg, 'page' | 'itemsPerPage'> {
    page?: number;
    itemsPerPage?: number;
}
