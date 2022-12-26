import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './components/home';
import LoginPage from './components/auth/login';
import RegisterPage from './components/auth/register';
import { Route, Routes } from 'react-router-dom';
import NoMatch from './components/noMatch';
import DefaultLayout from './components/containers/default';

function App() {
  return (
    <>
    {/*Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements.*/}
    <Routes>
        <Route path="/" element={<DefaultLayout/>}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
