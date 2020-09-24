import React from "react";
import * as ACTIONS from "../actions/actions";

const initState = {
  loading: false,
  todos: [],
  error: "",
};

export default function todoReducer(state = initState, action) {
  switch (action.type) {
    case ACTIONS.FETCH_TODOS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ACTIONS.FETCH_TODOS_SUCCESS:
      return {
        loading: false,
        todos: action.payload,
        error: "",
      };
    case ACTIONS.FETCH_TODOS_FAILURE:
      return {
        loading: false,
        todos: [],
        error: action.payload,
      };

    case ACTIONS.ADD_TODO:
      let todos = {
        id: action.payload.id,
        todo: action.payload.todo,
        complete: 0,
      };
      let addTodos = [...state, todos];
      return {
        ...state,
        todos: addTodos,
      };

    case ACTIONS.DELETE_TODO:
      let newTodos = state.todos.filter((todo) => {
        return action.payload != todo.id;
      });

      return {
        ...state,
        todos: newTodos,
      };
  }
  return state;
}
