import React from 'react';
import ReactDOM from 'react-dom';

/*class General extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.typingAccount = this.typingAccount.bind(this);
		this.typingPassword = this.typingPassword.bind(this);
		this.state = {
			account: 'admin@loveboardgame.com.tw',
			password: '0000'
		};
	}

	typingAccount(e) {
		this.setState({ account: e.target.value });
	}

	typingPassword(e) {
		this.setState({ password: e.target.value });
	}

	render() {
		return (
			<form acceptCharset='UTF8' action='/rest/login' method='POST' >
				<div>
					<label htmlFor='account'>Account</label>
					<input name='account' id='account' value={this.state.account} onChange={this.typingAccount} />
				</div>
				<div>
					<label htmlFor='password'>Password</label>
					<input name='password' id='password' type='password' value={this.state.password} onChange={this.typingPassword} />
				</div>
				<input type='submit' value='登入'/>
				<div className='register'>還沒加入我們嗎？<a href='#'>加入我們</a></div>
			</form>
		)
	}
}*/

class Login extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	facebookLogin(e) {
		$.ajax({
			method: 'GET',
			url: '/rest/getFacebookAppID'
		})
		.then( xhr => {
			location.href = 'https://www.facebook.com/v2.10/dialog/oauth?client_id=' + xhr + '&redirect_uri=http://localhost:8080/'
		});
	}

	render() {
		return (
			<div id="login">
				<div onClick={ this.facebookLogin }>登入</div>
			</div>
		)
		/*return (
			<div id="login">
				<General />
				<div onClick={ this.facebookLogin }>使用facebook登入</div>
			</div>
		)*/
	}
};

window.App.Login = Login;