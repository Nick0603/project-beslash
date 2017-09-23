import React from 'react';
import ReactDOM from 'react-dom';

class EventTag extends React.Component {
	constructor(props, context) {
    	super(props, context);
	}

	render() {
		return (
			<div className="eventTag">
				<div className="image"></div>
				<div className="context">....</div>
			</div>
		)
	}
};

class LatestEvent extends React.Component {
	constructor(props, context) {
    	super(props, context);
	}

	render() {
		return (
			<div id="latestEvent">
				<EventTag />
				<EventTag />
				<EventTag />
			</div>
		)
	}
}

window.App.LatestEvent = LatestEvent;