
import React from "react"
import ReactDOM from "react-dom"

import _ from "lodash"

import {Grid, Row, Col, Panel, Input, Button, Alert, Modal, Radio, FormGroup} from "react-bootstrap"

require("../css/bootstrap.min.css")

//var math = require('mathjs'); // TODO: remove if unused

require("../css/test.css")

let questions = [
	{
		text: "Разновидност на кое е графенът?",
		answers: ["Въглерод", "Водород", "Натрий"],
		correct: 0
	},
	{
		text: "От колко атома е създаден молекулният строеж на графена?",
		answers: ["3", "5", "6"],
		correct: 2
	},
	{
		text: "Кога е открит?",
		answers: ["По някое време през 20 век.", "09.2004", "2015"],
		correct: 1
	},
	{
		text: "Кое от свойствата притежава графенът?",
		answers: ["Слаба електропроводимост.", "Изолатор.", "Силна електропроводимост."],
		correct: 2
	},
	{
		text: "Графенът по-здрав ли е от карбона?",
		answers: ["Да.", "Не."],
		correct: 0
	},
	{
		text: "Кое от следните, е възможно благодарение на графена?",
		answers: ["Космически асансьор", "Сешоар", "Процесор"],
		correct: 0
	},
	{
		text: "В кой университет се разработва технология за отгряване на графен?",
		answers: [ "MIT", "TFT Lab London", "Enclave" ],
		correct: 1
	},
	{
		text: "Какво следи графененият чип във вената?",
		answers: [ "BPM, mmol/L", "BPM, хемоглубин", "mmol/L, левкoцити" ],
		correct: 0
	}
]


const count = 6

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
		var correct = 0;
		
		sha.forEach((answ, index) => {
			if(answ.correct){
				correct = index
			}
		})

		shuffled[i].correct = correct
	}

	return shuffled

}

class Quetion extends React.Component
{
	renderAnswers(){
		let hc = this.handleChange.bind(this)
		return this.props.question.answers.map((e, i) => <Col xs={3} key={i}><Radio value={i} label={e} name={this.props.index} onChange={hc(this.props.index)} >{e}</Radio></Col>)
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
				<FormGroup controlId={"Въпрос " + this.props.title}>
					{this.renderAnswers()}
				</FormGroup>
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
			questions: TestMangler(questions, count)
		}

	}

	renderQuestions(){
		return this.state.questions.map((e, i) => <Quetion key={i} index={i} question={e} title={(i + 1)} onValue={v => this.setState(v)} />)
	}

// problem with the sublime theme fix /

	checkAnswers(){
		
		let correct = 0
		for(let i in _.range(0, this.state.questions.length)){
			if(this.state[i] == null){
				this.setState({ result: 3 })
				return
			}
			if(this.state[i] == this.state.questions[i].correct){
				correct += 1
			}
		}
		var coef = correct/this.state.questions.length
		console.log(coef)
		if(coef < (3/4)){
			this.setState({ result: 1, wrong: count - correct })

		}else{
			this.setState({ result: 2, wrong: count - correct })

		}
	}

	openEnding(){
		this.setState({videoModal: true}, () => {
			this.video.play()
		})
	}

	result(res){
		var wrong = () => {
			if(this.state.wrong != 0){
				if(this.state.wrong == 1){
					return <span>Имате 1 грешка на теста.</span>
				}
				return <span>Имате {this.state.wrong} гершки на теста.</span>
			}
		}

		switch(res){
		case 0:
			return <span />	
		case 1:
			return (
				<Alert bsStyle="danger">
					{wrong()}
					<img className="alert_img" src="./img/SadEnd.png" onClick={() => {
						window.location = window.location.pathname.replace("test","index") + "#info"
					}}/>
				</Alert> )
		case 2:			
			return ( 
				//TODO: Return the setTimout but check if it was alreathy set
				<Alert bsStyle="success">
					Браво вие преминахте теста! {wrong()}
					<img className="alert_img" src="./img/HappyEnd.png" onClick={() =>  {
						window.location.pathname = window.location.pathname.replace("test","index")
					}}/>
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

window.addEventListener("load", () => {
	ReactDOM.render(<App/>, document.getElementById("app-root"))
})
