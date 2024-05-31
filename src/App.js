import { Provider } from 'react-redux';
import './App.css';
import TopNav from './components/TopNav';
import store from './store/store';
import Login from './components/login/Login';
import Register from './components/login/Register';
import CustomLoader from './components/CustomLoader';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        
        <TopNav/>
        <Login/>
        <Register/>
      
      </Provider>
    </div>
  );
}

export default App;
