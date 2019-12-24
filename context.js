

const ThemeContext = React.createContext('light');
const HzContext = React.createContext('hz');

class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value="dark">
        <HzContext.Provider value="hz2">
            <Toolbar />
         </HzContext.Provider>
      </ThemeContext.Provider>
    );
  }
}

class Hz extends React.Component {
  static contextType = HzContext;
  render() {
    return <h1>{this.context} </h1>;
  }
}

function Toolbar(props) {
  return (
    <div>
      <h1>hello world</h1>
      <ThemedButton/>
      <Hz/>
    </div>
  );
}

function Button(props) {
  return (
    
      <HzContext.Consumer>
      {
          value => <h1>helleo1 world {value} {props.theme}</h1>
       }
       </HzContext.Consumer>
    
  );
}

class ThemedButton extends React.Component {
  static contextType = ThemeContext;
  render() {
    return (
      
          <Button theme={this.context} />
      
    
   );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('container')
);
