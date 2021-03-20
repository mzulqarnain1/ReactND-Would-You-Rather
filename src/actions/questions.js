
import {saveQuestionAnswer, saveQuestion} from '../utils/api'
import {NotificationManager} from "react-notifications";

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveQuestions(questions){
    return{
        type: RECEIVE_QUESTIONS,
        questions
    }
}

export function saveAnswer({authedUser, qid, answer}){
    return{
        type: ANSWER_QUESTION,
        authedUser,
        qid,
        answer
    }
}

export function addQuestion(question){
    return{
        type: ADD_QUESTION,
        question
    }
}

export function handleSaveQuestion(question){
    return (dispatch) => {
        return saveQuestion(question)
            .then((res) => {
                dispatch(addQuestion(res))
                NotificationManager.success('Question Added', 'Added', 1000)
            })
    }
}

export function handleSaveQuestionAnswer(info){
    return (dispatch) => {
        return saveQuestionAnswer(info)
            .then((res) => {
                dispatch(saveAnswer(info))
                NotificationManager.success('Answer Saved', 'Answered', 1000)
            })
    }
}
