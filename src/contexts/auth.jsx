import React, { useState, useEffect, createContext} from "react";
import {useNavigate} from "react-router-dom";
import { api, createSession } from "../services/api";
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const navigate = useNavigate();
    
    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const recoveredUser = localStorage.getItem('user');

            if(recoveredUser) {
                setUser(JSON.parse(recoveredUser));
            }

            setLoading(false);

    }, []);

    const login = async (email, password) => {
            try {
                
                const  response = await createSession(email, password);
        
                console.log("login auth", response.data);
        
                const loggedUser = response.data.user;
                const tokens = response.data.tokens;
        
                localStorage.setItem('user', JSON.stringify(loggedUser));
                localStorage.setItem('accessToken', tokens.access);
                localStorage.setItem('refreshToken', tokens.refresh);
        
                api.defaults.headers.Authorization = `Bearer ${tokens.access}`;
                
                setUser(loggedUser);
                navigate("/profile");
                
                
            } catch (error) {
                throw new Error(error);
            }
        
    };

    const logout = () => {
        console.log("logout");
        
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        api.defaults.headers.Authorization = null;
        setUser(null);
        navigate("/")
    };

    return (
<AuthContext.Provider value= {{authenticated:!!user, user, loading, login, logout}}

>
    {children}
</AuthContext.Provider>
    )
};