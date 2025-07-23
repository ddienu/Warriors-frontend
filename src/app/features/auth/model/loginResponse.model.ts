export interface LoginResponse{
    message: string,
    data: {
        email: string,
        token: string
    }
}