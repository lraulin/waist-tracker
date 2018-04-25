import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import LoginContainer from './LoginContainer';
import RecordContainer from './RecordContainer';
import UserContainer from './UserContainer';
import NotificationResource from '../resources/NotificationResource';
import './app.css';
import { dateStamp } from '../helpers';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      userData: {},
      waistRecords: [],
      lastWaistRecord: '',
      shoulderRecords: [],
      lastShoulderRecord: '',
      newMeasurement: '',
      metric: true
    };
    this.handleSaveRecord = this.handleSaveRecord.bind(this);
  }

  getLastRecord = (records) => records[records.length - 1].cm;

  // Listen and update on Firebase change
  fetchData = (userID) => {
    firebase.database().ref(`users/${userID}`).on('value', (snapshot) => {
      const waistData = snapshot.child('measurements').child('waist').val();
      if (waistData) {
        const waistRecords = Object.keys(waistData).map((key) => {
          const record = waistData[key];
          record.date = key;
          return record;
        });
        this.setState({
          waistRecords,
          lastWaistRecord: this.getLastRecord(waistRecords)
        });
      }
      const shoulderData = snapshot
        .child('measurements')
        .child('shoulders')
        .val();
      if (shoulderData) {
        const shoulderRecords = Object.keys(shoulderData).map((key) => {
          const record = shoulderData[key];
          record.date = key;
          return record;
        });
        this.setState({
          shoulderRecords,
          lastShoulderRecord: this.getLastRecord(shoulderRecords)
        });
      }
      const userData = snapshot.child('settings').val();
      this.setState({ userData });
    });
  };

  handleSaveRecord = (
    whichRecord,
    measurement,
    date = dateStamp(),
    oldDate
  ) => {
    // Save new record or overwrite old record if dates match
    firebase
      .database()
      .ref(`users/${this.state.user.uid}/measurements/${whichRecord}/${date}`)
      .set({ cm: measurement });
    // Dates don't match; delete old record
    if (oldDate && date != oldDate) {
      firebase
        .database()
        .ref(`measurements/${whichRecord}/${this.state.user.uid}/${oldDate}`)
        .remove();
    }
  };

  sendTestMessage = () => {
    const data = {
      msg: 'Testing! You have received a notification!',
      user_id: this.state.user.uid,
      timestamp: Date.now()
    };
    firebase.database().ref('messages/').push(data);
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choice) => {
        console.log(choice);
      });
      this.deferredPrompt = null;
    }
  };

  listenForInstallBanner = () => {
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('beforeinstallprompt Event fired');
      e.preventDefault();
      this.deferredPrompt = e;
    });
  };

  componentDidMount() {
    // Push notifications
    this.notifications = new NotificationResource(
      firebase.messaging(),
      firebase.database()
    );
    // Check if user is logged in
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        this.fetchData(user.uid); // Initialize listener for db changes
        this.notifications.changeUser(user);
      } else {
        this.props.history.push('/login');
      }
    });
    this.listenForInstallBanner();
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
              sendTestMessage={this.sendTestMessage}
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
              userData={this.state.userData}
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
