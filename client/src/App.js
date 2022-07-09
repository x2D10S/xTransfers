import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Components/Pages/home';
import SearchPage from './Components/Pages/searchTransfer';
import TransferPage from './Components/Pages/transfer';
import DeletePage from './Components/Pages/deleteTransfer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/transfer' element={<TransferPage />} />
        <Route path='/searchTransfer' element = {<SearchPage />} />
        <Route path='/deleteTransfer' element = {<DeletePage />} />
      </Routes>
    </Router>
  );
}

export default App;
