
import React from 'react'
import ReactDOM from 'react-dom'

import _ from "lodash"

import {Grid, Row, Col, Panel, Input, Button, Alert, Modal} from "react-bootstrap"

//var math = require('mathjs'); // TODO: remove if unused

require("../css/test.css")

let questions = [
	{
		title: "",
		text: "На какво е разновидност графена?",
		answers: ["Въглерод", "Водород", "Натрий"],
		correct: 0
	},
	{
		title: "",
		text: "От колко атома е създаден молекулния строеж на графена?",
		answers: ["3", "5", "6"],
		correct: 2
	},
	{
		title: "",
		text: "Кога е открит?",
		answers: ["По някое време през 20 век.", "09.2004", "2015"],
		correct: 1
	},
	{
		title: "",
		text: "Кое свойство притежава графена?",
		answers: ["Слаба електропроводимост.", "Изолатор.", "Силна електропроводимост."],
		correct: 2
	},
	{
		title: "",
		text: "Графена по-здрав ли е от карбона?",
		answers: ["Да.", "Не."],
		correct: 0
	}
]

function TestMangler(questions, count){ // the function that randomizes the questions
	if(count > questions.length){
		throw "count can not be more then the length of questions"
	}
	

	let shuffled = _.shuffle(questions).slice(0, count)

	for(let i in shuffled){
		let answers = shuffled[i].answers.map(i => new Object({text: i, correct: false}))
		answers[shuffled[i].correct].correct = true
		let sha = _.shuffle(answers) // shuffled answers (sha)
		shuffled[i].answers = sha.map(e => e.text)
		shuffled[i].correct = sha.reduce((p, c, i) => c.correct ? i : p)
	}

	return shuffled

}

class Quetion extends React.Component
{
	renderAnswers(){
		let hc = this.handleChange.bind(this)
		return this.props.question.answers.map((e, i) => <Col xs={3} key={i}><Input type="radio" value={i} label={e} name={this.props.index} onChange={hc(this.props.index)} /></Col>)
	}


	handleChange(key){

		let set = (key, val) => {
			var state = {}
			state[key] = val
			this.setState(state, () => {
				this.props.onValue(this.state)
			})
		}

		return e => {
			set(key, e.target.value)
		}
	}

	render(){
		return(
		<Panel header={"Въпрос " + this.props.title}>
			{this.props.question.text}
			<Row>
				{this.renderAnswers()}
			</Row>
			
		</Panel>
		)	
	}
}

class App extends React.Component
{
	constructor(props){
		
		super(props)
		this.state = {
			result: 0,
			videoModal: false,
			questions: TestMangler(questions,4)
		}

	}

	renderQuestions(){
		return this.state.questions.map((e, i) => <Quetion key={i} index={i} question={e} title={(i + 1)} onValue={v => this.setState(v)} />)
	}

// problem with the sublime theme fix /

	checkAnswers(){
		
		let correct = 0
		for(let i in _.range(0, questions.length)){
			if(this.state[i] == null){
				this.setState({ result: 3 })
				return
			}
			if(this.state[i] == questions[i].correct){
				correct += 1
			}
		}
		var coef = correct/questions.length
		console.log(coef)
		if(coef < (1/4)){
			this.setState({ result: 1 })

		}else{
			this.setState({ result: 2 })

		}
	}

	openEnding(){
		this.setState({videoModal: true}, () => {
			this.video.play()
		})
	}

	result(res){
		switch(res){
		case 0:
			return <span />	
		case 1:
			return (
				<Alert bsStyle="danger">
					Имате под 75% на теста.
					<img className="alert_img" src="./SadEnd.png" onClick={() => this.setState({result: 0})}/>
				</Alert> )
		case 2:
			setTimeout(this.openEnding.bind(this),15000)
			
			return ( 
				<Alert bsStyle="success">
					Браво вие преминахте теста!
					<img className="alert_img" src="./HappyEnd.png" onClick={this.openEnding.bind(this)}/>
				</Alert> )				
		case 3:
			return (
				<Alert bsStyle="warning">
					Трябва да попълните всички въпроси
				</Alert> )
		default:
			throw "Shouldn't get here"
		}
	}

	render(){
		return(
			<Grid>

				<Row className="show-grid">
					{this.renderQuestions()}
					{this.result(this.state.result)}


					<Button onClick={this.checkAnswers.bind(this)}>Провери</Button>
				</Row>
				<Modal show={this.state.videoModal} onHide={() => {this.video.pause(); this.setState({videoModal: false, result: 0})}}  bsSize="large">
					<Modal.Header closeButton>
						<Modal.Title>Благодаря за вниманието!</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<video src="vid/End.mp4" ref={e => this.video = e}></video>
					</Modal.Body>
				</Modal>
				

			</Grid>
			)
	}
}

window.addEventListener("load", (event) => {
	ReactDOM.render(<App/>, document.getElementById("app-root"));
});
