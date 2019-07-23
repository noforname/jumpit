import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import CalendarStrip from 'react-native-calendar-strip';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import { fetchExercises } from '../redux/actions';
import PlanItemComponent from '../components/PlanItemComponent';

class PlanPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
    this.handleDateSelected = this.handleDateSelected.bind(this);
  }

  componentDidMount() {
    AsyncStorage.getItem('token').then(token => {
      this.props.fetchExercises(this.state.date, token);
    });
  }

  handleDateSelected(date) {
    const newDate = date.toDate();
    this.setState({date: newDate})
    AsyncStorage.getItem('token').then(token => {
      this.props.fetchExercises(newDate, token);
    })
  }

  render() {
    const items = this.props.exercisesPlan.data.map((item, i) => {
      return <PlanItemComponent key={i} name={item.name} value={item.value} />;
    });
    return (
      <Container>
        <Content>
          <CalendarStrip
            calendarAnimation={{type: 'sequence', duration: 30}}
            daySelectionAnimation={{type: 'background', duration: 200, highlightColor: '#febc42'}}
            style={{height: 100, paddingTop: 10, paddingBottom: 10}}
            calendarHeaderStyle={{color: 'black'}}
            calendarColor={'#fea742'}
            dateNumberStyle={{color: 'black'}}
            dateNameStyle={{color: 'black'}}
            highlightDateNumberStyle={{color: 'black'}}
            highlightDateNameStyle={{color: 'black'}}
            disabledDateNameStyle={{color: 'grey'}}
            disabledDateNumberStyle={{color: 'grey'}}
            iconContainer={{flex: 0.1}}
            onDateSelected={this.handleDateSelected}
          />
          { items }
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  exercisesPlan: state.exercisesPlan
});
const mapDispatchToProps = { fetchExercises };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlanPage);
