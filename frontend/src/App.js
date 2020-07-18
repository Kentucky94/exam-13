import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {ToastContainer} from "react-toastify";

import Layout from "./components/Layout/Layout";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import VenueListPage from "./containers/VenueListPage/VenueListPage";
import {useSelector} from "react-redux";
import AddVenuePage from "./containers/AddVenuePAge/AddVenuePage";

const App = () => {
  const user = useSelector(state => state.users.user);

  const ProtectedRoute = ({isAllowed, ...props}) => (
    isAllowed ? <Route {...props} /> : <Redirect to='/' />
  );

  return (
    <Layout>
      <ToastContainer />
      <Switch>
        <Route path='/' exact component={VenueListPage} />
        <Route path='/login' exact component={Login} />
        <Route path='/register' exact component={Register} />
        <ProtectedRoute isAllowed={!!user} path='/venues/add' exact component={AddVenuePage} />
        <Route render={() => <h3>Page not found</h3>}/>
      </Switch>
    </Layout>
  );
};

export default App;