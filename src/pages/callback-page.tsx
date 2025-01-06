import React, { useEffect } from "react";
import { NavBar } from "../components/navigation/desktop/nav-bar";
import { MobileNavBar } from "../components/navigation/mobile/mobile-nav-bar";
import { create } from "apisauce";
import { useTodoStore } from "src/states/todo";

export const CallbackPage: React.FC = () => {
  const store = useTodoStore();

  useEffect(() => {
    const fetchToken = async () => {
      const auth0Api = create({ baseURL: `https://${process.env.REACT_APP_AUTH0_DOMAIN}`});
      const { data } = await auth0Api.post<any>('/oauth/token', {
        grant_type: 'client_credentials',
        client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
        client_secret: process.env.REACT_APP_AUTH0_CLIENT_SECRET,
      }, {headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }}) 

      if (data)
        store.setAccessToken(data.access_token);
    }
    fetchToken();
  }, [])

  return (
    <div className="page-layout">
      <NavBar />
      <MobileNavBar />
      <div className="page-layout__content" />
    </div>
  );
};
