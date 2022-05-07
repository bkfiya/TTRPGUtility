import './App.css';
import DMScreen from './components/dm-screen'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <DMScreen></DMScreen>
      <ToastContainer />
    </div>
  );
}

export default App;
