export function snakeToCamel(s: string): string {
    return s.replace(/([-_][a-z])/g, (group) =>
        group.toUpperCase()
            .replace('-', '')
            .replace('_', '')
    )
}

export function camelizeKeys<T>(value: T): T {
    if (Array.isArray(value)) {
        return value.map((item) => camelizeKeys(item)) as T
    }

    if (
        value !== null
        && typeof value === "object"
        && Object.prototype.toString.call(value) === "[object Object]"
    ) {
        return Object.entries(value as Record<string, unknown>).reduce<Record<string, unknown>>(
            (accumulator, [key, entry]) => {
                accumulator[snakeToCamel(key)] = camelizeKeys(entry)
                return accumulator
            },
            {},
        ) as T
    }

    return value
}
