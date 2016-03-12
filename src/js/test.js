
import React from 'react';
import ReactDOM from 'react-dom';

import R from "ramda"
import {Grid, Row, Col, Panel, Input, Button, Alert} from "react-bootstrap"

require("../css/test.css");

let questions = [
	{
		title: "",
		text: "От какво е направен фрафена",
		answers: ["Въглерод", "Водород", "Натрий"],
		correct: 0
	},
	{
		title: "",
		text: "От колко атома е",
		answers: ["3", "5", "6"],
		correct: 2
	},
	{
		title: "",
		text: "Кога е открит",
		answers: ["през 20 век", "началото на 21 век", "през 19 век"],
		correct: 1
	},
	{
		title: "",
		text: "Кое свойство притежава графена",
		answers: ["Слаба електропроводимост", "Изолатор", "Силна електропроводимост"],
		correct: 2
	},
	{
		title: "",
		text: "Графена по здрав ли е от карбона",
		answers: ["да", "не"],
		correct: 0
	}
]

class Quetion extends React.Component
{
	renderAnswers(){
		let hc = this.handleChange.bind(this)
		return this.props.question.answers.map((e, i) => <Col xs={3} key={i}><Input type="radio" value={i} label={e} name={this.props.index} onChange={hc(this.props.index)} /></Col>)
	}


	handleChange(key, constraints){

		let set = (key, val) => {
			var state = {}
			state[key] = val
			this.setState(state, () => {
				this.props.onValue(this.state);
			})
		}

		return e => {
			set(key, e.target.value);
		}
	}

	render(){
		return(
		<Panel header={"Върпос " + this.props.title}>
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
			result: 0

		}

	}

	renderQuestions(){
		return questions.map((e, i) => <Quetion key={i} index={i} question={e} title={(i + 1)} onValue={v => this.setState(v)}/>)
	}

	checkAnswers(){
		console.log("Checking answers")
		let correct = 0;
		for(let i in R.range(0,questions.length)){
			if(this.state[i] == null){
				this.setState({ result: 3 })
				return
			}
			if(this.state[i] == questions[i].correct){
				correct += 1;
			}
		}
		var coef = correct/questions.length
		console.log(coef)
		if(coef < (75/100)){
			this.setState({ result: 1 })

		}else{
			this.setState({ result: 2 })

		}
	}

	result(res){
		switch(res){
			case 0:
				return <span />
				break;
			case 1:
				return (
					<Alert bsStyle="danger">
						Имате под 75% на теста
					</Alert> )
				break
			case 2:
				return ( 
					<Alert bsStyle="success">
						Браво вие преминахте теста
					</Alert> )
					reak
			case 3:
				return (
					<Alert bsStyle="warning">
						Трябва да попълните всички въпроси
					</Alert> )
				break
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
			</Grid>
			)
	}
}

window.addEventListener("load", (event) => {
	ReactDOM.render(<App/>, document.getElementById("app-root"));
});
