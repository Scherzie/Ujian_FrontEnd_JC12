import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBIcon } from "mdbreact";
import { Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import Axios from 'axios';
import { API_URL } from '../supports/ApiUrl';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import { BukanHome, IniHome } from '../redux/actions';
import { changeToRupiah } from '../supports/changeToRupiah';

class Home extends Component {
    state = {
        photos:[
            './image/carousel/1.jpg',
            './image/carousel/2.jpg',
            './image/carousel/3.jpg'
        ],
        products:[],
    
      }

    componentDidMount() {
        this.props.IniHome()
        Axios.get(`${API_URL}/products?_expand=category&_limit=5z`)
        .then((res)=>{
            this.setState({products:res.data})
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }

    componentWillUnmount=()=> {
        this.props.BukanHome()
    }
    renderphoto=()=> {
        return this.state.photos.map((val,index)=>{
            return (
            <MDBCarouselItem key={index} itemId={index+1}>
            <MDBView>
                <div style={{width:'100%',height:650, display:'flex'}}>
                    <img
                        src={val}
                        alt="Cover slide"
                        width='100%'
                    />
                </div>
            <MDBMask overlay="black-light" />
            </MDBView>
        </MDBCarouselItem>
            )
        })
    }

    renderProducts=()=> {
        return this.state.products.map((val,index)=>{
            return (
                <div key={index} className='p-3' style={{width:'20%'}}>
                    <Card>
                        <div style={{height:300, width:'100%'}}>
                            <img src={val.image} height='100%' width='100%' alt=""/>
                            <div className="kotakhitam">
                                <Link className="tombolbuynow" to={`/productdetail/${val.id}`}>
                                    <button className="tomboldalam">Product Details</button>
                                </Link>
                            </div>
                        </div>
                        <CardBody style={{height:160}}>
                            <CardTitle style={{fontWeight:'bold'}} className='mb-2'>{val.name}</CardTitle>
                            <CardSubtitle className='mb-2'>{changeToRupiah(val.price)}</CardSubtitle>
                            <div>
                                <MDBIcon icon="tag" />{val.category.name}
                            </div>
                        </CardBody>
                    </Card>
                </div>
            )
        })
    }

    render() { 
        return (
            <div>
                <MDBCarousel 
                activeItem={1} 
                length={this.state.photos.length}
                interval={2000}
                showControls={true}
                showIndicators={true}
                >
                    <MDBCarouselInner>
                    {this.renderphoto()}
                    </MDBCarouselInner>
                </MDBCarousel>
                <div className='px-5 pt-5'>
                    <Link to="/allproduct">
                        <div className="tittle">Go To All Product <FaArrowAltCircleRight/></div>
                    </Link>
                    <div className="d-flex">
                        {this.renderProducts()}
                    </div>
                </div>
            </div>
        )
    }
}

const MapstatetoProps=({Auth})=>{
    return{
        islogin:Auth.islogin
    }
}

export default connect(MapstatetoProps,{BukanHome,IniHome})(Home);