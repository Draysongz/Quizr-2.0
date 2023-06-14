
import Login from './components/Login';
import Main from './components/Main';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Scorepage from './components/Scorepage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/main' element={<Main/>} />
          <Route path="/score/:score" element={<Scorepage />} />
        </Routes>
      
      <ToastContainer/>
      </Router>
    </div>
  );
}

export default App;
