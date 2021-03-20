import React from 'react'
import {connect} from 'react-redux'

const LeaderBoard = (props) => {
    const {sortedUsers, records, users} = props
    return(
        <div className='container'>
            {sortedUsers.map((id) => (
                <div className='board' key={id}>
                    <img
                        src={users[id].avatarURL}
                        alt={`Avatar of ${users[id].name}`}
                        className='avatar'
                    />
                    <div className='record'>
                        <h2 style={{color: 'green'}}>{users[id].name}</h2>
                        <h3>Answered Questions: <span style={{color: 'blue'}}>{records[id].questions}</span></h3>
                        <h3>Asked Questions: <span style={{color: 'blue'}}>{records[id].answers}</span></h3>
                        <h2 style={{color: 'red'}}>Score: <span style={{color: 'blue'}}>{records[id].total}</span></h2>
                    </div>
                </div>
                ))}
        </div>
    )
}

function mapStateToProps({users}){
    let records = {}
    for(let id of Object.keys(users)){
        const questions = users[id].questions.length
        const answers = Object.keys(users[id].answers).length

        records[id] = {
            questions,
            answers,
            total: questions+answers
        }
    }
    console.log(records)
    return{
        users,
        records,
        sortedUsers: Object.keys(records).sort((a, b) => records[b].total - records[a].total)
    }
}

export default connect(mapStateToProps)(LeaderBoard)