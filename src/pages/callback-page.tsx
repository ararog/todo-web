import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { NavBar } from "../components/navigation/desktop/nav-bar";
import { MobileNavBar } from "../components/navigation/mobile/mobile-nav-bar";
import { PageLayout } from "../components/page-layout";
import { create } from "apisauce";

export const CallbackPage: React.FC = () => {
  const { error } = useAuth0();

  useEffect(() => {
    const auth0Api = create({ baseURL: `https://${process.env.REACT_APP_AUTH0_DOMAIN}`});
    auth0Api.post('/oauth/token', {
      grant_type: 'client_credentials',
      client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
      client_secret: process.env.REACT_APP_AUTH0_CLIENT_SECRET,
    }, {headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }}).then((response: any) => {
      const {data} = response;
      if (data)
        console.log(data.access_token)
    })
  }, [])

  if (error) {
    return (
      <PageLayout>
        <div className="content-layout">
          <h1 id="page-title" className="content__title">
            Error
          </h1>
          <div className="content__body">
            <p id="page-description">
              <span>{error.message}</span>
            </p>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <div className="page-layout">
      <NavBar />
      <MobileNavBar />
      <div className="page-layout__content" />
    </div>
  );
};
