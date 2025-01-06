import React from "react";
import { useTodoStore } from "src/states/todo";

export const LogoutButton: React.FC = () => {
  const setAccessToken = useTodoStore(state => state.setAccessToken);
  const handleLogout = () => {
    setAccessToken(undefined);
    window.location.replace(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/v2/logout?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&returnTo=http://localhost:3000`);
  };

  return (
    <button className="button__logout" onClick={handleLogout}>
      Log Out
    </button>
  );
};
