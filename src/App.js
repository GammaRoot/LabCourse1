import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      title: 'Your Order',
      act: 0,
      index: '',
      datas: []
    }
  } 

  componentDidMount(){
    this.refs.name.focus();
  }

  fSubmit = (e) =>{
    e.preventDefault();
    console.log('try');

    //not this
    let datas = this.state.datas;
    let name = this.refs.name.value;
    let address = this.refs.address.value;
    let customer = this.refs.customer.value;

    if(this.state.act === 0){   //new
      let data = {
        name, address, customer
      }
      datas.push(data);
    }else{                      //update
      let index = this.state.index;
      datas[index].name = name;
      datas[index].address = address;
      datas[index].customer = customer;
    }    

    this.setState({
      datas: datas,
      act: 0
    });

    this.refs.myForm.reset();
    this.refs.name.focus();
  }

  fRemove = (i) => {
    let datas = this.state.datas;
    datas.splice(i,1);
    this.setState({
      datas: datas
    });

    this.refs.myForm.reset();
    this.refs.name.focus();
  }

  fEdit = (i) => {
    let data = this.state.datas[i];
    this.refs.name.value = data.name;
    this.refs.address.value = data.address;
    this.refs.customer.value = data.customer;

    this.setState({
      act: 1,
      index: i
    });

    this.refs.name.focus();
  }  

  render() {
    let datas = this.state.datas;
    return (
      <div className="App">
        <h2>{this.state.title}</h2>
        <form ref="myForm" className="myForm">
          <input type="text" ref="name" placeholder="Product" className="formField" />
          <input type="text" ref="address" placeholder="Address" className="formField" />
          <input type="text" ref="customer" placeholder="Customer" className="formField" />
          <button onClick={(e)=>this.fSubmit(e)} className="myButton">Order Now</button>
        </form>
        <pre>
          {datas.map((data, i) =>
            <li key={i} className="myList">
              {i+1}. {data.name}, {data.address} , {data.customer}
              <button onClick={()=>this.fRemove(i)} className="myListButton">Delete Order </button>
              <button onClick={()=>this.fEdit(i)} className="myListButton">Edit Order </button>
            </li>
          )}
        </pre>
      </div>
    );
  }
}

export default App;