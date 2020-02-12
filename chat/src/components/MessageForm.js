import React, { Component } from 'react'

export default class MessageForm extends Component {

    state = {
        message: ''
    }

    handleChange = (evt)=>{
        this.setState({
            [evt.target.name]: evt.target.value
        })

    }

    handleSubmit = (evt) =>{
        evt.preventDefault()
        this.props.onNewMessage(this.state.message)
        this.setState({message: ''})
    }
    render() {
        //console.log(this.state, "from messageForm")
        return (
            <form 
                className="bg-light-red mw7 center pa4 br2-ns ba b--black-10"
                onSubmit ={this.handleSubmit}>
                <fieldset className="cf bn ma0 pa0">
                <div className="cf">
            <input 
                className="f6 f5-l input-reset bn fl black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns"
                onChange = {this.handleChange} type="text" placeholder ="send a message" name = "message" value = {this.state.message}/>
            <input 
                className="f6 f5-l button-reset fl pv3 tc bn bg-animate bg-black-70 hover-bg-black white pointer w-100 w-25-m w-20-l br2-ns br--right-ns"
                type="submit" value = "Say it!" />
            </div>
            </fieldset>

            </form>
        )
    }
}
