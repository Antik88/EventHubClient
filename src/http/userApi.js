import { $authHost, $host } from ".";
import { jwtDecode } from "jwt-decode";

export const registration = async (name, email, passwordHash) => {
    const response = await $host.post('Auth/register', {name, email, passwordHash})
    localStorage.setItem('token', response.data)
    return jwtDecode(response.data) 
}

export const login = async (userName, password) => {
    const response = await $host.post('Auth/login', {userName, password})
    localStorage.setItem('token', response.data)
    localStorage.setItem('userId', jwtDecode(response.data)['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'])
    return jwtDecode(response.data)
}

export const check = async () => {
    const response = await $authHost.post('Auth/check')
    localStorage.setItem('token', response.data)
    return response
}