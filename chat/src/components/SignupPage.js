import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class SignupPage extends Component {
    state = {
        username: '',
        password: '',
        image_url: ''
    }

    handleSubmit = (evt) =>{
        
        evt.preventDefault()
        //this.props.onNewSignup(this.state)
        fetch(`http://localhost:3000/users`, {
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
                this.props.onNewSignup(respObj.user)
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
        //console.log(this.props)
        return (
            <div>
            <h1>Welcome to HotPlay</h1>
                <h3>Please Signup</h3>
                <form onSubmit = {this.handleSubmit}>
                    <input onChange ={this.handleChange} type = "text" placeholder = "username" name="username" value ={this.state.username}/>
                    <input onChange ={this.handleChange} type = "text" placeholder = "paste image link here" name="image_url" value ={this.state.image_url}/>
                    <input onChange = {this.handleChange} type = "text" placeholder = "password" name ="password" value ={this.state.password}/>
                    <input type = "submit" value ="Create Account"/>
                </form>
                <Link to= '/'>
                    <h3>Login</h3>
                </Link>
                
            </div>
        )
    }
}
