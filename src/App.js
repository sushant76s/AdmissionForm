import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdmissionForm from './components/admissionform';
import Header from './components/header';
import PaymentPage from './components/paymentPage';




function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={[<Header/>,<AdmissionForm/>]}/>
          <Route path='/payment' element={<PaymentPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
