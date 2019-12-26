// объект для котнтекста
const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
};

// контекст
const ThemeContext = React.createContext(
  themes.dark // значение по умолчанию
);

// don't change context
themes.dark = 'red';

// компонент с контекстом
class ThemedButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let theme = this.context;
    console.log(' 1 ' + this.props.theme);
    
    return (
      <button 
        onClick={this.props.click}
        style={{backgroundColor: theme.background}}
      >
        {this.props.children}
      </button>
    );
  }
}

ThemedButton.contextType = ThemeContext;

// Промежуточный компонент, который использует ThemedButton
function Toolbar(props) {
  return (
    <ThemedButton click={props.changeTheme} theme={themes.dark}>
      Change Theme
    </ThemedButton>
  );
}

class App extends React.Component {
  constructor(props) {
      super(props);
      this.toggleTheme = this.toggleTheme.bind(this);
      this.state = {
        theme: themes.light,
      };
  }
  
  toggleTheme() {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
  }
  render() {
    return (
      <div>
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar changeTheme={this.toggleTheme} />
        </ThemeContext.Provider>
        <section>
          <ThemedButton>  
            Исходный
          </ThemedButton>
        </section>
       </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('container'));

