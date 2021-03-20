import React from "react";
import {connect} from 'react-redux'

import {OPTION1, OPTION2} from "./QuestionPoll";

const PollResults = (props) => {
    const {question, authedUser} = props

    const countQ1 = question.optionOne.votes.length
    const countQ2 = question.optionTwo.votes.length
    const total = countQ1 + countQ2
    const userVote = question.optionOne.votes.includes(authedUser) ? OPTION1 : OPTION2

    return(
        <div>
            <div className='choice'>
                {
                    userVote === OPTION1 && <div id='vote-icon'>Your Vote</div>
                }
                <h4>{question.optionOne.text}</h4>
                <h5>{Math.round(countQ1/total*100)}%  ( {countQ1} of {total} votes )</h5>
            </div>
            <div className='choice'>
                {
                    userVote === OPTION2 && <div id='vote-icon'>Your Vote</div>
                }
                <h4>{question.optionTwo.text}</h4>
                <h5>{Math.round(countQ2/total*100)}% ( {countQ2} of {total} votes )</h5>
            </div>
        </div>
    )
}

function mapStateToProps({questions, authedUser}, {qid}){
    return{
        authedUser,
        question: questions[qid]
    }
}
export default connect(mapStateToProps)(PollResults)