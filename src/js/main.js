import React from 'react';
import ReactDOM from 'react-dom';
import lodash from "lodash"; //because I can

//import TabPanel from "./tabPanel.js";

class App extends React.Component 
{
	constructor(props){
		super(props)
		this.state = {

		}
	}
	
	render(){
		return (
			<div>
				<h1>Hello graphene !!</h1>
				

			</div>
			)
	}
}


ReactDOM.render(<App/>, document.getElementById('app-root'));