import React, { Component } from 'react';

import Layout from './components/Layout/Layout';
import DashBoardBuilder from './containers/DashBoard/DashBoardBuilder';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <DashBoardBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;
