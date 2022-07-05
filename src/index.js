
import ReactDOM from 'react-dom/client';
import LoginForm from './components/LoginForm';
import { AuthProvider } from './contexts/AuthContext';
import './index.css';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <LoginForm/>
  </AuthProvider>
);


