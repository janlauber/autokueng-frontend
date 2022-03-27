import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'

import Api from "../config/api";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadUserFromCookie() {
            const token = Cookies.get('token');
            if (token) {
                try {
                    Api.defaults.headers.Authorization = 'Bearer ' + token;
                    const { data: user} = await Api.get('/auth');
                    if (user) {
                        setUser(user);
                    }
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.log("No token in cookie");
            }
            setLoading(false);
        }
        loadUserFromCookie();
    }, []);

    const login = async (username, password) => {
        const { data: data } = await Api.post('/auth', {
            username,
            password,
        });
        if (data) {
            console.log("Got token from login: " + data["token"]);
            Api.defaults.headers.Authorization = 'Bearer ' + data["token"];
            const { data: user} = await Api.get('/auth');
            if (user) {
                setUser(user);
                console.log("Logged in as " + user.username);
            }
        }
        Cookies.set('token', data["token"]);
        Swal.fire({
            title: 'Erfolgreich eingeloggt',
            text: 'Sie sind jetzt eingeloggt',
            icon: 'success',
            toast: true,
            position: 'top-start',
            showConfirmButton: false,
            timer: 2000
        });
    }

    const logout = () => {
        Cookies.remove('token');
        setUser(null);
        delete Api.defaults.headers.Authorization;
        Swal.fire({
            title: 'Ausgeloggt',
            text: 'Du wurdest erfolgreich abgemeldet',
            icon: 'success',
            toast: true,
            position: 'top-start',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          });
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, loading, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);