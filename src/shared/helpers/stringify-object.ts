export function stringifyObject<T extends Record<string, unknown>>(
    object: T,
): Record<string, string> {
    const result: Record<string, string> = {};

    for (const [key, value] of Object.entries(object)) {
        if (value !== undefined && value !== null) {
            try {
                result[key] = String(value);
            } catch {
                continue;
            }
        }
    }

    return result;
}
