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
                localStorage.token = respObj.token
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
            <div className = "login">
            <h1 className="link dim black b f1 f-headline-ns tc db mb3 mb4-ns glow">Welcome to HotPlay</h1>
                <h2 className="mt2 mb0 f4 fw4 ttu tc tracked"> 🔥 Discover, Listen, Connect 🔥</h2>
            <main className="pa4 black-80">
                <form 
                    className = "measure center"
                    onSubmit = {this.handleSubmit}>
                    
                <legend className="f4 fw6 ph0 mh0" >Please Signup</legend>
                <fieldset 
                        id="sign_up" 
                        className="ba b--transparent ph0 mh0">
                    <input 
                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                        onChange ={this.handleChange} type = "text" placeholder = "username" name="username" value ={this.state.username}/>
                    <input 
                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                        onChange ={this.handleChange} type = "text" placeholder = "paste image link here" name="image_url" value ={this.state.image_url}/>
                    <input 
                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                        onChange = {this.handleChange} type = "password" placeholder = "password" name ="password" value ={this.state.password}/>
                    </fieldset>
                    <input 
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                    type = "submit" 
                    value ="Create Account"/>
                <Link to= '/'>
                    <h4 className="f6 link  db">Login</h4>
                </Link>
                </form>
                </main>
                
            </div>
        )
    }
}
