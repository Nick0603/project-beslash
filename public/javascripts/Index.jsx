import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router
} from 'react-router-dom';

const {
  Header,
  Main,
  Footer,
  Login
} = window.App;

class Index extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      hasVerified: false,
      loginsStatus: this.props.loginsStatus,
      index: 0
    };
  }

  render() {
    return (
      <div id="index">
        <Header />
        <Main />
        <Footer />
      </div>
    )
  }
};

Index.defaultProps = {
  loginsStatus: 'no login'
};

Index.propTypes = {
  loginsStatus: PropTypes.oneOf(['login', 'no login', 'login failure'])
};

ReactDOM.render((
  <Router>
    <Index />
  </Router>
), document.getElementById('wrapper'))