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

// компонент с контекстом
class ThemedButton extends React.Component {
  render() {
    let props = this.props;
    let theme = this.context;
    return (
      <button
        {...props}
        style={{backgroundColor: theme.background}}
      />
    );
  }
}

ThemedButton.contextType = ThemeContext;


// Промежуточный компонент, который использует ThemedButton
function Toolbar(props) {
  return (
    <ThemedButton onClick={props.changeTheme}>
      Change Theme
    </ThemedButton>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
    };

    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };
  }

  render() {
    // ThemedButton внутри ThemeProvider использует
    // значение светлой UI-темы из состояния, в то время как
    // ThemedButton, который находится вне ThemeProvider,
    // использует тёмную UI-тему из значения по умолчанию
    return (
      <div>
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar changeTheme={this.toggleTheme} />
        </ThemeContext.Provider>
        <section>
          <ThemedButton />
        </section>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('container'));
