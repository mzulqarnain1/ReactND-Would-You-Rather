
import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'

function Navbar(props) {
    const {user} = props
    return (
        <nav className='nav'>
            <ul>
                <li>
                    <NavLink to='/' exact activeClassName='active'>
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/add' activeClassName='active'>
                        New Question
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/leaderboard' activeClassName='active'>
                        Leader Board
                    </NavLink>
                </li>
                {user !== null &&
                <li className='right'><span>Welcome <strong style={{color: 'green'}}>{user.name}</strong></span></li>}
                {user !== null &&
                    <li>
                        <NavLink to='/logout' exact activeClassName='active'>
                            Logout
                        </NavLink>
                    </li>
                }
            </ul>
        </nav>
    )
}

function mapStateToProps({authedUser, users}){
    return{
        user: authedUser ? users[authedUser] : null
    }
}

export default connect(mapStateToProps)(Navbar)