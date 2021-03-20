import React, {Component, Fragment} from "react";
import {handleInitialData} from "../actions/shared";
import {connect} from "react-redux";
import LoadingBar from "react-redux-loading";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {NotificationContainer} from 'react-notifications'
import 'react-notifications/lib/notifications.css';

import Login from "./authentication/Login";
import Logout from "./authentication/Logout";
import Dashboard from "./common/Dashboard";
import LeaderBoard from "./common/LeaderBoard";
import NewQuestion from "./questions/NewQuestion";
import PrivateRoute from "./routes/PrivateRoute";
import QuestionPoll from "./questions/QuestionPoll";
import {PageNotFound, QuestionNotFound} from "./404/NotFound";
import Navbar from './common/Navbar'

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
        return (
            <Router>
                <Fragment>
                    <LoadingBar/>
                    <div className='container'>
                        <Navbar/>
                        <Switch>
                            <PrivateRoute path='/' exact component={Dashboard}/>
                            <Route path='/login' component={Login}/>
                            <PrivateRoute path='/logout' component={Logout}/>
                            <PrivateRoute path='/leaderboard' component={LeaderBoard}/>
                            <PrivateRoute path='/question/:question_id' component={QuestionPoll}/>
                            <PrivateRoute path='/add' component={NewQuestion}/>
                            <Route path='/invalid' component={QuestionNotFound} />
                            <Route component={PageNotFound} />
                        </Switch>
                        <NotificationContainer/>
                    </div>
                </Fragment>
            </Router>
        )
    }
}

export default connect()(App);
