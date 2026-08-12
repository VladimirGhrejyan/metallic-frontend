import { IProductsQueryArgs } from './admin-products.types';

export const DEFAULT_EXCLUDE_OUT_OF_STOCK = 'false' as const;

export const HOME_PRODUCTS_DEFAULT_SORT: Pick<IProductsQueryArgs, 'sortBy' | 'order'> = {
    sortBy: 'categoryTitle',
    order: 'ASC',
};

export const isExcludeOutOfStockEnabled = (value?: string): boolean => value === 'true';

export const normalizeExcludeOutOfStock = (
    value?: string,
): typeof DEFAULT_EXCLUDE_OUT_OF_STOCK | 'true' =>
    value === 'true' ? 'true' : DEFAULT_EXCLUDE_OUT_OF_STOCK;
