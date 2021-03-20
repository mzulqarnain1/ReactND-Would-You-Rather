import React from "react";
import {connect} from "react-redux"
import {withRouter} from "react-router-dom";
import Choices from "./Choices";
import PollResults from './PollResults'
import {handleSaveQuestionAnswer} from '../../actions/questions'
import {Redirect} from "react-router";

export const OPTION1 = 'optionOne'
export const OPTION2 = 'optionTwo'

class QuestionPoll extends React.Component{
    hasUserAnswered = (authUser, question) => {
        return question.optionOne.votes.includes(authUser) || question.optionTwo.votes.includes(authUser);
    }
    handleSubmit = (e, option) => {
        e.preventDefault()

        const {dispatch, question, authedUser} = this.props
        dispatch(handleSaveQuestionAnswer({
            authedUser,
            qid: question.id,
            answer: option
        }))
    }
    render() {
        const {authedUser, question, author} = this.props

        if(!question){
            return <Redirect to='/invalid'/>
        }

        const hasAnswered = this.hasUserAnswered(authedUser, question)
        return(
            <div className='center'>
                <div className='poll'>
                    <img
                        src={author.avatarURL}
                        alt={`Avatar of ${author.name}`}
                        className='avatar'
                    />
                    <div className='center'>
                        <h2 style={{color: "#418a34"}}>{author.name} Asks</h2>
                        <h3>Would You Rather?</h3>
                        {
                            hasAnswered === true
                                ? <PollResults qid={question.id}/>
                                : <Choices qid={question.id} handleSubmit={this.handleSubmit}/>
                        }

                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({authedUser, users, questions}, props){
    const {question_id} = props.match.params
    const question = questions[question_id]
    let author = null
    if(question){
        author = users[questions[question_id].author]
    }
    return{
        authedUser,
        question,
        author
    }
}
export default withRouter(connect(mapStateToProps)(QuestionPoll))