import { Provider, useDispatch } from 'react-redux';
import './App.css';
import TopNav from './components/TopNav';
import store from './store/store';
import Login from './components/login/Login';
import Register from './components/login/Register';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Favorites from './components/cards/Favorites';
import MyCards from './components/cards/MyCards';
import Home from './components/Home';
import { ThemeProvider } from '@mui/material';
import useAppTheme from './hooks/useAppTheme';


function App() {

  const currentTheme = useAppTheme();

  return (
    <div className="App">
      <ThemeProvider theme={currentTheme} >

        <BrowserRouter>
          <TopNav />

          <Routes>




            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/myFavorites' element={<Favorites />} />
            <Route path='/myCards' element={<MyCards />} />


          </Routes>


        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
