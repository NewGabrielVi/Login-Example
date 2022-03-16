import axios from "axios";



export const api = axios.create({
    baseURL: "https://frontendproject.b2bit.company",
});

export const createSession = async (email, password) => {
    return await api.post("/account/tokens/", {
        "email": email, 
        "password": password
    });
}