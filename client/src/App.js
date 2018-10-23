import React, { Component } from 'react';

import Layout from './components/Layout/Layout';
import DashBoardBuilder from './containers/DashBoard/DashBoardBuilder';
import GymClasses from './containers/GymClasses/GymClasses';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <DashBoardBuilder />
          <GymClasses />
        </Layout>
      </div>
    );
  }
}

export default App;
