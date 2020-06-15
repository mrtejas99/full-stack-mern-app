import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import axios from "axios";
import './index.css'

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', age: null};
  }

  getData = (e) => {     
    let key = e.target.name;
    let val = e.target.value;
    this.setState({[key]: val});
  }

  handleSubmit = e => {
    e.preventDefault();
    const data = {
      user: this.state.username,
      age: this.state.age
    };
    axios
      .post("http://127.0.0.1:5000/api ", data)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }
render(){
    return( 
        <form onSubmit={this.handleSubmit} >
            <input  type='text' name='username' onChange={this.getData}  placeholder='user'/>

            <input  type='number' name='age'  onChange={this.getData}  placeholder='age'/>

            <button type="submit">Add user</button>
        </form>
    )
  }
}


class ListUser extends Component {
  constructor(props) {
    super(props);
    this.state = {userList:[]};
  }

componentDidMount() {
        axios.get('http://127.0.0.1:5000/api')
        .then((res) => {
          const users = res.data;
          console.log(users);
          this.setState({ userList: users});
        });
    }
render() {
        return <table >
        <tr><th>user</th><th>age</th></tr>
        {this.state.userList.map((i) => {
            return(
                <tr key={i.id}>
                    <td>{i.user}</td>
                    <td>{i.age}</td>
                </tr>
            )
         })}
         </table>
 }
}

ReactDOM.render(<CreateUser />, document.getElementById('root'));
ReactDOM.render(<ListUser />, document.getElementById('display'));


