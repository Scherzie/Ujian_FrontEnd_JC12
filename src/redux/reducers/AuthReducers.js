import { USER_LOGIN_FAILED, USER_LOGIN_START, USER_LOGIN_SUCCESS, LOGOUT, CHANGE_PASSWORD } from '../actions/type'

const INITIAL_STATE= {
    username:'',
    id:0,
    loading:false,
    islogin:false,
    errormes:'',
    role:'',
    email:''
}

export default (state=INITIAL_STATE,action)=> {
    switch(action.type) {
        case USER_LOGIN_START:
            return {...state,loading:true}
        case USER_LOGIN_SUCCESS:
            return {...state,loading:false,...action.payload,islogin:true}
        case USER_LOGIN_FAILED:
            return {...state,loading:false,errormes:action.payload}
        case 'ErrorClear':
            return INITIAL_STATE
        case LOGOUT: 
            return INITIAL_STATE
        case CHANGE_PASSWORD:
            return {...state,...action.payload}
        default:
            return state
    }
}