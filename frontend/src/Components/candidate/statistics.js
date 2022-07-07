import React, { Component } from 'react';
import Box from './box.js';
import { Line } from 'react-chartjs-2';
import Footer from '../footer/footer.js';
const state = {
  labels: ['', 'January', 'February', 'March', 'April', 'May', 'July'],
  datasets: [
    {
      label: 'statistics',
      fill: false,
      lineTension: 0.5,
      backgroundColor: 'rgba(255, 255, 255)',
      borderColor: 'rgba(280,80,80)',
      borderWidth: 2,
      data: [0, 14, 13, 7, 12, 13, 9, 10],
    },
  ],
};

class Statistics extends Component {
  constructor(props) {
    super(props);
  }
  gotoProfile() {
    this.props.history.push('/profile');
  }
  gotoCandidature() {
    this.props.history.push('/candidature');
  }
  gotoResume() {
    this.props.history.push('/resume');
  }
  gotoFavouriteJobs() {
    this.props.history.push('/favouritejobs');
  }
  gotoAppliedJobs() {
    this.props.history.push('/appliedjobs');
  }
  gotoMailbox() {
    this.props.history.push('/mailbox');
  }
  gotoStatistics() {
    this.props.history.push('/statistics');
  }
  render() {
    return (
      <>
        <div className="row row-top">
          <div className="col-sm-11">
            <h5 className="candidate_heading favouritejobsheading-2">
              Statistics
            </h5>
            <div className="statistics-main-div">
              <p className="p-0 statistics-profile-view">PROFILE VIEWS</p>
              <Line
                data={state}
                options={{
                  title: { display: true, text: '', fontSize: 20 },
                  legend: { display: true, position: 'right' },
                }}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Statistics;
