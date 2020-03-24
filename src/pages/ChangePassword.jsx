import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import { API_URL } from "../supports/ApiUrl";
import { changePassword } from '../redux/actions';

class ChangePassword extends Component {
    state = { 
        passChangeSuccess: false   
     }

  componentDidMount() {
    console.log(this.props.usernamechangepass);
  }

  handleChangePassClick = () => {
    var currentPassword = this.refs.currentPassword.value;
    var newPassword = this.refs.newPassword.value;
    var password = this.refs.confirmPassword.value;

    var updatePass = {
        password,
        username: this.props.usernamechangepass,
        role: this.props.role,
        email:this.props.email
    };
    console.log(updatePass);
    if (currentPassword === "" || newPassword === "" || password === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "The Password is still empty"
      });
    } else if (currentPassword === newPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "The Password still the same as before, therefore no change needed"
      });
    } else if (currentPassword !== this.props.passuser) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You input a wrong Password"
      });
    } else if (newPassword !== password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please re-check your password, the new Password and the confirmation need to be same!"
      });
    } else {
      Axios.put(`${API_URL}/users/${this.props.userid}`,updatePass)
        .then(res => {
          Swal.fire({
            title: "Anda Yakin?",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancel",
            confirmButtonText: "Confirm"
          }).then(result => {
            if (result.value) {
              this.props.GantiPassword(res.data);
              this.setState({ passChangeSuccess: true });
              Swal.fire({
                title: "Your Password has been successfully changed",
                showConfirmButton: false,
                timer: 3000
              });
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };



    render() { 

        if (this.state.passChangeSuccess || this.props.userlog === false) {
            return <Redirect to="/" />;
          }
        return ( 
            <div className="register-container">
                <form onSubmit={this.handleChangePassClick} >
                    <div className="auth-card">
                    <p className="register-title">Change Password</p>
                    <p className="register-title" >{this.props.usernamechangepass} </p>
                    <input className="input" placeholder="Current Password" type="password" ref="currentPassword"/>
                    <input className="input" placeholder="New Password" type="password" ref="newPassword"/>
                    <input className="input" placeholder="Confirm New Password" type="password" ref="confirmPassword"/>
                    <button className="register" onClick={this.handleChangePassClick} title="Register">
                        Submit
                    </button>
                </div>
                    </form>
            </div>
         );
    }
}

const reduxState = state => {
    return {
      usernamechangepass: state.Auth.username,
      userlog: state.Auth.login,
      userid: state.Auth.id,
      passuser: state.Auth.password,
      role: state.Auth.role,
      email:state.Auth.email
    };
  };
  
  export default connect(reduxState,{changePassword})(ChangePassword);