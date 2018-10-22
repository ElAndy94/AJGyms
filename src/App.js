import React, { Component } from 'react';

import Layout from './components/Layout/Layout';
import PortalBuilder from './containers/PortalBuilder/PortalBuilder';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <PortalBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;
