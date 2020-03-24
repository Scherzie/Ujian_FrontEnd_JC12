import React, { useState } from "react";
import { MDBInput, MDBBtn, MDBAlert } from 'mdbreact';
import { connect } from 'react-redux';
import { LoginUser, errormessageclear } from '../redux/actions';
import { Redirect } from 'react-router-dom';

const Login=(props)=>{
    const [data,setdata]=useState({
        username:'',
        password:''
    })
    const dataOnChange=(e)=>{
        setdata({...data,[e.target.name]:e.target.value})
    }
    const onFormSubmit=(e)=>{
        e.preventDefault()
        props.LoginUser(data)
    }
    if(props.islogin){
        return <Redirect to='/' />
    }
    return (
        <div>
            <div className='d-flex justify-content-center align-items-center' style={{height:'90vh'}}>
                <form style={{width:'30%'}} onSubmit={onFormSubmit}>
                    <p className="h3 text-center mb-4">Sign in</p>
                    <div className="grey-text">
                        <MDBInput label="Type your username" value={data.username} name="username" onChange={dataOnChange} icon="user-secret" group type="text" validate/>
                        <MDBInput label="Type your password" value={data.password} name="password" onChange={dataOnChange} icon="lock" group type="password" validate />
                    </div>
                        {
                            props.errormes?
                            <MDBAlert color="danger">
                                {props.errormes}<span className="float-right hovererr" onClick={()=>props.errormessageclear()}>X</span>
                            </MDBAlert>
                            : null
                        }
                    <div className="text-center">
                        <MDBBtn type="submit" disabled={props.loading}>Login</MDBBtn>
                    </div>
                </form>
            </div>
        </div>
    );
};

const MapstatetoProps=(state)=>{
    return state.Auth
}

export default connect (MapstatetoProps,{LoginUser,errormessageclear})(Login);