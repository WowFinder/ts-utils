type ArrayMapper<T> = Parameters<Array<T>['map']>[0];

function asArray<T>(value: T | T[]): T[] {
    return Array.isArray(value) ? value : [value];
}

function arrayAsyncMap<ArrayType, ReturnType>(
    array: ArrayType[],
    mapper: ArrayMapper<ArrayType>,
): Promise<ReturnType[]> {
    return Promise.all(array.map(mapper) as Promise<ReturnType>[]);
}

export { asArray, arrayAsyncMap };
