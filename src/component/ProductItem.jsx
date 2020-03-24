import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { API_URL } from '../supports/ApiUrl';
import { changeToRupiah } from '../supports/changeToRupiah';

const onAddCart=(ID,TOTAL)=> {
    return{
        type:"ADD_CART",
        payload:{
            id:ID,
            total:TOTAL
        }
    }
}

class ProductItem extends Component {
    state={
        selectedId:"",
        selectedTotal:0,
    }

    onAddClick=(id)=> {
        let totalInput=parseInt(this.total.value) 
            if (this.total.value=="") {
                totalInput=1
            }
        this.setState({selectedTotal:totalInput})
        axios.get(`${API_URL}/products?_expand=category`,
            {
                param:{
                    id:id
                }
            }
        ).then((res)=> {
            this.setState({selectedId:res.data[id-1].id})
            var jenis=this.state.selectedId
            var total=this.state.selectedTotal
            var newCart={
                jenis,total
            }
            var oldCart=JSON.parse(localStorage.getItem('userCart')) || []
            oldCart.push(newCart)
            localStorage.setItem('userCart', JSON.stringify(oldCart))
        }).catch((err)=> {
            console.log(err)
        })
    }

    
    render(){
        let {id, name, price, image, cat} = this.props.products
        return(
            <div className="card col-4 mb-2 shadow-sm p-4">
                
                <Link to={`/productdetail/${id}`}>
                    <div className="text-center" style={{height:"200px"}}>
                        <img className="" src={image} style={{width:"200px"}}/>
                    </div>
                    <div className="card-body">
                        <center><h5 className="card-title text-dark" style={{height:"60px"}} >{name}</h5></center>
                        <center><h5 className="card-title text-primary" style={{height:"10px"}} >{cat}</h5></center>
                    </div>
                </Link >
                    <div className="text-right">    
                        <center><h5 className="card-text text-right text-success d-inline" style={{height:"20px"}} >{changeToRupiah(price)}</h5></center>
                    </div>
                    
            </div>
           
        )
            
    }
}

export default connect(null,{onAddCart})(ProductItem)