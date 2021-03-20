import React from "react";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom'

class Question extends React.Component{
    toPoll = (e, id) => {
        e.preventDefault()
        this.props.history.push(`/question/${id}`)
    }
    render() {
        const {question, author} = this.props
        return(
            <div>
                <div className='question'>
                    <img
                        src={author.avatarURL}
                        alt={`Avatar of ${author.name}`}
                        className='avatar'
                    />
                    <div className='center'>
                        <h2 style={{color: "#418a34"}}>{author.name} Asks</h2>
                        <h3>Would You Rather?</h3>
                        <span>{question.optionOne.text.substring(0, 20)}...</span>
                        <button className='btn' onClick={(e) => this.toPoll(e, question.id)}>View Poll</button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({users, questions}, {questionId}){
    return{
        question: questions[questionId],
        author: users[questions[questionId].author]
    }
}

export default withRouter(connect(mapStateToProps)(Question))
