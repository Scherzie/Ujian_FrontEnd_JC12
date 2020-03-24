import Axios from 'axios';
import { USER_LOGIN_START, USER_LOGIN_FAILED, USER_LOGIN_SUCCESS, LOGOUT, CHANGE_PASSWORD } from "./type"
import { API_URL } from "../../supports/ApiUrl";

export const LoginUser=({username,password})=>{
    return (dispatch)=>{
        dispatch({type:USER_LOGIN_START})
        if(username===''||password===''){ //kalo ada input yang kosong
            dispatch({type:USER_LOGIN_FAILED, payload:'username atau password tidak terisi'})
        }else{
            Axios.get(`${API_URL}/users`,{
                params:{
                    username:username,
                    password:password
                }
            })
            .then((res)=>{
                if(res.data.length){ //kalo ada user
                    localStorage.setItem('iduser',res.data[0].id)
                    dispatch({type:USER_LOGIN_SUCCESS,payload:res.data[0]})
                }else{
                    dispatch({type:USER_LOGIN_FAILED, payload:'username atau password tidak terdaftar'})
                }
            }).catch((err)=>{
                console.log(err)
            })
        }
    }
}

export const errormessageclear=()=>{
    return{
        type:'ErrorClear'
    }
}

export const KeepLogin=(data)=>{
    return{
        type:USER_LOGIN_SUCCESS,
        payload:data
    }
}

export const Logout=()=>{
    localStorage.removeItem('iduser')
    return {
        type:LOGOUT
    }
}

export const changePassword =(newPassword)=> {
    return {
        type:CHANGE_PASSWORD,
        payload:newPassword
    }
}