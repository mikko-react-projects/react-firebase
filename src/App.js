import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import TodosPage from './components/todos/TodosPage';
import CalendarPage from './components/calendar/CalendarPage';
import QlearningPage from './components/qlearning/QlearningPage';
import TictactoePage from './components/tictactoe/TictactoePage';
import CatalogPage from './components/catalog/CatalogPage';
import TopNavigation from './components/navigation/TopNavigation';
import UserRoute from "./components/routes/UserRoute";
import GuestRoute from "./components/routes/GuestRoute";

const App = ({ location }) => {
  return (
    <div className="ui container">
      <TopNavigation />
      <Route
        path="/"
        exact
        component={HomePage}
      />
      <GuestRoute
        path="/login"
        exact
        component={LoginPage}
      />
      <GuestRoute
        path="/signup"
        exact
        component={SignupPage}
      />
      <UserRoute
        path="/todos"
        exact
        component={TodosPage}
      />
      <UserRoute
        path="/calendar"
        exact
        component={CalendarPage}
      />
      <UserRoute
        path="/qlearning"
        exact
        component={QlearningPage}
      />
      <UserRoute
        path="/tictactoe"
        exact
        component={TictactoePage}
      />
      <UserRoute
        path="/catalog"
        exact
        component={CatalogPage}
      />
    </div>
  );
}

export default App;
