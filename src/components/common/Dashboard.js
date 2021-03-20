import {connect} from 'react-redux'
import React from 'react'
import Question from "../questions/Question";

const UNANSWERED = 'unanswered'
const ANSWERED = 'answered'


class Dashboard extends React.Component{
    state = {
        tab: UNANSWERED
    }
    changeTab = (e, tab) => {
        e.preventDefault()
        this.setState({
            tab
        })
    }
    render() {
        const {tab} = this.state
        const {answeredQuestions, unansweredQuestions} = this.props
        return (
            <div className='container'>
                <div className="tab">
                    <button className="tablinks" style={this.state.tab === UNANSWERED ? {backgroundColor: 'lightblue'} : {}} onClick={(e) => this.changeTab(e, UNANSWERED)}>Unanswered Questions</button>
                    <button className="tablinks" style={this.state.tab === ANSWERED ? {backgroundColor: 'lightblue'} : {}} onClick={(e) => this.changeTab(e, ANSWERED)}>Answered Questions</button>
                </div>
                <div id={UNANSWERED} className="tabcontent" hidden={tab!==UNANSWERED}>
                    {
                        unansweredQuestions.map((question) => (
                            <Question key={question.id} questionId={question.id}/>
                        ))
                    }
                </div>
                <div id={ANSWERED} className="tabcontent" hidden={tab!==ANSWERED}>
                    {
                        answeredQuestions.map((question) => (
                            <Question key={question.id} questionId={question.id}/>
                        ))
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps({authedUser, questions}){
    let answeredQuestions = []
    let unansweredQuestions = []
    for(let id of Object.keys(questions)){
        const question = questions[id]
        if(question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)){
            answeredQuestions.push(question)
        }
        else{
            unansweredQuestions.push(question)
        }
    }

    return{
        answeredQuestions: answeredQuestions.sort((a,b) => b.timestamp - a.timestamp),
        unansweredQuestions: unansweredQuestions.sort((a,b) => b.timestamp - a.timestamp),
    }
}
export default connect(mapStateToProps)(Dashboard)
