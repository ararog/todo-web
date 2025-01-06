import React, { useEffect } from "react";
import { PageLayout } from "../components/page-layout";
import Todo from "src/components/todo";
import { useTodoStore } from "src/states/todo";

export const HomePage: React.FC = () => {
  const store = useTodoStore(store => store);

  useEffect(() => {
    const fields = window.location.hash.slice(1).split('&');
    const tokens = fields.reduce<any>((acc, actual) => {
      const tokens = actual.split("=");
      acc[tokens[0]] = tokens[1];
      return acc;
    }, {})
    store.setAccessToken(tokens.access_token);
  }, []);

  return (
    <PageLayout>
          <div className="home_welcome">
            {store.isAuthenticated ? 
            <>
              <Todo />
            </> : 
              <span className='home_title'>Please login to start adding your todo items.</span>
            }
          </div>
    </PageLayout>
  );
};
