import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class LandingCover extends React.Component {
	render() {
		return (
			<div id="landingCover">
				<div className="slogan"><p>讓我們與您分享精彩的視野，</p>規劃更美好的未來</div>
			</div>
		)
	}
}

class MasterVision extends React.Component {
	constructor(props, context) {
    	super(props, context)

		this.imageSwitchfrequency = this.props.imageSwitchfrequency
	    this.imagePath = '../../images/'
	    this.changeImage = this.changeImage.bind(this)
	    this.imageFadeOut = this.imageFadeOut.bind(this)
	    this.imageFadeIn = this.imageFadeIn.bind(this)
	    this.textImg = null
	    this.state = {
	      carouselImageChangeTimes: 0,
	      style: {
	        backgroundImage: 'url(' + this.imagePath + this.props.carouselImages[0] + ')'
	      },
	      className: 'image'
	    }
	}

	componentWillUpdate() {
	}


	imageFadeOut() {
		this.setState({
			className: 'image fadeOut'
		})
	}

	imageFadeIn() {
		let timeCount = setInterval(
			async () => {
				let carouselImageChangeTimes = ++this.state.carouselImageChangeTimes,
				imageIndex = carouselImageChangeTimes % 5

				this.setState({
					carouselImageChangeTimes: carouselImageChangeTimes,
					style: {
						backgroundImage: 'url(' + this.imagePath + this.props.carouselImages[imageIndex] + ')'
					},
					className: 'image fadeIn'
				})

				clearInterval(timeCount)
			},
			1000
		)
	}

	changeImage() {
		setInterval(
			async () => {
				await this.imageFadeOut()
				await this.imageFadeIn()
			},
			this.imageSwitchfrequency
		)
	}

	componentDidMount() {
		this.changeImage()
	}

	componentDidUpdate() {
		// console.log('componentDidUpdate')
	}

	render() {
		return (
			<div id="masterVision">
				<div ref={(img) => { this.textImg = img }} className={ this.state.className } style={this.state.style}></div>
				<LandingCover />
			</div>
		)
	}

}

MasterVision.defaultProps = {
	imageSwitchfrequency: 8000,
	carouselImages: [
		'www.istockphoto.com:photo:double-checking-their-shipping-schedule-gm613535506-105911319.jpg',
		'new_628265890.jpg',
		'www.istockphoto.com:photo:getting-ready-for-your-special-day-gm614420082-106316797.jpg' ,
		'www.istockphoto.com:photo:microscope-gm478022512-67435915.jpg',
		'www.istockphoto.com:photo:multiracial-teacher-and-children-in-science-lab-gm642376246-116650755.jpg'
	]
}

window.App.MasterVision = MasterVision