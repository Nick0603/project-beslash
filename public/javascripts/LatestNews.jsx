import React from 'react';
import ReactDOM from 'react-dom';

class NewsTag extends React.Component {
	constructor(props, context) {
    	super(props, context);
	}

	render() {
		return (
			<div className="newsTag">
				<div className="trapezoid-left inline-block">
					<div className="photo"></div>
				</div>
				<div className="trapezoid-right inline-block">
					<div className="intro">
						<div className="name">OOO</div>
						<div className="topic">topic</div>
						<div className="content">.......<br />.......</div>
					</div>
				</div>
			</div>
		)
	}	
}

class LatestNews extends React.Component {
	constructor(props, context) {
    	super(props, context);
	}

	render() {
		return (
			<div id="latestNews">
				<NewsTag />
				<NewsTag />
				<NewsTag />
			</div>
		)
	}
}

window.App.LatestNews = LatestNews;