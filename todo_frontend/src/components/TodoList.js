import React, { Component } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

class TodoList extends Component {

    state = {
        todos: [],
        status: 0 ,
        todoToShow: 'all',
        markAllComplete: false
    }

    getDataFromAPI = () => {
        const apiUrl = 'http://localhost:8000/api/todos'
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => this.setState({ todos: data.data }))
    }

    componentDidMount() {
        this.getDataFromAPI()
    }

    toggleComplete = (id) => {
        const apiUrl = `http://localhost:8000/api/todos/${id}/status`
        // ini kenapa pake map ya?
        // terus kalo pake redux, semua fetch harusnya sudah bukan di component lagi, tpi melalui redux thunk action
        // https://github.com/reduxjs/redux-thunk
        // map itu buat return state baru, di sini nda return apa" tpi malah redirect ke localhost:3000
        // Untuk toggle complete mengapa harus redirect? Harusnya tetep di satu page aja
        // Tujuan nya bikin pake SPA itu supaya nda ada full browser refresh. Klo mau urus routing, pake library kayak react-router
        // jangan modify window.location
        this.state.todos.map(todo => {
            
            if (todo.id === id) {
                fetch(apiUrl, {
                    method: 'PUT',
                    body: JSON.stringify({
                        complete: !todo.complete ? 1 : 0
                    }),
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    }
                })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 200) {
                         window.location.href = 'http://localhost:3000'
                    }
                }) 
            }
        })
    }

    // nama variable jangan 'x', yang lebih deskriptif biar org harus ga liat dulu code di bawah baru bisa ngerti.
    updateTodoToShow = (x) => {
        this.setState({
            todoToShow: x
        })
    }

    handleDelete = (id) => {
        // taruh di redux thunk action, ga perlu redirect
        const initUrl = 'http://localhost:8000/api/todos/'
        const apiUrl = initUrl.concat(id)
        fetch(apiUrl, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 200) {
                window.location.href = 'http://localhost:3000'
            }
        })

    }

    removeAllCompleteTodo = () => {
        this.setState({
            todos: this.state.todos.filter(todo => !todo.complete)
        })
    }

    markAllTodoAsComplete = () => {
        this.setState({
            todos: this.state.todos.map(todo => ({
                ...todo,
                complete: !this.state.markAllComplete
            })), 
            
            markAllComplete: !this.state.markAllComplete
    })
}

    render() {
        let todos = []

        if (this.state.todoToShow === 'all') {
            todos = this.state.todos
        } else if (this.state.todoToShow === 'active') {
            todos = this.state.todos.filter(todo => !todo.complete)
        } else if(this.state.todoToShow === 'complete') {
            todos = this.state.todos.filter(todo => todo.complete)
        }


        return (
            <div className="container sm mx-auto" style={{width: '450px'}}>
                <TodoForm  />
                <div className="bg-indigo-900 text-center py-4 lg:px-4 mb-4">
                    <div className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                        <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">{this.state.todos.filter(todo => !todo.complete).length}</span>
                        <span>Todo To Complete</span>
                    </div>
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <button 
                        className="bg-transparent hover:bg-blue-500 text-blue-700 mx-1 my-1 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent"
                        onClick={() => this.updateTodoToShow("all")} >Show All
                    </button>
                    <button 
                        className="bg-transparent hover:bg-indigo-500 text-indigo-700 mx-1 my-1 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent"
                        onClick={() => this.updateTodoToShow("active")} >Active
                    </button>
                    <button 
                        className="bg-transparent hover:bg-green-500 text-green-700 mx-1 my-1 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent"
                        onClick={() => this.updateTodoToShow("complete")} >Completed
                    </button>
                    {/* INi bisa pake && operator biar ga usah return null */}
                    {this.state.todos.some(todo => todo.complete) ? (
                        <button 
                            className="bg-transparent hover:bg-red-500 text-red-700 mx-1 my-1 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent"
                            onClick={this.removeAllCompleteTodo} >Remove Completed
                        </button>
                    ) : null }
                        <button 
                            className="bg-transparent hover:bg-blue-500 text-blue-700 mx-1 my-1 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent"
                            onClick={this.markAllTodoAsComplete}>Mark Completed 
                            </button>
                </div>
                {todos.map(todo => (
                    <Todo 
                        key={todo.id} 
                        todo={todo} 
                        toggleComplete={ () => this.toggleComplete(todo.id)}
                        onDelete={() => this.handleDelete(todo.id)} />
                ))}
            </div>
        );
    }
}

export default TodoList;