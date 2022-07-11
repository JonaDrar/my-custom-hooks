import React, { useEffect, useReducer } from 'react';
import { todoReducer } from './todoReducer';

const init = () => {
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    return todos || [];
};

export const useTodos = () => {


    const [todos, dispatchTodo] = useReducer(todoReducer,[], init);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));

    }, [todos]);

    const handleAddTodo = (todo) => {
        dispatchTodo({
            type: 'ADD_TODO',
            payload: todo,
        });
    };

    const handleDeleteTodo = (id) => {
        dispatchTodo({
            type: 'REMOVE_TODO',
            payload: id,
        });
    };

    const handleToggleTodo = (id) => {
        dispatchTodo({
            type: 'TOGGLE_TODO',
            payload: id,
        });
    };

    const todosCount = todos.length;
    const pendingTodosCount = todos.filter(todo => !todo.done).length;

    return {
        todos,
        handleAddTodo,
        handleDeleteTodo,
        handleToggleTodo,
        todosCount,
        pendingTodosCount,
    };
};