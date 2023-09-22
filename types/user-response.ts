export type UserResponse = {
    id: string;
    email: string;
    emailVerified: Date | null;
    username: string | null;
    createdAt: Date;
    updatedAt: Date;
};
