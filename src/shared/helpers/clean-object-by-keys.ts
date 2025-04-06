export function cleanObjectByKeys<T extends object, K extends keyof T>(
    obj: T,
    keysToCheck: K[] = [],
): Partial<T> {
    const result = { ...obj };
    for (const key of keysToCheck) {
        const value = result[key];
        if (!value) {
            delete result[key];
        }
    }
    return result;
}
