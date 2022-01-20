import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Footer from './jsx/Footer';
import Header from './jsx/Header';
import HomePage from './jsx/HomePage';
import ThreadListPage from './jsx/ThreadListPage';
import ProfilePage from './jsx/ProfilePage';
import SettingPage from './jsx/SettingPage';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/home" component={HomePage} />
        <Route path="/threads" component={ThreadListPage} />
        <Route path="/profile/:username" component={ProfilePage} />
        <Route path="/setting" component={SettingPage} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
