export function cleanedObject<T extends object>(object: T): Partial<T> {
    const cleaned: Partial<T> = Object.fromEntries(
        Object.entries(object).filter(([_, value]) => value !== undefined && value !== ''),
    ) as Partial<T>;
    return cleaned;
}
