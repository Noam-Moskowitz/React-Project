import './App.css';
import Login from './components/login/Login';
import Register from './components/login/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import { ThemeProvider } from '@mui/material';
import useAppTheme from './hooks/useAppTheme';
import TopNav from './components/navbar/TopNav';
import BusinessPage from './components/BusinessPage';
import EditCard from './components/cards/EditCard';


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
            <Route path='/cards/:type' element={<Home />} />
            <Route path='/cards/:type' element={<Home />} />
            <Route path='/business/:id' element={<BusinessPage />} />
            <Route path='/card/edit/:id' element={<EditCard />} />
            <Route path='/card/create' element={<EditCard />} />


          </Routes>


        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
