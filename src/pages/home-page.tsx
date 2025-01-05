import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { PageLayout } from "../components/page-layout";
import Todo from "src/components/todo";

export const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <PageLayout>
          <div className="home_welcome">
            {isAuthenticated ? 
            <>
              <Todo />
            </> : 
              <span className='home_title'>Please login to start adding your todo items.</span>
            }
          </div>
    </PageLayout>
  );
};
