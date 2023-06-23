import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {ToastContainer} from 'react-toastify';
import Home from './pages/Home';
import Add from './pages/Add';
import ViewEmployee from './pages/ViewEmployee';


function App() {
  return (
    <BrowserRouter> 
    <div className="App">
      <ToastContainer position='top-center'> </ToastContainer>
      <Routes >
        <Route exact path="/" Component={Home} > </Route>
        <Route exact path='/addEmployee' Component={Add}> </Route>
        <Route exact path='/updateEmployee/:id' Component={Add}> </Route>
        <Route exact path='/viewEmployee/:id' Component={ViewEmployee}> </Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
