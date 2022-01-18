import './App.css';
import ThreadList from './jsx/ThreadList'
import RegisterForm from './jsx/RegisterForm'
import LoginForm from './jsx/LoginForm';
import SettingForm from './jsx/SettingForm';
import PostForm from './jsx/PostForm';
import ModifyButton from './jsx/ModifyButton';
import ReplyForm from './jsx/ReplyForm';
import Footer from './jsx/Footer';
import Header from './jsx/Header';
import UserInfo from './jsx/UserInfo';
import Intro from './jsx/Intro';
import Thread from './jsx/Thread';
import DeleteButton from './jsx/DeleteButton';

function App() {
  return (
    <div className="App">
      <h1> Thread List</h1>
      <ThreadList />
    </div>
  );
}

export default App;
