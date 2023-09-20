import logo from './logo.svg';
import './App.css';
// import Modal from './Task/Modals';
import Modals from './Task/Modal';
import { Route,Routes } from 'react-router-dom';

function App() {
  return (
    <>
    <Routes>
      {/* <Route path="/modala" element={<Modals />} />
      <Route path="/modalb" element={<Modals />} /> */}
    </Routes>
    <Modals/>
    </>
  );
}

export default App;
