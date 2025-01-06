import React from "react";
import { Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "./components/protected-route";
import { HomePage } from "./pages/home-page";
import { NotFoundPage } from "./pages/not-found-page";
import { ProfilePage } from "./pages/profile-page";

export const App: React.FC = () => {

  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <ProtectedRoute path="/profile" component={ProfilePage} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  );
};
