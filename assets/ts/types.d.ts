type Error = { path?: string, message: string };

type SuccessResult<T> = { success: true; data: T; }

type ErrorResult = { success: false; errors: Error[]; }

export type Result<T> = SuccessResult<T> | ErrorResult;

/////////////// interfaces

export interface Comment {
    id: string;
    content: string;
    user: User;
    post: Post;
}

export interface User {
    id: string,
    name: string;
}

export interface Post {
    id: string;
    content: string;
    comments: Comment[];
    user: User;
}