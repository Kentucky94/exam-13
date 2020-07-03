import React from 'react';
import {Button} from "reactstrap";
import {useDispatch} from "react-redux";

import FacebookLoginButton from 'react-facebook-login/dist/facebook-login-render-props';
import {loginWithFacebook} from "../../../store/actions/usersActions";

const FacebookLogin = () => {
  const dispatch = useDispatch();

  const responseFacebook = event => {
    if(event.id){
      dispatch(loginWithFacebook(event));
    }
  };

  return (
    <FacebookLoginButton
      appId="237001530836786"
      callback={responseFacebook}
      render={renderProps => (
        <Button color='primary' onClick={renderProps.onClick}>Login with Facebook</Button>
      )}
    />
  );
};

export default FacebookLogin;