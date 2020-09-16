import React from 'react';

function Todo(props) {
    return (

        <div style={{"display": "flex", "justifyContent": "start"}} className="flex items-center bg-gray-900 text-white text-sm px-4 py-2 my-1" role="alert">
            <button 
                className="bg-transparent hover:bg-green-500 text-green-700 mx-1 my-1 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent" 
                onClick={props.toggleComplete}> v 
            </button>

            <button
                className="bg-transparent hover:bg-red-500 text-red-700 mx-1 my-1 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent" 
                onClick={ props.onDelete }> x </button>
            <p className="mx-4" style={{ textDecoration: props.todo.complete ? "line-through" : ""}}> {props.todo.todo} </p>
            
        </div>
    );
}

export default Todo;