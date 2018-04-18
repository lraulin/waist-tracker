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

  // Listen and update on Firebase change
  fetchData = (userID) => {
    firebase.database().ref(`waist/${userID}`).on('value', (snapshot) => {
      const records = Object.keys(snapshot.val()).map((key) => {
        const record = snapshot.val()[key];
        record.date = key;
        return record;
      });
      this.setState({ records });
      if (!this.state.recordsLoaded) {
        this.setState({ recordsLoaded: true });
      }
    });
  };

  handleSubmitMessage = (waist, date) => {
    date = date || dateStamp();
    console.log(this.state.user.uid);
    console.log(date);
    console.log(waist);
    firebase
      .database()
      .ref(`waist/${this.state.user.uid}/${date}`)
      .set({ cm: waist });
    this.setState({ showAdd: false });
  };

  componentDidMount() {
    // Check if user is logged in
    console.log('Mounted!');
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('Auth state changed. user: ' + user.uid);
        this.setState({ user });
        this.fetchData(user.uid); // Initialize listener for db changes
      } else {
        this.props.history.push('/login');
      }
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
