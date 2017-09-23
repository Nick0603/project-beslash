import React from 'react';
import ReactDOM from 'react-dom';


const {
  MasterVision,
  LatestNews,
  LatestEvent
} = window.App;

class Main extends React.Component {
  constructor(props, context) {
    super(props, context);
    
  }

  render() {
    return (
      <section id="main">
        <MasterVision />
        <LatestNews />
        <LatestEvent />
      </section>
    )
  }
};

window.App.Main = Main