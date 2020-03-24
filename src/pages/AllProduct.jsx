import React, { Component } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { API_URL } from '../supports/ApiUrl';
import ProductItem from "../component/ProductItem";

class AllProduct extends Component {
    state = { 
        products:[],
        searchProducts:[],
        sortName:0,
        sortPrice:0,
        sortCat:0
     }

    componentDidMount() {
        Axios.get(`${API_URL}/products?_expand=category`)
        .then((res)=>{
            this.setState(
                {
                    products:res.data,
                    searchProducts:res.data
                }
            )
        }).catch((err)=>{
            console.log(err)
        })
    }
  
    onSearchClick=()=> {
        let inputName=this.name.value
        let inputCat=this.cat.value
        let inputMin=parseInt(this.min.value)
        let inputMax=parseInt(this.max.value)

        let hasilFilter=this.state.products.filter((product)=>{
            return (
                product.name.toLowerCase().includes(inputName.toLowerCase())&&
                product.cat.toLowerCase().includes(inputCat.toLowerCase())
            )
        })

        let hasilFilterPrice=hasilFilter.filter((product)=>{
                if (!inputMax && !inputMin){
                    return hasilFilter
                } if (inputMax && inputMin) {
                    return (product.price>=inputMin && product.price<=inputMax)
                } if (inputMax && !inputMin){
                    return (product.price<=inputMax)
                } if (!inputMax && inputMin){
                    return (product.price>=inputMin)
                }
        })
        this.setState({searchProducts:hasilFilterPrice})
    }

    onResetClick=()=> {
        this.name.value=''
        this.cat.value=''
        this.min.value=''
        this.max.value=''
        this.setState((prevState)=>{
            return{
                searchProducts: prevState.products
            }
        })
    }

    urut=(a,b)=> {
        return a.price-b.price
    }
    urutDes=(a,b)=> {
        return b.price-a.price
    }
      
    urutHuruf=(a,b)=> {
        var nameA = a.name.toUpperCase(); 
        var nameB = b.name.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
    }   

    urutHurufDes=(a,b)=> {
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();
        if (nameA > nameB) {
            return -1;
        }
        if (nameA < nameB) {
            return 1;
        }
    }   

    onSortName=()=> {
        if (!this.state.sortName){
            var hasilFilter=this.state.searchProducts.sort(this.urutHuruf)
            this.setState({searchProducts:hasilFilter})
            this.setState({sortName:1})
        } if (this.state.sortName){
            var hasilFilter=this.state.searchProducts.sort(this.urutHurufDes)
            this.setState({searchProducts:hasilFilter})
            this.setState({sortName:0})
        }
    }

    onSortCat=()=>{
        if (!this.state.sortCat){
            var hasilFilter=this.state.searchProducts.sort(this.urutHuruf)
            this.setState({searchProducts:hasilFilter})
            this.setState({sortCat:1})
        } if (this.state.sortCat){
            var hasilFilter=this.state.searchProducts.sort(this.urutHurufDes)
            this.setState({searchProducts:hasilFilter})
            this.setState({sortCat:0})
        }
    }

    onSortPrice=()=> {
        if (!this.state.sortPrice){
            var hasilFilter=this.state.searchProducts.sort(this.urut)
            this.setState({searchProducts:hasilFilter})
            this.setState({sortPrice:1})
        } if (this.state.sortPrice){
            var hasilFilter=this.state.searchProducts.sort(this.urutDes)
            this.setState({searchProducts:hasilFilter})
            this.setState({sortPrice:0})
        }
    }

    renderList=()=> {
        return this.state.searchProducts.map((product)=>{
            return(
                <ProductItem products={product} key={product.id}/>
            )
        })  
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-3">
                            <div className="card mt-5 p-3 shadow-sm mr-2">
                                <div className="card-title border-bottom border-dark">
                                    <h3 className="d-inline">Search</h3>
                                </div>
                                <form className="form-group mb-0 mx-2">
                                    <h5>Name :</h5>
                                    <input onChange={this.onSearchClick} 
                                    ref={(input)=>{this.name=input}} 
                                    className="form-control my-3 btn-light" placeholder="product" type="text" name="" id=""/>
    
                                    <h5>Cat :</h5>
                                    <input onChange={this.onSearchClick} 
                                    ref={(input)=>{this.cat=input}} 
                                    className="form-control my-3 btn-light" placeholder="cat" type="text" name="" cat=""/>
    

                                    <h5>Price :</h5>
                                    <input onChange={this.onSearchClick} 
                                    ref={(input)=>{this.min=input}} 
                                    className="form-control btn-light" placeholder="minimum" type="text" name="" id=""/>
                                    <input onChange={this.onSearchClick} 
                                    ref={(input)=>{this.max=input}} 
                                    className="form-control my-3 btn-light" placeholder="maximum" type="text" name="" id=""/>
                                </form>
                                <div className="d-inline-block align-bottom text-right">
                                    <button onClick={this.onResetClick} className="btn btn-block btn-sm btn-secondary">Refresh</button>
                                </div>
                            </div>
                            <div className="card mt-2 p-3 shadow-sm mr-2">
                                <div className="card-title border-bottom border-dark">
                                    <h3 className="d-inline">Sort by</h3>
                                </div>
                                <div className="mx-2">
                                    <button onClick={this.onSortName} className="btn btn-sm btn-block btn-warning">Product Name</button>
                                    <button onClick={this.onSortCat} className="btn btn-sm btn-block btn-warning">Product Cat</button>
                                    <button onClick={this.onSortPrice} className="btn btn-sm btn-block btn-warning">Product Price</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-9 row mt-5 p-0" style={{height:"30px"}}>
                            <div className="col-12 display-4 text-center mb-2 shadow-sm p-2 card ">Product List</div>
                                {this.renderList()}
                        </div>
                        </div>
                    </div>
                </div>
        )
    }
}

const mapStateToProps=state=>{
    return {
        User:state.Auth
    }
  }

export default connect(mapStateToProps)(AllProduct)