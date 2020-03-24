import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL } from '../supports/ApiUrl';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class ManageAdmin extends Component {
    state = {
        products:[],
        isModaladdOpen:false,
        isModaleditOpen:false,
        indexedit:0,
        indexdelete:-1,
        categories:[]
      }

    componentDidMount(){
        Axios.get(`${API_URL}/products?_expand=category`)
        .then((res)=>{
            Axios.get(`${API_URL}/categories`)
            .then((categories)=>{
                this.setState({products:res.data,categories:categories.data})
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    toggleadd=()=>{
        this.setState({isModaladdOpen:!this.state.isModaladdOpen})
    }

    toggleedit=()=>{
        this.setState({isModaleditOpen:!this.state.isModaleditOpen})
    }

    onSaveaddDataClick=()=>{
        var nameadd=this.refs.nameadd.value
        var imageadd=this.refs.imageadd.value
        var stockadd=parseInt(this.refs.stockadd.value)
        var categoryadd=parseInt(this.refs.categoryadd.value)
        var priceadd=parseInt(this.refs.priceadd.value)
        var descriptionadd=this.refs.descriptionadd.value
        var obj={
            name:nameadd,
            image:imageadd,
            stock:stockadd,
            categoryId:categoryadd,
            price:priceadd,
            description:descriptionadd
        }
        Axios.post(`${API_URL}/products`,obj)
        .then((res)=>{
            console.log(res.data)
            Axios.get(`${API_URL}/products?_expand=category`)
            .then((resakhir)=>{
                this.setState({products:resakhir.data,isModaladdOpen:false})
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    onEditClick=(index)=>{
        this.setState({indexedit:index,isModaleditOpen:true})
    }

    onSaveEditClick=()=>{
        var nameedit=this.refs.nameedit.value
        var imageedit=this.refs.imageedit.value
        var stockedit=parseInt(this.refs.stockedit.value)
        var categoryedit=parseInt(this.refs.categoryedit.value)
        var priceedit=parseInt(this.refs.priceedit.value)
        var descriptionedit=this.refs.descriptionedit.value
        var obj={
            name:nameedit,
            image:imageedit,
            stock:stockedit,
            categoryId:categoryedit,
            price:priceedit,
            description:descriptionedit
        }
        var id=this.state.products[this.state.indexedit].id
        console.log(obj,id)
        Axios.put(`${API_URL}/products/${id}`,obj)
        .then((res)=>{
            Axios.get(`${API_URL}/products?_expand=category`)
            .then((resakhir)=>{
                this.setState({products:resakhir.data,isModaleditOpen:false})
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    deleteconfirm=(index,id)=>{
        Swal.fire({
            title: `Are you sure wanna delete ${this.state.products[index].name}?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
                Axios.delete(`${API_URL}/products/${id}`)
                .then((res)=>{
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    ).then((result)=>{
                        if(result.value){
                            Axios.get(`${API_URL}/products`)
                            .then((res1)=>{
                                this.setState({products:res1.data})
                            })
                        }
                    })
                }).catch((err)=>{
                    console.log(err)
                })
            }
          })
    }

    renderProducts=()=>{
        const {products} =this.state
        return products.map((val,index)=>{
            return (
                <tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td>{val.name}</td>
                    <td><img src={val.image} alt={val.name} width='150' height='200px'/></td>
                    <td>{val.stock}</td>
                    <td>{val.category.name}</td>
                    <td>{val.price}</td>
                    <td>{val.description}</td>
                    <td>
                        <button className='btn btn-primary' onClick={()=>this.onEditClick(index)}>Edit</button>
                        <button className='btn btn-danger' onClick={()=>this.deleteconfirm(index,val.id)}>Delete</button>
                    </td>
                </tr>
            )
        })
    }

    rendercategorytoadd=()=>{
        return this.state.categories.map((val,index)=>{
            return <option key={index} value={val.id}>{val.name}</option>
        })
    }

    render() { 
        const {indexedit,products}=this.state
        if(this.props.User.role==='admin'){
            return (
                <div className='pt-5'>
                    {/* Add */}
                    <Modal isOpen={this.state.isModaladdOpen} toggle={this.toggleadd}>
                        <ModalHeader toggle={this.toggleadd}>Add Data</ModalHeader>
                        <ModalBody>
                            <input type="text" ref='nameadd' placeholder='Product Name' className='form-control mt-2'/>
                            <input type="text" ref='imageadd' placeholder='URL Image' className='form-control mt-2'/>
                            <input type="number" ref='stockadd' placeholder='Jumlah Stock' className='form-control mt-2'/>
                            <select ref='categoryadd' className='form-control mt-2'>
                                <option value="" hidden>Choose Category</option>
                                {this.rendercategorytoadd()}
                            </select>
                            <input type="number" ref='priceadd' placeholder='price' className='form-control mt-2'/>
                            <textarea cols="20" rows="5" ref='descriptionadd' className='form-control mt-2' placeholder='description'></textarea>
                        </ModalBody>
                        <ModalFooter>
                        <Button color="primary" onClick={this.onSaveaddDataClick}>Save</Button>{' '}
                        <Button color="secondary" onClick={this.toggleadd}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                    {
                        this.state.products.length?
                        // Edit
                        <Modal isOpen={this.state.isModaleditOpen} toggle={this.toggleedit}>
                            <ModalHeader toggle={this.toggleedit}>Edit Data{products[indexedit].name}</ModalHeader>
                            <ModalBody>
                                <input type="text" ref='nameedit' defaultValue={products[indexedit].name} placeholder='Product Name' className='form-control mt-2'/>
                                <input type="text" ref='imageedit' defaultValue={products[indexedit].image} placeholder='URL Image' className='form-control mt-2'/>
                                <input type="number" ref='stockedit' defaultValue={products[indexedit].stock} placeholder='Stock Quantity' className='form-control mt-2'/>
                                <select ref='categoryedit' defaultValue={products[indexedit].categoryId} className='form-control mt-2'>
                                    <option value="" hidden>Choose Category</option>
                                    {this.rendercategorytoadd()}
                                </select>
                                <input type="number"  defaultValue={products[indexedit].price} ref='priceedit' placeholder='price' className='form-control mt-2'/>
                                <textarea cols="20" rows="5"  defaultValue={products[indexedit].description} ref='descriptionedit' className='form-control mt-2' placeholder='description'></textarea>
                            </ModalBody>
                            <ModalFooter>
                            <Button color="primary" onClick={this.onSaveEditClick}>Save</Button>{' '}
                            <Button color="secondary" onClick={this.toggleedit}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                        : null
                    }
                    <button className='btn btn-primary' onClick={this.toggleadd}>Add Data</button>
                    <Table striped>
                    <thead>
                        <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Stock</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderProducts()}
                    </tbody>
                    </Table>
                </div>
            );
        }else{
            return <Redirect to='/notfound'/>
        }
    }
}
 
const MapstatetoProps=(state)=>{
    return{
        User:state.Auth
    }
}

export default connect(MapstatetoProps)(ManageAdmin);