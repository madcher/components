const App = () => {
  
  const [count, setCount] = React.useState(0);
  const [resetVar, setReset] = React.useState(true);
  
  React.useEffect(() => {
    setCount(2);
  }, [resetVar])
  
  const add = () => setCount(count + 1);
  const minus = () => setCount(count - 1);
  const reset = () => setReset(!resetVar);
  
  return(
    <div>
      hello {count} <br/>
      <button onClick={add}>+</button>
      <button onClick={minus}>-</button>
      <br />
      <button onClick={reset}>Reset</button>
    </div>
  );
}


const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement)
