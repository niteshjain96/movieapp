import './App.css';
import Banner from './components/Banner';
import Favourites from './components/Favourites';
import Movies from './components/MovieArea';
import NavBar from './components/NavBar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <NavBar/>
    <Routes>
    <Route path='/' element={
      <>
      <Banner/>
      <Movies/>
      </>}/>
      <Route path='/movies' element={
      <>
      <Banner/>
      <Movies/>
      </>}/>
      <Route path='/favourites' element={
      <>
      <Favourites/>
      </>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
