import React from "react";
import {connect} from "react-redux";

import {OPTION1, OPTION2} from "./QuestionPoll";

class Choices extends React.Component {
    state = {
        option : OPTION1
    }
    onChange = (e, option) => {
        this.setState({
            option: option
        })
    }
    render() {
        const {question, handleSubmit} = this.props
        const optionOne = question.optionOne.text
        const optionTwo = question.optionTwo.text

        return (
            <form onSubmit={(e) => handleSubmit(e, this.state.option)}>
                <label className="radio-container">{optionOne}
                    <input
                        type="radio"
                        name="options"
                        checked={this.state.option === OPTION1}
                        onChange={(e) => this.onChange(e, OPTION1)}/>
                    <span className="checkmark"/>
                </label>
                <label className="radio-container">{optionTwo}
                    <input
                        type="radio"
                        name="options"
                        onChange={(e) => this.onChange(e, OPTION2)}/>
                    <span className="checkmark"/>
                </label>
                <input type="submit" className='btn' value='Submit'/>
            </form>
        )
    }
}

function mapStateToProps({questions}, {qid}){
    return{
        question: questions[qid]
    }
}
export default connect(mapStateToProps)(Choices)