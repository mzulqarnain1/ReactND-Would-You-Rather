import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from "react-router-dom";
import Profile from "./Profile";
import {NotificationManager} from 'react-notifications'
import {setAuthedUser} from '../../actions/authedUser'

class Login extends React.Component {
    state = {
        selectedProfile: null,
        redirectToReferrer: false
    }
    onProfileSelect = (id) => {
        this.setState({
            'selectedProfile': id
        });
    }
    handleLogin = e => {
        e.preventDefault()
        if(this.state.selectedProfile === null){
            NotificationManager.error('No Profile Selected', 'Login Error', 1000)
        }
        else{
            const {dispatch} = this.props
            dispatch(setAuthedUser(this.state.selectedProfile))
            this.setState({
                'redirectToReferrer': true
            });
        }
    }
    render() {
        const { selectedProfile, redirectToReferrer } = this.state
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        if (redirectToReferrer === true) {
            return <Redirect to={from} />
        }

        const { userIds } = this.props
        return (
            <form onSubmit={this.handleLogin}>
                <h1 className='center'> Would You Rather Login </h1>
                <h3 className='center'>Please Select Your Profile</h3>
                <div className='container'>
                    {}
                    {
                        userIds.map((id) => (
                            <Profile key={id} id={id} selected={selectedProfile === id} onSelect={this.onProfileSelect}/>
                        ))
                    }
                    <button className='btn'>Login</button>
                </div>
            </form>
        )
    }
}

const mapStateToProps = ({authedUser, users}) => {
    return {
        userIds: Object.keys(users),
        authedUser
    }
}
export default connect(mapStateToProps)(Login)