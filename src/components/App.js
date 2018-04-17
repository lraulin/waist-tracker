import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import LoginContainer from './LoginContainer';
import WeightContainer from './WeightContainer';
import UserContainer from './UserContainer';
import './app.css';
import { dateStamp } from '../datestamp';

class App extends Component {
  state = {
    user: null,
    records: [],
    recordsLoaded: false,
    newMeasurement: '',
  };

  handleSubmitMessage = (waist) => {
    const date = dateStamp();
    console.log(this.state.user.uid);
    console.log(date);
    console.log(waist);
    firebase
      .database()
      .ref(`waist/${this.state.user.uid}/${date}`)
      .set({ cm: waist });
    this.setState({ showAdd: false });
  };

  onRecord = (snapshot) => {
    const records = Object.keys(snapshot.val()).map((key) => {
      const rec = snapshot.val()[key];
      rec.id = key;
      return rec;
    });
    this.setState({ records });
    console.log(this.state.records);
  };

  componentDidMount() {
    // Check in user is logged in
    console.log('Mounted!');
    firebase.auth().onAuthStateChanged((user) => {
      console.log('Auth state changed. user: ' + user.uid);
      if (user) {
        this.setState({ user });
      } else {
        this.props.history.push('/login');
      }
      // Get records
      firebase
        .database()
        .ref(`waist/${this.state.user.uid}`)
        .on('value', (snapshot) => {
          this.onRecord(snapshot);
          if (!this.state.recordsLoaded) {
            this.setState({ recordsLoaded: true });
          }
        });
    });
  }

  render() {
    return (
      <div id="container">
        <Route path="/login" component={LoginContainer} />
        <Route
          exact
          path="/"
          render={() => (
            <WeightContainer
              onSubmit={this.handleSubmitMessage}
              userID={this.state.user}
              records={this.state.records}
            />
          )}
        />
        <Route
          path="/users/:id"
          render={({ history, match }) => (
            <UserContainer
              messagesLoaded={this.state.messagesLoaded}
              userID={match.params.id}
            />
          )}
        />
      </div>
    );
  }
}

export default withRouter(App);
