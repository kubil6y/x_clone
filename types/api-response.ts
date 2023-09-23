export type ApiResponse<T> =
    | {
        status: "success";
        data: T;
    }
    | {
        status: "error";
        message: T;
    };
