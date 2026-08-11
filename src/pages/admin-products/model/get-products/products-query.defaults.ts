import { IProductsQueryArgs } from './admin-products.types';

export const DEFAULT_EXCLUDE_OUT_OF_STOCK = 'true' as const;

export const HOME_PRODUCTS_DEFAULT_SORT: Pick<IProductsQueryArgs, 'sortBy' | 'order'> = {
    sortBy: 'categoryTitle',
    order: 'ASC',
};

export const isExcludeOutOfStockEnabled = (value?: string): boolean => value !== 'false';

export const normalizeExcludeOutOfStock = (
    value?: string,
): typeof DEFAULT_EXCLUDE_OUT_OF_STOCK | 'false' =>
    isExcludeOutOfStockEnabled(value) ? DEFAULT_EXCLUDE_OUT_OF_STOCK : 'false';
