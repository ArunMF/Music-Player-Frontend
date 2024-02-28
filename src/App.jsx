import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { Col, Row } from 'react-bootstrap';
import Sidebar from './Components/Sidebar';
import Home from './Components/Home';
// import Home from './Components/Home/Home';

function App() {
  return (
    <div className="App">
      <Header />
      <Row className='container-fluid'>
        <Sidebar />
        <Routes>
        <Route path='/' element={<Home/>} />
      </Routes>
      </Row>
      <Footer/>
    </div>
  );
}

export default App;
