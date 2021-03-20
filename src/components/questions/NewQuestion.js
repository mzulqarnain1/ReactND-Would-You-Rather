import React from "react";
import {connect} from "react-redux";
import {handleSaveQuestion} from "../../actions/questions";
import {withRouter} from "react-router-dom";
import {NotificationManager} from 'react-notifications'

class NewQuestion extends React.Component{
    state = {
        optionOne: '',
        optionTwo: ''
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        if(this.state.optionOne === '' || this.state.optionTwo === ''){
            NotificationManager.error('Fill Both Choices For Question', 'Fill Form', 1000)
            return
        }
        const {authedUser, dispatch} = this.props
        dispatch(handleSaveQuestion({
            optionOneText: this.state.optionOne,
            optionTwoText: this.state.optionTwo,
            author: authedUser
        }))
        this.props.history.push('/')
    }
    render() {
        const {optionOne, optionTwo} = this.state
        return(
            <div className='container'>
                <form className='new-question' onSubmit={this.handleSubmit}>
                    <h2>Create New Question</h2>
                    <h3>Would You Rather...</h3><br/>
                    <input type="text" id="option1" placeholder='Option 1 Text Here' name="optionOne" value={optionOne} onChange={this.onChange}/><br/>
                    <input type="text" id="option2" placeholder='Option 2 Text Here' name="optionTwo" value={optionTwo} onChange={this.onChange}/><br/><br/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}

function mapStateToProps({authedUser}){
    return{
        authedUser
    }
}

export default withRouter(connect(mapStateToProps)(NewQuestion))
