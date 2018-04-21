import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Header from './Header';
import { cmToIn, inToCm, adonisIndex, venusIndex } from '../helpers';

const btnUnit = {
  float: 'right',
  marginTop: '5px',
};

const btnSpacer = {
  ...btnUnit,
  marginRight: '4em',
};

class UserContainer extends Component {
  state = {
    height: '',
    idealWaist: '',
    idealShoulders: '',
    heightEntered: false,
    metric: true,
    idealHips: '',
    age: '',
    sex: '',
    userId: '',
  };

  cmOrIn = (length) => {
    if (this.state.metric) {
      return length + ' cm';
    } else {
      return cmToIn(length) + ' in';
    }
  };

  handleSubmit = () => {
    const height = this.state.metric
      ? this.state.height
      : inToCm(this.state.height);
    const userId = firebase.auth().currentUser.uid;
    if (this.state.age && this.state.height && this.state.sex) {
      firebase
        .database()
        .ref(`settings/${userId}`)
        .set({ height, age: this.state.age, sex: this.state.sex });
    }
    let idealShoulders, idealWaist, idealHips;
    if (this.state.sex == 'male') {
      ({ idealShoulders, idealWaist } = adonisIndex(this.state.height));
    }
    if (this.state.sex == 'female') {
      ({ idealHips, idealShoulders, idealWaist } = venusIndex(
        this.state.height,
      ));
    }
    this.setState({
      idealShoulders,
      idealWaist,
      idealHips,
      heightEntered: true,
    });
  };

  handleInput = (e) => {
    this.setState({ height: e.target.value });
  };

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.handleSubmit();
    }
  };

  handleClickCm = () => {
    this.setState({ metric: true });
  };

  handleClickIn = () => {
    this.setState({ metric: false });
  };

  handleSexChange = (e) => {
    this.setState({ sex: e.target.value });
  };

  handleAgeChange = (e) => {
    this.setState({ age: e.target.value });
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log('authstatechanged');
      if (user) {
        console.log('user logged in');
        this.setState({ userId: user.uid });
        firebase
          .database()
          .ref(`settings/${user.uid}`)
          .once('value', (snapshot) => {
            const settings = snapshot.val();
            const { height, age, sex } = settings;
            let idealShoulders, idealWaist, idealHips;
            if (sex == 'male') {
              ({ idealShoulders, idealWaist } = adonisIndex(height));
              this.setState({ idealShoulders, idealWaist });
            }
            if (sex == 'female') {
              ({ idealShoulders, idealHips, idealWaist } = venusIndex(height));
              this.setState({ idealShoulders, idealHips, idealWaist });
            }
            this.setState({ height, age, sex, heightEntered: true });
          });
      } else {
        console.log('no user');
        this.props.history.push('/login');
      }
    });
  }

  render() {
    return (
      <div id="UserContainer" className="inner-container">
        {/* HEADER */}
        <button
          className={
            this.state.metric ? (
              'btn btn-primary btn-sm active'
            ) : (
              'btn btn-secondary btn-sm'
            )
          }
          aria-pressed={this.state.metric}
          onClick={this.handleClickCm}
          style={btnSpacer}
        >
          cm
        </button>
        <button
          className={
            !this.state.metric ? (
              'btn btn-primary btn-sm active'
            ) : (
              'btn btn-secondary btn-sm'
            )
          }
          aria-pressed={!this.state.metric}
          onClick={this.handleClickIn}
          style={btnUnit}
        >
          in
        </button>
        <Link to="/">
          <button className="red">Back To Records</button>
        </Link>
        <h1>User</h1>
        {/* ***** */}
        {/* BODY  */}
        {/* ***** */}
        {!this.state.heightEntered ? (
          <div id="enterUserInfo">
            <p>Enter your height in {this.state.metric ? 'cm' : 'inches'}.</p>
            <input
              type="number"
              onInput={this.handleInput}
              onKeyDown={this.handleKeyDown}
            />
            <p>Age</p>
            <input id="ageInput" type="number" onInput={this.handleAgeChange} />
            <p>Sex</p>
            <form>
              <label htmlFor="sexMale">
                <input
                  id="sexMale"
                  type="radio"
                  name="sex"
                  value="male"
                  checked={this.state.sex === 'male'}
                  onChange={this.handleSexChange}
                />
                Male
              </label>

              <label htmlFor="sexFemale">
                <input
                  id="sexFemale"
                  type="radio"
                  name="sex"
                  value="female"
                  checked={this.state.sex === 'female'}
                  onChange={this.handleSexChange}
                />
                Female
              </label>
            </form>
            <button className="btn btn-primary" onClick={this.handleSubmit}>
              Sumbit
            </button>
          </div>
        ) : (
          <div id="userData">
            <p>Age: {this.state.age}</p>
            <p>Sex: {this.state.sex}</p>
            <p>Height: {this.cmOrIn(this.state.height)}</p>
            <p>Target Waist: {this.cmOrIn(this.state.idealWaist)}</p>
            <p>Target Shoulders: {this.cmOrIn(this.state.idealShoulders)}</p>
            {this.sex == 'female' ? (
              <p>Target Hips: {this.cmOrIn(this.state.idealShoulders)}</p>
            ) : null}
          </div>
        )}
        <br />
        <section id="explaination" style={{ fontSize: 11 }}>
          <p style={{ margin: '1em' }}>
            The idea here is to have a goal to aim for that is aesthetically
            appealing, healthy, and acheivable. (But not easily!) Even if we
            never achieve the ideal, it is useful to have a target to be moving
            towards. For the rare few who are over-achievers, these targets can
            be an indication of when enough is enough.
          </p>
          <p style={{ margin: '1em' }}>
            A waist-hip ratio of 0.7 in women been{' '}
            <a href="https://www.sciencedirect.com/science/article/pii/S1090513802001216">
              scientifically
            </a>{' '}
            <a href="https://www.psychologytoday.com/us/blog/beastly-behavior/201706/the-relationship-between-waist-hip-ratio-and-fertility">
              established
            </a>{' '}
            as being universally appealing to men, regardless of cultural
            preferences for thinness or thickness. The measurements here are not
            guaranteed to be universally ideal, but are those of an attractive
            women who would be described as healthy, athletic and toned.
          </p>
          <p style={{ margin: '1em' }}>
            The male proportions describe the classic V-shape, based on the{' '}
            <a href="https://en.wikipedia.org/wiki/Golden_ratio">
              Golden Ratio
            </a>.
          </p>
          <p style={{ margin: '1em' }}>
            For more, see{' '}
            <a href="http://www.adonisgoldenratio.com/">Adonis Index</a> for
            men, and <a href="http://www.venusfactor.com/">Venus Index</a> for
            women.
          </p>
        </section>
      </div>
    );
  }
}

export default withRouter(UserContainer);
