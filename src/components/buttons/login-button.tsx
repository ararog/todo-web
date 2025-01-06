import React from "react";
import { useHistory } from "react-router-dom";

export const LoginButton: React.FC = () => {
  const history = useHistory();
  const handleLogin = async () => {
    window.location.replace(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?response_type=token&client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&redirect_uri=http://localhost:3000/&audience=https://api.todo.training`);
  };

  return (
    <button className="button__login" onClick={handleLogin}>
      Log In
    </button>
  );
};
