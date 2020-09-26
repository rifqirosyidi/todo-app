import React, { Component } from "react";
import { connect } from "react-redux";
import { addTodo } from "../actions/todo-actions";
// import shortid from 'shortid';

class TodoForm extends Component {
  state = {
    todo: "",
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    // taruh di redux thunk action, jangan redirect
    event.preventDefault();

    // const apiUrl = 'http://localhost:8000/api/todos'
    // fetch(apiUrl, {
    //     method: 'POST',
    //     body: JSON.stringify({
    //         todo: this.state.todo
    //     }),
    //     headers: {
    //         "Content-Type": "application/json; charset=UTF-8"
    //     }
    // })
    // .then(response => response.json())
    // .then(data => {
    //     if (data.status === 200) {
    //         window.location.href = 'http://localhost:3000'
    //     }
    // })

    this.props.addTodo(this.state.todo);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="w-full max-w">
          <div className="flex items-center border-b border-teal-500 py-2 my-4">
            <input
              name="todo"
              placeholder="Todo..."
              value={this.state.todo}
              onChange={this.handleChange}
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              aria-label="Full name"
            />

            <button
              onClick={this.handleSubmit}
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-2 px-2"
              type="button"
            >
              Add Todo
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (todo) => dispatch(addTodo(todo)),
  };
};

export default connect(null, mapDispatchToProps)(TodoForm);
