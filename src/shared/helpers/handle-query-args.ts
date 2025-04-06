export function filterQueryArgs<T extends Record<string, unknown>>(
    queryArgs: T,
    incrementPage: boolean = false,
): Partial<T> {
    const cleaned: Partial<T> = Object.fromEntries(
        Object.entries(queryArgs).filter(([_, value]) => value !== undefined && value !== ''),
    ) as Partial<T>;

    if (
        incrementPage &&
        'page' in queryArgs &&
        typeof queryArgs.page === 'string' &&
        !isNaN(Number(queryArgs.page))
    ) {
        (cleaned as Record<string, unknown>)['page'] = (Number(queryArgs.page) + 1).toString();
    }

    return cleaned;
}
