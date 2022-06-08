import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Furnizori from "./furnizor/pages/Furnizori";
import NewService from "./services/pages/NewService";
import NewEvent from "./events/pages/NewEvent";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import FurnizorServices from "./services/pages/FurnizorServices";
import OrganizatorEvents from "./events/pages/OrganizatorEvents";
import Auth from "./furnizor/pages/Auth";
import UpdateService from "./services/pages/UpdateService";
import UpdateEvent from "./events/pages/UpdateEvent";
import { AuthContext } from "./shared/context/auth-context";
import { AuthOContext } from "./shared/context/authO-context";
import { useAuth } from "./shared/hooks/auth-hook";
import { useAuthO } from "./shared/hooks/authO-hook";

// import ToDoList from "./events/components/ToDoList";
// import data from "./activitati.json"
// import Header from "./Header";
// import ToDoForm from "./events/components/ToDoForm";

const App = () => {
  const { token, login, logout, furnizorId } = useAuth();
  const { tokenO, loginO, logoutO, organizatorId } = useAuthO();

  // const [ toDoList, setToDoList ] = useState(data);
  // const handleToggle = (id) => {
  //   let mapped = toDoList.map(activitate => {
  //     return activitate.id === Number(id) ? { ...activitate, complete: !activitate.complete } : { ...activitate};
  //   });
  //   setToDoList(mapped);
  // }
  // const handleFilter = () => {
  //   let filtered = toDoList.filter(activitate => {
  //     return !activitate.complete;
  //   });
  //   setToDoList(filtered);
  // }
  // const addActivitate = (userInput) => {
  //   let copy = [...toDoList];
  //   copy = [...copy, { id: toDoList.length + 1, activitate: userInput, complete: false }];
  //   setToDoList(copy);
  // }
  let routes;

  if (token && furnizorId) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Furnizori />
        </Route>
        <Route path="/:furnizorId/services" exact>
          <FurnizorServices />
        </Route>
        <Route path="/services/new" exact>
          <NewService />
        </Route>
        <Route path="/services/:serviceId">
          <UpdateService />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else if (tokenO && organizatorId) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Furnizori />
        </Route>
        <Route path="/:furnizorId/services" exact>
          <FurnizorServices />
        </Route> 
        {/* serviciile furnizorilor cand dam click */}
        <Route path="/:organizatorId/events" exact>
          <OrganizatorEvents />
        </Route>
        <Route path="/events/new" exact>
          <NewEvent />
        </Route>
        <Route path="/events/:eventId">
          <UpdateEvent />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Furnizori />
        </Route>
        <Route path="/:furnizorId/services" exact>
          <FurnizorServices />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <React.Fragment>
      <AuthOContext.Provider
        value={{
          isLoggedIn: !!tokenO,
          token: tokenO,
          organizatorId: organizatorId,
          login: loginO,
          logout: logoutO,
        }}
      >
        <AuthContext.Provider
          value={{
            isLoggedIn: !!token,
            token: token,
            furnizorId: furnizorId,
            login: login,
            logout: logout,
          }}
        >
          <Router>
            <MainNavigation />
            <main>{routes}</main>
          </Router>
        </AuthContext.Provider>
      </AuthOContext.Provider>
    </React.Fragment>

    //  <div>
    //    <Header />
    //    <ToDoList toDoList={toDoList} handleToggle={handleToggle} handleFilter={handleFilter}/>
    //    <ToDoForm addActivitate={addActivitate} />
    //  </div>
  );
};

export default App;
