const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
      this.props.sett(e.target.value, this.props.scale);
  }

  render() {
    const temperature = this.state.temperature;
    const scale = this.props.scale;
    return (
      <div>
        <fieldset>
          <legend>Enter temperature in {scaleNames[scale]}:</legend>
          <input value={this.props.temp}
                 onChange={this.handleChange} />
        </fieldset>
        
       </div>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state ={ctemp: 10, ftemp: this.toFahrenheit(10)}
  }
  setTemperature = (temp, sys) => {
    if (sys == 'c') {
      this.setState({ctemp: temp, ftemp: this.toFahrenheit(temp)});
      return;
    }
    this.setState({ftemp: temp, ctemp: this.toCelsius(temp)});  
  }
  
  toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
  }

  toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
  }

  render() {
    return (
      <div>
        <TemperatureInput scale="c" sett={this.setTemperature} temp={this.state.ctemp}/>
        <TemperatureInput scale="f" sett={this.setTemperature} temp={this.state.ftemp}/>
        {this.state.ftemp}
      </div>
    );
  }
}

ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);
