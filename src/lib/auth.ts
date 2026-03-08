import api from "./api";

export const loginUser = async (email: string, password: string) => {
    const res = api.post("/auth/login", {
        email,
        password,
    });

    return res
};

export const registerUser = async (
    name: string,
    email: string,
    password: string
) => {
    const res = api.post("/auth/register", {
        name,
        email,
        password,
    });

    return res
};

export const getProfile = async () => {
    const res = api.get("/auth/profile");
    return res
};