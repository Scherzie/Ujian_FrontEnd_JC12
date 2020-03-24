import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './component/Header';
import Home from './pages/Home';
import ChangePassword from './pages/ChangePassword';
import AllProduct from './pages/AllProduct';
import { Switch, Route } from 'react-router-dom';
import Axios from 'axios';
import { API_URL } from './supports/ApiUrl';
import { connect } from 'react-redux';
import { KeepLogin } from './redux/actions';
import ManageAdmin from './pages/ManageAdmin';
import Notfound from './pages/NotFound';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';

function App({KeepLogin}) {

  const [Loading,setLoading]=useState(true)

  useEffect(()=>{
    var id = localStorage.getItem('iduser')
    if(id){
      Axios.get(`${API_URL}/users/${id}`)
      .then(res=>{
        KeepLogin(res.data)
      }).catch((err)=>{
        console.log(err)
      }).finally(()=>{
        setLoading(false)
      })
    }else{
      setLoading(false)
    }
  },[])
  if(Loading){
    return <div>loading.....</div>
  }
    return (
      <div>
        <Header/>
        <Switch>
          <Route path='/' exact component ={Home}/>
          <Route path='/login' exact component ={Login}/>
          <Route path='/register' exact component ={Register}/>
          <Route path='/changepassword' exact component ={ChangePassword}/>
          <Route path='/manageadmin' exact component ={ManageAdmin}/>
          <Route path='/allproduct' exact component ={AllProduct}/>
          <Route path='/productdetail/:idprod' exact component ={ProductDetail}/>
          <Route path='/cart' exact component ={Cart}/>
          <Route path='/*' component ={Notfound}/>
        </Switch>
      </div>
    )
}

export default connect(null,{KeepLogin})(App);