import {API} from "../config/host";
import {api} from "./configs/AxiosConfigs";

const BASE_USER = `${API}/users`;
export const UserAPI = {
    login : async function (email, password){
        return await api.post(`${BASE_USER}/login`,
            {
                email : email,
                password : password
            })
    },
    verify : async function (otp, email){
        return await api.post(`${BASE_USER}/verify`,
            {
                twoFactorCode : otp,
                email : email,
            })
    },
    createUser : async function (userData){
        return await api.post(`${BASE_USER}/signup`, userData)
    },
    getUserById : async function (userId){
        return await api.get(`${BASE_USER}/${userId}`)
    },
    getUsers : async function (){
        return await api.get(`${BASE_USER}/`)
    },
    getStudents : async function (){
        return await api.get(`${BASE_USER}/students`)
    },
    updateUser : async function (userId, userData){
        return await api.put(`${BASE_USER}/${userId}`,userData)
    },
    resetSecret : async function (userId){
        return await api.put(`${BASE_USER}/resetSecret/${userId}`)
    },
    deleteUser : async function (userId){
        return await api.delete(`${BASE_USER}/${userId}`)
    },
};