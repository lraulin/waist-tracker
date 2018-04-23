import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import LoginContainer from './LoginContainer';
import RecordContainer from './RecordContainer';
import UserContainer from './UserContainer';
import './app.css';
import { dateStamp } from '../helpers';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      waistRecords: [],
      lastWaistRecord: '',
      shoulderRecords: [],
      lastShoulderRecord: '',
      newMeasurement: '',
      metric: true,
    };
    this.handleSaveRecord = this.handleSaveRecord.bind(this);
  }

  getLastRecord = (records) => records[records.length - 1].cm;

  // Listen and update on Firebase change
  fetchData = (userID) => {
    firebase.database().ref(`waist/${userID}`).on('value', (snapshot) => {
      const waistRecords = Object.keys(snapshot.val()).map((key) => {
        const record = snapshot.val()[key];
        record.date = key;
        return record;
      });
      this.setState({
        waistRecords,
        lastWaistRecord: this.getLastRecord(waistRecords),
      });
    });

    firebase.database().ref(`shoulders/${userID}`).on('value', (snapshot) => {
      const shoulderRecords = Object.keys(snapshot.val()).map((key) => {
        const record = snapshot.val()[key];
        record.date = key;
        return record;
      });
      this.setState({
        shoulderRecords,
        lastShoulderRecord: this.getLastRecord(shoulderRecords),
      });
    });
  };

  handleSaveRecord = (
    whichRecord,
    measurement,
    date = dateStamp(),
    oldDate,
  ) => {
    // Save new record or overwrite old record if dates match
    firebase
      .database()
      .ref(`${whichRecord}/${this.state.user.uid}/${date}`)
      .set({ cm: measurement });
    // Dates don't match; delete old record
    if (oldDate && date != oldDate) {
      firebase
        .database()
        .ref(`${whichRecord}/${this.state.user.uid}/${oldDate}`)
        .remove();
    }
  };

  componentDidMount() {
    console.log('App Mounted');
    // Check if user is logged in
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
            <RecordContainer
              handleSaveRecord={this.handleSaveRecord}
              user={this.state.user}
              records={this.state.waistRecords}
              lastRecord={this.state.lastWaistRecord}
              whichMeasurement="waist"
            />
          )}
        />
        <Route
          exact
          path="/shoulders"
          render={() => (
            <RecordContainer
              handleSaveRecord={this.handleSaveRecord}
              user={this.state.user}
              records={this.state.shoulderRecords}
              lastRecord={this.state.lastShoulderRecord}
              whichMeasurement={'shoulders'}
            />
          )}
        />
        <Route
          path="/users/:id"
          render={({ history, match }) => (
            <UserContainer
              messagesLoaded={this.state.messagesLoaded}
              user={match.params.id}
              lastWaistRecord={this.state.lastWaistRecord}
              lastShoulderRecord={this.state.lastShoulderRecord}
            />
          )}
        />
      </div>
    );
  }
}

export default withRouter(App);
