import React from 'react'
import {setAuthedUser} from '../../actions/authedUser'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {NotificationManager} from 'react-notifications'

class Logout extends React.Component{
    componentDidMount() {
        const {dispatch} = this.props
        dispatch(setAuthedUser(null))
        NotificationManager.success('Logged Out Successfully', 'Logged Out', 1000)
    }

    render() {
        return <Redirect to='/login'/>
    }
}

export default connect()(Logout)