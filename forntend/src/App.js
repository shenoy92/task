import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from './components/header';
import Loader from './components/loader';
import ProtectedRoute from "./components/protectedRoute";

import Home from './pages/home';
import Login from './pages/login';
import Registration from './pages/registration';
import Profile from './pages/profile';
import NotFound from './pages/notFound';


function App() {
  return (
    <>
      <Header />
      <div className="custom-container">
        <React.Suspense fallback={<Loader/>}>
          <BrowserRouter>
            <Switch>
                <Route path="/" component={Home} exact/>
                <Route path="/login" component={Login} />
                <Route path="/registration" component={Registration} />
                <ProtectedRoute exact path="/profile" component={Profile} />
                <Route path="*" component={NotFound} />
            </Switch>
          </BrowserRouter>
        </React.Suspense>
      </div>
    </>
  );
}

export default App;
