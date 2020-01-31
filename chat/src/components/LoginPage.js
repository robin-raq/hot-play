import React, { Component } from 'react'
import {Link} from 'react-router-dom';

export default class LoginPage extends Component {
    state = {
        username: '',
        password: ''
    }

    handleSubmit = (evt) =>{
        evt.preventDefault()
        //this.props.onNewLogin(this.state)
        fetch(`http://localhost:3000/login`, {
            method:'POST',
            headers: { 
                'Content-type': 'application/json',
                'accept': 'application/json'
        },
            body: JSON.stringify(this.state)
        })
        .then(resp => resp.json())
        .then(respObj=> {
            
            if (!respObj.errors){
                this.props.onNewLogin(respObj.user)
            }
            else {
                alert(respObj.errors)
            }

        
        })
    }

    handleChange =(evt) =>{
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    render() {
        //console.log(this.state.username, this.state.password)
        
        return (
            <div>
                <h1>Welcome to HotPlay</h1>
                <h3>Please Login</h3>
                <form onSubmit = {this.handleSubmit}>
                    <input onChange ={this.handleChange} type = "text" placeholder = "username" name="username" value ={this.state.username}/>
                    <input onChange = {this.handleChange} type = "text" placeholder = "password" name ="password" value ={this.state.password}/>
                    <input type = "submit" value ="login"/>
                </form>
                <Link to= '/signup'>
                    <h3>Signup</h3>
                </Link>
        
            </div>
        )
    }
}
