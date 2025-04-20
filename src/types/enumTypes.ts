// Extract the enumerated member values as union types
export type UnionEnumMemberValues<T> = T[keyof T]
