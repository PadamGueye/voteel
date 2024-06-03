import {API} from "../config/host";
import {api} from "./configs/AxiosConfigs";

const BASE_ELECTION = `${API}/votes`;
export const VoteAPI = {
    vote : async function (data){
        return await api.post(`${BASE_ELECTION}/`, data)
    },
    verify : async function (otp, email){
        return await api.post(`${BASE_ELECTION}/verify`,
            {
                twoFactorCode : otp,
                email : email,
            })
    },
    createUser : async function (userData){
        return await api.post(`${BASE_ELECTION}/signup`, userData)
    },
    getUserById : async function (userId){
        return await api.get(`${BASE_ELECTION}/${userId}`)
    },
    getPositions : async function (){
        return await api.get(`${BASE_ELECTION}/`)
    },
    getStudents : async function (){
        return await api.get(`${BASE_ELECTION}/students`)
    },
    updateUser : async function (userId, userData){
        return await api.put(`${BASE_ELECTION}/${userId}`,userData)
    },
    resetSecret : async function (userId){
        return await api.put(`${BASE_ELECTION}/resetSecret/${userId}`)
    },
    deleteElection : async function (electionId){
        return await api.delete(`${BASE_ELECTION}/${electionId}`)
    },
};