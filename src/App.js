import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainNav from './components/shared/MainNav';
import Dashboard from './components/Dashboard/Dashboard';

const App = () => {
  
  return (
    <div>
      <MainNav />
      <Dashboard />
    </div>
  );
}

export default App;
