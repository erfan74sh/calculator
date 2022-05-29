import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const isOperator = /[*/+‑]/,
	endsWithOperator = /[*+-/]$/,
	endsWithNegativeSign = /\d[*/+-]{1}-$/;

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentVal: "0",
			prevVal: "",
			formula: "",
			currentSign: "",
			lastClicked: "",
			evaluated: false,
		};
	}

	handleNumbers = (event) => {
		const { currentVal, formula, evaluated } = this.state;
		let value = event.target.value;
		if (!evaluated) {
			this.setState({
				currentVal:
					currentVal === "0" || isOperator.test(currentVal)
						? value
						: currentVal + value,
				formula:
					currentVal !== "0" ? formula + value : formula.slice(0, -1) + value,
			});
		} else {
			this.setState({
				currentVal: value,
				formula: value,
				evaluated: false,
			});
		}
	};
	handleDecimal = () => {
		const { currentVal, formula, evaluated } = this.state;
		if (currentVal.toString().includes(".")) {
			this.setState({
				evaluated: false,
			});
		} else {
			this.setState({
				currentVal: evaluated
					? "0."
					: isOperator.test(currentVal)
					? "0."
					: currentVal + ".",
				formula: evaluated
					? "0."
					: endsWithOperator.test(formula)
					? formula + "0."
					: formula + ".",
				evaluated: false,
			});
		}
	};
	handleOperation = (event) => {
		const { currentVal, formula, evaluated } = this.state;
		const value = event.target.value;
		if (!evaluated) {
			this.setState({
				currentVal: value,
				formula: !endsWithOperator.test(formula)
					? formula + value
					: endsWithNegativeSign.test(formula)
					? formula.slice(0, -2) + value
					: value === "-"
					? formula + value
					: formula.slice(0, -1) + value,
			});
		} else {
			this.setState({
				currentVal: value,
				formula: currentVal + value,
				evaluated: false,
			});
		}
	};
	handleEvaluate = () => {
		const { formula } = this.state;
		const result = eval(formula.replace("--", "+"));
		this.setState({
			formula: formula + "=" + result,
			currentVal: result,
			evaluated: true,
		});
	};
	handleInitialize = () => {
		this.setState({
			currentVal: "0",
			prevVal: "",
			formula: "",
			currentSign: "",
			lastClicked: "",
			evaluated: false,
		});
	};

	render() {
		return (
			<div id={"container"}>
				<div id={"calculator"}>
					<Formula formula={this.state.formula} />
					<Result currentValue={this.state.currentVal} />
					<Buttons
						numbers={this.handleNumbers}
						evaluate={this.handleEvaluate}
						initialize={this.handleInitialize}
						operate={this.handleOperation}
						decimal={this.handleDecimal}
					/>
					<footer>- by erfan -</footer>
				</div>
			</div>
		);
	}
}

class Formula extends React.Component {
	render() {
		return <div id={"formula"}>{this.props.formula}</div>;
	}
}

class Result extends React.Component {
	render() {
		return <div id={"display"}>{this.props.currentValue}</div>;
	}
}

class Buttons extends React.Component {
	render() {
		return (
			<div id={"buttons-container"}>
				<div id={"other-buttons"}>
					<div className={"row"}>
						<button
							className={"button"}
							id={"seven"}
							value={7}
							onClick={this.props.numbers}
						>
							7
						</button>
						<button
							className={"button"}
							id={"eight"}
							value={8}
							onClick={this.props.numbers}
						>
							8
						</button>
						<button
							className={"button"}
							id={"nine"}
							value={9}
							onClick={this.props.numbers}
						>
							9
						</button>
						<button
							className={"button"}
							id={"divide"}
							value={"/"}
							onClick={this.props.operate}
						>
							/
						</button>
					</div>
					<div className={"row"}>
						<button
							className={"button"}
							id={"four"}
							value={"4"}
							onClick={this.props.numbers}
						>
							4
						</button>
						<button
							className={"button"}
							id={"five"}
							value={"5"}
							onClick={this.props.numbers}
						>
							5
						</button>
						<button
							className={"button"}
							id={"six"}
							value={"6"}
							onClick={this.props.numbers}
						>
							6
						</button>
						<button
							className={"button"}
							id={"multiply"}
							value={"*"}
							onClick={this.props.operate}
						>
							*
						</button>
					</div>
					<div className={"row"}>
						<button
							className={"button"}
							id={"one"}
							value={"1"}
							onClick={this.props.numbers}
						>
							1
						</button>
						<button
							className={"button"}
							id={"two"}
							value={"2"}
							onClick={this.props.numbers}
						>
							2
						</button>
						<button
							className={"button"}
							id={"three"}
							value={"3"}
							onClick={this.props.numbers}
						>
							3
						</button>
						<button
							className={"button"}
							id={"subtract"}
							value={"-"}
							onClick={this.props.operate}
						>
							-
						</button>
					</div>
					<div className={"row"}>
						<button
							className={"button"}
							id={"decimal"}
							value={"."}
							onClick={this.props.decimal}
						>
							.
						</button>
						<button
							className={"button"}
							id={"zero"}
							value={"0"}
							onClick={this.props.numbers}
						>
							0
						</button>
						<button
							className={"button"}
							id={"clear"}
							value={"AC"}
							onClick={this.props.initialize}
						>
							AC
						</button>
						<button
							className={"button"}
							id={"add"}
							value={"+"}
							onClick={this.props.operate}
						>
							+
						</button>
					</div>
				</div>
				<div id={"equal-button"}>
					<button
						className={"button"}
						id={"equals"}
						value={"="}
						onClick={this.props.evaluate}
					>
						=
					</button>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById("root"));
