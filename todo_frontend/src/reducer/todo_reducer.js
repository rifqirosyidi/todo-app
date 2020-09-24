import React from "react";

const initState = {
  todos: [
    {
      id: 1,
      title: "View from the Top, A",
      body:
        "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. Phasellus in felis. Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo.",
    },
    {
      id: 2,
      title: "Wrestling Queens",
      body:
        "Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus.",
    },
  ],
};

// coba dilenkapi semua CRUD action nya
export default function rootReducer(state = initState, action) {
  switch (action.type) {
    case "DELETE_TODO":
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
