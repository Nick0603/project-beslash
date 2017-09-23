import React from 'react';
import ReactDOM from 'react-dom';

class Footer extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<section id="footer">
				<div className='copyright'>著作權 ©2016 Jyun-Han. 版權所有</div>
			</section>
		)
	}
};

window.App.Footer = Footer