import short_id from "shortid";
import * as ACTIONS from "./todo-types";
import axios from "axios";

export const fetchTodosRequest = () => {
  return {
    type: ACTIONS.FETCH_TODOS_REQUEST,
  };
};

export const fetchTodosSuccess = (todos) => {
  return {
    type: ACTIONS.FETCH_TODOS_SUCCESS,
    payload: todos,
  };
};

export const fetchTodosFailure = (error) => {
  return {
    type: ACTIONS.FETCH_TODOS_FAILURE,
    payload: error,
  };
};

export const fetchTodos = () => {
  return function (dispatch) {
    dispatch(fetchTodosRequest());
    axios
      .get("http://localhost:8000/api/todos")
      .then((response) => {
        const todos = response.data;
        dispatch(fetchTodosSuccess(todos));
      })
      .catch((error) => {
        dispatch(fetchTodosFailure(error.message));
      });
  };
};

export const addTodo = (todo) => {
  return {
    type: ACTIONS.ADD_TODO,
    payload: { id: short_id.generate(), todo },
  };
};

export const deleteTodo = (id) => {
  return {
    type: ACTIONS.DELETE_TODO,
    payload: id,
  };
};
