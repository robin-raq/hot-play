import React, { Component } from 'react';
import {Link} from 'react-router-dom';
// import tachyons from 'tachyons';

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
            console.log(respObj)
            
            if (!respObj.errors){
                localStorage.token = respObj.token
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
                <h1 className="link dim black b f1 f-headline-ns tc db mb3 mb4-ns">Welcome to HotPlay</h1>

                <main className="pa4 black-80">
                    <form
                        className = "measure center" 
                        onSubmit = {this.handleSubmit}>
                <legend className="f4 fw6 ph0 mh0" >Please Login</legend>
                    <fieldset 
                        id="sign_up" 
                        className="ba b--transparent ph0 mh0">

                        <input 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                            onChange ={this.handleChange} type = "text" placeholder = "username" name="username" value ={this.state.username}/>
                        <input 
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                            onChange = {this.handleChange} 
                            type = "password" 
                            placeholder = "password" 
                            name ="password" 
                            value ={this.state.password}/>
                        </fieldset>
                        
                        <input 
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type = "submit" 
                            value ="login"

                        />
                        
                <Link to= '/signup' >
                    <h4 className="f6 link  db" >Signup</h4>
                </Link>
                    </form>
                </main>
        
            </div>
        )
    }
}
