export type MetaData = {
    currentPage: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
};

export type ApiResponse<T> =
    | {
        status: "success";
        data: T;
        metadata?: MetaData;
    }
    | {
        status: "error";
        message: T;
    };
