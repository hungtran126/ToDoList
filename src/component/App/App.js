import React, { Component } from 'react'
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import TodoList from '../Body/TodoList';
import EditTask from '../Edit/EditTask';
class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={TodoList} />
          <Route path="/edit/:id" component={EditTask} />
        </Switch>
      </div>
      </Router>
    )
  }
}

export default App