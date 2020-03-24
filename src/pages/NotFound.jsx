import React, { Component } from 'react';

class Notfound extends Component {
    state = {  }
    render() { 
        return (
            <div className="DeadLink">
                <h1 style={{marginLeft:"10%", color:"crimson"}}>OMG!</h1>
                <h4 style={{color:"lightgreen"}}>It Looks Like You Found a</h4>
                <h3 style={{color:"darkgray"}}>Dead Link</h3>
                <img src="https://i.pinimg.com/originals/2f/f4/8d/2ff48d36e670e4ecc0fda90df16c45d6.png" alt="Dead Link" width="70%" height="70%"/>               
            </div>
          );
    }
}
 
export default Notfound;