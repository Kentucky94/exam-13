import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {ToastContainer} from "react-toastify";

import Layout from "./components/Layout/Layout";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import VenueListPage from "./containers/VenueListPage/VenueListPage";

const App = () => {
  return (
    <Layout>
      <ToastContainer />
      <Switch>
        <Route path='/' exact component={VenueListPage} />
        <Route path='/login' exact component={Login} />
        <Route path='/register' exact component={Register} />
        <Route render={() => <h3>Page not found</h3>}/>
      </Switch>
    </Layout>
  );
};

export default App;