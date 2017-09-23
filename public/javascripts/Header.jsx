import React from 'react';
import ReactDOM from 'react-dom';

const {
  Login
} = window.App;

class Member extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.showLoginItem = this.showLoginItem.bind(this);
		this.doLogin = this.doLogin.bind(this);
		this.state = {
			isLogin: false
		}
	}

	componentWillUpdate() {
	}

	showMemberCenterItem() {
		return (
			<div className="memberCenter cursor-pointer">關於我</div>
		)
	}

	doLogin() {
		this.setState({
			isLogin: true
		})
	}

	showLoginItem() {
		return (
			<Login />
		)
		/*return (
			<div className="text cursor-pointer" onClick={ this.doLogin } >會員登入</div>
		)*/
	}

	render() {
		return (
			<div className="member">
				{ this.state.isLogin ? this.showMemberCenterItem() : this.showLoginItem() }
			</div>
		)
	}
}

class Header extends React.Component {
	constructor(props, context) {
		super(props, context);


		this.baseScrollLimitationHeight = 300
		this.state = {
			headerOpacity: 1,
			display: null
		}
	}

	componentWillMount() {
		this.setState({
			headerOpacity: (this.baseScrollLimitationHeight - (window.scrollY)) / this.baseScrollLimitationHeight,
			display: ((this.baseScrollLimitationHeight - (window.scrollY)) / this.baseScrollLimitationHeight) <= 0.2 ? 'none' : 'flex' 
		})

		window.addEventListener('scroll', e => {
			this.setState({
				headerOpacity: Math.max((this.baseScrollLimitationHeight - (scrollY)) / this.baseScrollLimitationHeight, 0),
				display: ((this.state.headerOpacity <= 0.2) ? 'none' : 'flex')
			})
		})
	}

	componentDidUpdate() {
		console.log('componentDidUpdate');
	}

	render() {
		const style = {
			opacity: this.state.headerOpacity,
			display: this.state.display
		};

		return (
			<section id="header" style={style}>
				<div className="container">
					<div className="left">
						<div className="w-navpane-trigger hamburger cursor-pointer">
							<span></span>
						</div>
						<div className="logo cursor-pointer cursor-pointer"></div>
					</div>
					<div className="mid">
						<div className="library"><div className="text cursor-pointer">瀏覽藏書</div></div>
						<div className="event"><div className="text cursor-pointer">活動介紹</div></div>
						<div className="aboutUs"><div className="text cursor-pointer">關於我們</div></div>
						<Member />
					</div>
					<div className="right"></div>
				</div>
			</section>
		)
	}
};

window.App.Header = Header