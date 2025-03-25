interface TypedDeepRecord<T> {
    [key: string]: TypedDeepRecord<T> | T;
}

type DeepRecord = TypedDeepRecord<string>;

type RecursiveTypedRecordLoader<T> = (
    localBaseFileName: string,
) => TypedDeepRecord<T> | T;

type RecursiveRecordLoader = RecursiveTypedRecordLoader<string>;

export type {
    DeepRecord,
    TypedDeepRecord,
    RecursiveTypedRecordLoader,
    RecursiveRecordLoader,
};
