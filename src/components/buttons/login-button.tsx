import React from "react";

export const LoginButton: React.FC = () => {
  const handleLogin = async () => {
    window.location.replace(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?response_type=token&client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_AUTH0_CALLBACK_URL}&audience=https://api.todo.training`);
  };

  return (
    <button className="button__login" onClick={handleLogin}>
      Log In
    </button>
  );
};
