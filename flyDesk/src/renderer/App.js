import React, { createContext, useEffect, useState } from 'react';
import { HOST, PORT, DOMAIN } from '../config';
import RegLogPage from './RegLogPage';
import ThreadListPage from './ThreadListPage'
import { ipcRenderer } from 'electron';
import { useNavigate, Routes, Route } from 'react-router-dom';

const userContext = createContext({
  user: {},
  serUser: () => { },
  auth: false,
  setAuth: () => { },
});

function App() {
  const [user, setUser] = useState({});
  const [auth, setAuth] = useState(false);
  const logout = async () => {
    const url = `${HOST}:${PORT}/api/users/logout`;
    try {
      const data = JSON.parse(localStorage.getItem(DOMAIN));
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await res.json();
      if (res.ok) {
        setAuth(false);
        setUser({});
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const navigator = useNavigate();
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
        ipcRenderer.send('logoutMenuItem', true);
        navigator('/threads')
      } else {
        setAuth(false);
        console.warn("Auth faile. ", result.message);
        ipcRenderer.send('logoutMenuItem', false);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    authenticate();
  }, []);

  ipcRenderer.on('logout', (e, msg) => {
      if (msg) {
        logout();
        setAuth(false);
        setUser({});
      }
  });

  return (
    <userContext.Provider value={{ user, setUser, auth, setAuth }}>
      <div className="m-0 p-0 w-100">{auth ? <ThreadListPage /> : <RegLogPage />}</div>
    </userContext.Provider>
  );
}

export { userContext };
export default App;
