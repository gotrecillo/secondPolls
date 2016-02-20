import React from 'react';
import { Route, Redirect, IndexRoute } from 'react-router';
import App from './containers/App';
import PollListContainer from './containers/PollListContainer';
import PollDetailsContainer from './containers/PollDetailsContainer';
import NotificationsDetailContainer from './containers/NotificationsDetailContainer';
import SelectPollContainer from './containers/SelectPollContainer';
import PollVoteContainer from './containers/PollVoteContainer';
import SignInContainer from './containers/SignInContainer';
import RegisterContainer from './containers/RegisterContainer';
import LogInContainer from './containers/LogInContainer';

export default () => (
  <Route path="/" component={App}>
    <Route path="poll" component={PollListContainer} />
    <Route path="poll/:idPoll" component={PollDetailsContainer} />
    <Route path="notifications" component={NotificationsDetailContainer} />
    <Route path="vote" component={SelectPollContainer} />
    <Route path="vote/:idPoll" component={PollVoteContainer} />
    <Route path="sign-in" component={SignInContainer} />
    <Route path="log-up" component={RegisterContainer} />
    <Route path="log-in" component={LogInContainer} />
    <IndexRoute component={SelectPollContainer}/>
    <Redirect path="*" to="/vote" />
  </Route>
);
