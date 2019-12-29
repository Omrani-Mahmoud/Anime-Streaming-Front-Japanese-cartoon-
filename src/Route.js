import React from 'react';
import {Route} from 'react-router-dom';
import App from './App';
import Films from './Pages/Films';
import Episodes from './Pages/Episodes';
import Animes from './Pages/Animes';
import Player from "./components/Player";
const Router =()=>
  {
    return (
      
      <div>
          <Route path= "/"  exact component={App} />
          <Route exact path={"/perType/:type"} exact component={Animes} />
          <Route path= "/films"  exact component={Films} />
          <Route exact path={"/episodes/:id"}  exact component={Episodes} />
          <Route exact path={"/watch/:ep"}  exact component={Player} />
      </div>
      
    );
  }

  export default Router;

// <Route exact path="/drama/:name" component={Drama} />