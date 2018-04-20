import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import LoginContainer from './LoginContainer';
import WeightContainer from './WeightContainer';
import UserContainer from './UserContainer';
import './app.css';
import { dateStamp } from '../helpers';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      records: [],
      recordsLoaded: false,
      newMeasurement: '',
      metric: true,
    };
    this.handleSaveRecord = this.handleSaveRecord.bind(this);
  }

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

  handleSaveRecord = (waist, date = dateStamp(), oldDate) => {
    // Save new record or overwrite old record if dates match
    firebase
      .database()
      .ref(`waist/${this.state.user.uid}/${date}`)
      .set({ cm: waist });
    // Dates don't match; delete old record
    if (oldDate && date != oldDate) {
      firebase
        .database()
        .ref(`waist/${this.state.user.uid}/${oldDate}`)
        .remove();
    }
  };

  componentDidMount() {
    // Check if user is logged in
    console.log('Mounted!');
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
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
              handleSaveRecord={this.handleSaveRecord}
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
