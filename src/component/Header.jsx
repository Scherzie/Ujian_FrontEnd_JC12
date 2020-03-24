import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBNavLink } from "mdbreact";
import { connect } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import { BukanHome, IniHome, Logout } from '../redux/actions'
import { FiShoppingCart } from 'react-icons/fi';

class Header extends Component {
state = {
  isOpen: false
};

toggleCollapse =()=> {
  this.setState({ isOpen: !this.state.isOpen });
}

render() {
  return (
      <MDBNavbar color="headercolor" transparent={this.props.Header} scrolling fixed="top" dark expand="md">
        <img src="https://4.bp.blogspot.com/-MBpr5NcZd-4/WDfz1r6FRuI/AAAAAAAEOo8/yvKOu_IEnbcCQXgxKZ9H6NoBQmj9SVxOACLcB/s1600/AS001112_00.gif?time=Tue%20Mar%2024%202020%2010:13:07%20GMT+0700%20(Western%20Indonesia%20Time)" alt="Isabelle Logo" className="isabelleLogo"/>
        <MDBNavbarBrand href='/'>
          <strong className="white-text logo">NS Shop</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav right className ='mr-5'>
            <MDBNavItem>
              {
                this.props.User.role==='admin'?
                <MDBNavLink to='/manageadmin'>
                  Manage Admin
                </MDBNavLink>
                : null
              }
              {
                this.props.User.islogin&&this.props.User.role==='user'?
                <MDBNavLink to='/cart'>
                  <FiShoppingCart style={{fontSize:20}}/> Cart
                </MDBNavLink>
                : null
              }
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to='/register'>
                Register
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              {
                this.props.User.islogin?
                null
                :
                <MDBNavLink to='/login'>
                  Login
                </MDBNavLink>
              }              
            </MDBNavItem>
            <MDBNavItem>
              {
                this.props.User.username?
                <MDBDropdown>
                  <MDBDropdownToggle nav className="warnanav">
                      <FaUserCircle/> Hello, {this.props.User.username}
                  </MDBDropdownToggle>
                  <MDBDropdownMenu className="dropdown1">
                    <MDBNavLink to='/changepassword'>
                      <MDBDropdownItem>
                        Change Password
                      </MDBDropdownItem>
                    </MDBNavLink>
                    <MDBNavLink to='/' onClick={this.props.Logout}>
                      <MDBDropdownItem>
                        Log Out
                      </MDBDropdownItem>
                    </MDBNavLink>
                  </MDBDropdownMenu>
                </MDBDropdown>
                : null
              }
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

const MapstatetoProps=(state)=>{
  return{
    User:state.Auth,
    Header:state.Header.ishome
  }
}

export default connect(MapstatetoProps,{IniHome, BukanHome, Logout})(Header);