import React, {Fragment} from 'react';
import {Button} from "reactstrap";
import {useDispatch} from "react-redux";
import {NavLink} from "react-router-dom";

import {logoutUser} from "../../store/actions/usersActions";

const UserMenu = props => {
  const dispatch = useDispatch();

  return (
    <Fragment>
      <b>Welcome, {props.user.displayName}!</b>
      <Button className='ml-2' color="success" tag={NavLink} to='/venues/add'>Add new venue</Button>
      <Button className='ml-2' color="danger" onClick={() => dispatch(logoutUser())}>Logout</Button>
    </Fragment>
  );
};

export default UserMenu;