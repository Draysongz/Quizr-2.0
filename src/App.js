
import Login from './components/Login';
import Main from './components/Main';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/main' element={<Main/>} />
        </Routes>
      
      <ToastContainer/>
      </Router>
    </div>
  );
}

export default App;
