export interface Response<T> {
    intResponse: number;
    strAnswer: string;
    Result: T;
    token?: string;
}