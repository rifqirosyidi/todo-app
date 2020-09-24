import React, { Component } from "react";
import TodoList from "./components/TodoList";
import "./App.css";

class App extends Component {
  componentDidMount() {
    // Fetch An API Call
  }

  render() {
    return (
      <div className="App">
        <TodoList />
      </div>
    );
  }
}

export default App;
