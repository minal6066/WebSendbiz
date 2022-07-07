import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import APIManager from '../../../APIManager/index';
import { connect } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import './stats.scss';
// const state = {
//   labels: ['', 'January', 'February', 'March', 'April', 'May', 'July'],
//   datasets: [
//     {
//       label: 'statistics',
//       fill: false,
//       lineTension: 0.5,
//       backgroundColor: '#ffffff',
//       borderColor: 'rgba(280,80,80)',
//       borderWidth: 2,
//       data: [0, 14, 13, 7, 12, 13, 9, 10],
//     },
//   ],
// };
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timePeriod: '2',
      testmonth: [],
    };
  }
  componentDidMount() {
    APIManager.getStaticsData();
  }
  handletimePeriod = (e) => {
    this.setState({
      timePeriod: e.target.value,
    });
    console.log(this.state.timePeriod);
  };
  render() {
    const test = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const data =
      this.props.stats_data &&
      this.props.stats_data.data.map((data) => data.viewCount);
    const months =
      this.props.stats_data &&
      this.props.stats_data.data.map((data) => data._id);
    if (months !== null) {
      test.length = months.length;
      for (var i = 0; i < months.length; i++) {
        var d = months[i];
        var e = data[i];
        test[d] = e;
      }
    }
    for (var j = 0; j < test.length; j++) {}
    console.log(test);
    //const keys=["1","2","3","4","5","6","7","8","9","10","11","12"];
    const month = [
      '',
      'jan',
      'feb',
      'mar',
      'april',
      'may',
      'june',
      'july',
      'aug',
      'sep',
      'oct',
      'nov',
      'dec',
    ];
    // const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    // const Obj = [];
    // for (var i = 0; i < keys.length; i++) {
    //   Obj[keys[i]] = month[i];
    // }
    // console.log(Obj, 'lll');

    if (this.state.timePeriod === '1') {
      month.splice(6, 12);
    }
    const state = {
      labels: month,
      datasets: [
        {
          label: '',
          fill: false,
          lineTension: 0.5,
          backgroundColor: '#ffffff',
          borderColor: 'rgba(280,80,80)',
          borderWidth: 3,
          data: test,
        },
      ],
    };

    return (
      <div className={'stats-container'}>
        <p>
          <span className={'stats-label'}> STATS FOR</span>
        </p>
        <div className={'time-period-container w-100'}>
          <div></div>
          <div>
            <select
              name="experience"
              className="input-field-custom-type-1-left"
              className={'time-period-select'}
            >
              <option value="" label={'Profile views'} />
            </select>
          </div>
          {/* <div>
            <select
              name="experience"
              className="input-field-custom-type-1-left"
              onChange={this.handletimePeriod}
              // value={values.experience}
              value={this.state.timePeriod}
              className={'time-period-select'}
            >
              <option value="1" label={'6 months'} />
              <option value="2" label={'1 year'} />
            </select>
          </div> */}
        </div>

        <Line
          data={state}
          options={{
            title: {
              display: true,
              fontSize: 20,
              backgroundColor: '#EE5050',
            },
            legend: { display: false, position: 'right' },
            tooltips: {
              display: true,
              backgroundColor: '#EE5050',
            },
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stats_data: state.statsReducer.stats_data,
  };
};
export default connect(mapStateToProps)(index);
