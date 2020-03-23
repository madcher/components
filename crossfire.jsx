import React, { useEffect } from "react";
import "./styles.css";
// version 3.0 !!!!!!!!!!!!!!!!!!!!!!!

const data = [1, 2, 3, 4, 5, 6];
//  crossfire service
let crossfire = {
  state: {},
  update: {},
  subscribe: function(stateFunc) {
    const state = Object.keys(stateFunc)[0];
    const updateSateFunc = Object.keys(stateFunc)[1];
    // save setState function for update
    this.update[updateSateFunc] = newState => {
      this.state[state] = newState;
      stateFunc[updateSateFunc](newState);
    };
    // save state
    this.state[state] = stateFunc[state];
  },
  dispatch: function reducer(action, value) {
    switch (action) {
      case "TOGGLE":
        let id = value;
        let newSelection = { ...this.state.selection };
        newSelection[id] ? delete newSelection[id] : (newSelection[id] = true);
        // update immutable state;
        this.update.setSelect(newSelection);
        this.update.setCount(Object.keys(newSelection).length);
        break;
      case "RESET":
        this.update.setSelect({});
        this.update.setCount(0);
        break;
      case "SELECTALL":
        let selectionAll = {};
        data.forEach(el => selectionAll[el-1] = true);
        this.update.setSelect(selectionAll);
        this.update.setCount(Object.keys(selectionAll).length);
        break;
      default:
        return;
    }
  }
};

// context
const StateContext = React.createContext(crossfire);

const Table = () => {
  const [selection, setSelect] = React.useState({});
  const crossfire = React.useContext(StateContext);
  // подписка
  useEffect(() => {
    crossfire.subscribe({ selection, setSelect });
  }, []);

  return (
    <tbody>
      {data.map((el, i) => {
        let color = selection[i] ? "gray" : "white";
        return (
          <tr
            style={{ border: "1px solid black", background: color }}
            id={i}
            onClick={() => crossfire.dispatch("TOGGLE", i)}
            key={i}
          >
            <td style={{ border: "1px solid black" }}> {el} </td>
            <td style={{ border: "1px solid black" }}> 1 </td>
            <td style={{ border: "1px solid black" }}> 2 </td>
          </tr>
        );
      })}
    </tbody>
  );
};

const StatusBar = () => {
  const [count, setCount] = React.useState(0);
  const crossfire = React.useContext(StateContext);
  // подписка
  useEffect(() => {
    crossfire.subscribe({ count, setCount });
  }, []);

  return (
    <div>
      Selected: {count} <br />
      <button onClick={() => crossfire.dispatch("SELECTALL")}>
        Select all
      </button>
    </div>
  );
};

const NewLevel = props => {
  return <div>{props.children}</div>;
};
const NewLevel2 = props => {
  return <div>{props.children}</div>;
};
const NewLevel3 = props => {
  return <div>{props.children}</div>;
};
const NewLevel4 = props => {
  const crossfire = React.useContext(StateContext);

  return (
    <div>
      {props.children}
      <button onClick={() => crossfire.dispatch("RESET")}> Reset</button>
    </div>
  );
};

const NewLevel5 = props => {
  return <div>{props.children}</div>;
};

const App = () => {
  return (
    <StateContext.Provider value={crossfire}>
      <div className="App">
        <NewLevel>
          <NewLevel2>
            <NewLevel3>
              <NewLevel4>
                <table>
                  <Table />
                </table>
              </NewLevel4>
            </NewLevel3>
          </NewLevel2>
        </NewLevel>
        <NewLevel4>
          <NewLevel5>
            <div>
              <StatusBar />
            </div>
          </NewLevel5>
        </NewLevel4>
      </div>
    </StateContext.Provider>
  );
};

export default App;
