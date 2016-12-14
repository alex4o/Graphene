import React from "react"
import ReactDOM from "react-dom"

import ReactBootstrapSlider from 'react-bootstrap-slider';
import {Grid, Row, Col, Panel, Input, Button, Alert, Modal, Radio, FormGroup, Checkbox} from "react-bootstrap"



require("bootstrap-slider/dist/css/bootstrap-slider.min.css")


function center(sprite) {
	sprite.anchor.set(.5, .5)
}


export default class VideoScene {
	constructor(story, stage){
		this.stage = stage
		this.story = story
		this.increment = 0.05
		this.index = -1
		this.animtoggle = true

		//this.Skip.onClick = () => story.next()

		PIXI.loader.add("title", './img/title.png')

	}

	floatanimation(speed, w, h) {


		if(this.animtoggle)
		{
			this.Graphene.position.y += speed

			if(this.Graphene.position.y >  (this.h / 2) + 25 + 100)
			{
				this.animtoggle = false
			}
		} 
		else if (!this.animtoggle)
		{
			this.Graphene.position.y -= speed
			if (this.Graphene.position.y < (this.h / 2) - 25 + 100)
			{
				this.animtoggle = true
			}						
		}
	}

	position(width, height, center ){
		let off = height*(3/6)
		let rem = height - off
		let padding = rem/(this.texts.length + 1)
		let cur = padding
		for(let i = 0; i < this.texts.length; i++){
			let text = this.texts[i]
			text.x = width*(1/4)
			text.y = cur - 50 + (off / 2) + 100
			
			cur += text.height + padding
		}


		this.Graphene.position.x = width*(3/4)
		this.Graphene.position.y = center.y + 100

		this.Title.position.x = center.x
		this.Title.position.y = height * 1/5

		this.w = width
		this.h = height


	}

	destructor(){
		// this.Skip.remove()

		// this.Skip.onMouseEnter = null
		// this.Skip.onMouseLeave = null
		// this.Skip.onClick = null
	}

	update(){
		this.floatanimation(0.1)

		if(this.index < 0){
			this.texts.forEach((text,index) => {
				if(this.index == index){
					return
				}

				if(text.scale.x > 1) {
					text.scale.x -= this.increment
					text.scale.y -= this.increment
				}
			})
			return
		}

		if(this.texts[this.index].scale.x < 1.2){
			this.texts[this.index].scale.x += this.increment 
			this.texts[this.index].scale.y += this.increment
		}


	}

	assetsLoaded(resources){

		this.htmlUI =  document.getElementById("htmlUI")

		this.texts = []
		this.Graphene =  new PIXI.Sprite(resources['graphene'].texture)

		this.Title = new PIXI.Sprite(resources['title'].texture)
this.Title.scale.set(0.2,0.2)
		center(this.Graphene)
		center(this.Title)

		this.Graphene.scale.set(-0.8,0.8)

		this.texts.push(new PIXI.Text("Начало",
			{

				fill: "white",
				fontFamily: "Verdana",
				fontWeight: "bold",
				fontSize: 30
			})
		)

		this.texts.push(new PIXI.Text("Настройки",
			{

				fill: "white",
				fontFamily: "Verdana",
				fontWeight: "bold",
				fontSize: 30
			})		
		)

		this.texts.push(new PIXI.Text("За проекта",
			{

				fill: "white",
				fontFamily: "Verdana",
				fontWeight: "bold",
				fontSize: 30
			})
		)


		this.texts.push(new PIXI.Text("Изход",
			{

				fill: "white",
				fontFamily: "Verdana",
				fontWeight: "bold",
				fontSize: 30
			})
		)

		this.texts[0].click = () => {
			this.story.next()
		}

		this.texts[1].click = () => {
			this.htmlUI.style.display = "block"
			ReactDOM.render(<App/>, this.htmlUI)
		}

		this.texts[2].click = () => {
			window.location = window.location.pathname.replace("game","index")
		}

		this.texts[3].click = () => {
			if(window.require){
				var remote = window.require('electron').remote
				var bw = remote.getCurrentWindow()
				bw.close()
			}
		}

		this.texts.forEach((text, index) => {
			text.interactive = true
			center(text)

			text.on('mouseover', () => {
				//text.scale.set(1.2,1.2)
				this.index = index

			})

			// set the mouseout callback...
			text.on('mouseout', () => {
				// text.scale.set(1,1)
				this.index = -1
			})

			this.stage.addChild(text)

		})

		this.stage.addChild(this.Graphene)
		this.stage.addChild(this.Title)
		// this.stage.addChild(this.button)
	}
}

class App extends React.Component
{
	constructor(props){
		
		super(props)
		this.state = {
			volume: volume.get(),
			autoplay: autoplay.get()
		}


	}

	componentDidMount() {

		volume.onValue(x => {
			this.setState({volume: x})
		})

		autoplay.onValue(x => {
			this.setState({autoplay: x})
		})

		console.log(this.checkbox)
	}

	changeVolume(event){
		console.log(event.target.value)
		volume.modify(() => {
			return event.target.value
		})
		// localStorage.getItem("volume")
	}

	changeAutoplay(event){
		// event.persist()
		// console.log(event)
		// console.log(event.target)

		autoplay.modify((v) => {
			return !v
		})
	}

	close() {
		document.getElementById("htmlUI").style.display = "none"
		ReactDOM.unmountComponentAtNode(document.getElementById("htmlUI")) 
	}

	render(){
		return(
			<Grid>
				<h1>Настройки</h1>
				<Row>
				<h2>Сила на звука</h2>
					 <ReactBootstrapSlider
						value={this.state.volume}
						change={this.changeVolume}
						// slideStop={this.changeValue}
						step={0.01}
						max={1}
						min={0}
						orientation="horizontal"
						reverse={false}/>
				<Row> 
					Можете да променяте звука на играта чрез скролване на мишката по време на игра, или от променяне на слайдера от горе.
				</Row>
				</Row>
				<Row>
					<Checkbox {...this.state.autoplay ? {checked: true} : {}} inputRef={el => {this.checkbox = el}} onChange={this.changeAutoplay.bind(this)}>
						<p>Автоматично продължаване</p>
					</Checkbox>
					<Row>
					Тази опция пуска автоматичното вървене на диалога между Графен и Карбон.(По подразбиране е изключено)
					Можете да контролирате това по време на игра в долния ляв ъгъл.					
					</Row>
				</Row>				
				<Row style={{marginTop: "20px"}}>
					<Button onClick={this.close.bind(this)}>Затвори</Button> 
				</Row>
			</Grid>
			)
	}
}
