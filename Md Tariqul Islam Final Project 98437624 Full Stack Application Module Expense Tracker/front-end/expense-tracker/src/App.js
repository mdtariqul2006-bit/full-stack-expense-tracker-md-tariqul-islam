
import './App.css';
import './index.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import Login from './pages/Auth/login';
import SignUp from './pages/Auth/signUp';
import Home from './pages/dashboard/home';
import Expense from './pages/dashboard/expense';
import Income from './pages/dashboard/income';
import AuthLayout from './components/layouts/AuthLayout';
import UserProvider from './context/userContext';




const Root = () => {
  //checks if token is there in localStorage
  const isAuthenticated = localStorage.getItem('token');

  //takes you to dashboard if authenticated, else to login page
  return isAuthenticated ? (<Navigate to="/dashboard" />) : (<Navigate to="/login" />);
};






function App() {
  return (
    <UserProvider>
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root/>} />
          <Route path="/login" exact element={<AuthLayout><Login/></AuthLayout>} />
          <Route path="/signUp" exact element={<AuthLayout><SignUp/></AuthLayout>} />
          <Route path="/dashboard" exact element={<Home/>} />
           <Route path="/dashboard/expense" exact element={<Expense/>} />
            <Route path="/dashboard/income" exact element={<Income/>} />
        </Routes>
      </Router>
    </div>
    </UserProvider>
  );
}

export default App;
