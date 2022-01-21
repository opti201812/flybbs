import React,{ createContext, useEffect, useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import { HOST, PORT, DOMAIN } from './config';
import Intro from './jsx/Intro';
import Footer from './jsx/Footer';
import Header from './jsx/Header';
import HomePage from './jsx/HomePage';
import ThreadListPage from './jsx/ThreadListPage';
import ProfilePage from './jsx/ProfilePage';
import SettingPage from './jsx/SettingPage';

const userContext = createContext({
  user: {},
  serUser: () => { },
  auth: false,
  setAuth: () => { },
});

function App() {
  const [user, setUser] = useState({});
  const [auth, setAuth] = useState(false);

  const authenticate = async () => {
    try {
      const data = localStorage.getItem(DOMAIN);
      if (!data || data.length == 0) {
        setAuth(false);
        return;
      }
      const url = `${HOST}:${PORT}/api/users/auth`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data,
      });
      const result = await res.json();
      if (res.ok) {
        setAuth(true);
        setUser(result.data);
      } else {
        setAuth(false);
        console.warn("Auth faile. ", result.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    authenticate();
  }, []);
  return (
    <userContext.Provider value={{ user, setUser, auth, setAuth }}>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/threads/*" element={<ThreadListPage />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
        <Route path="/setting" element={<SettingPage />} />
      </Routes>
      <Footer />
    </userContext.Provider>
  );
}

export { userContext };
export default App;
