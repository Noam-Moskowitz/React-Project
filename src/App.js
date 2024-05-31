import { Provider } from 'react-redux';
import './App.css';
import Login from './components/Login';
import TopNav from './components/TopNav';
import store from './store/store';
import Register from './components/Register';

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
