import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/timescreen">Time Screen</Link> |{" "}
        <Link to="/diceroller">Dice Roller</Link>
      </nav>            
    </div>
  );
}

export default App;
