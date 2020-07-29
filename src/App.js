import React, { useState, useEffect } from 'react';
import Todo from './components/Todo';
import './App.css';
import { fire, firebase } from './firebase';

function App() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');

    const onSubmit = e => {
        e.preventDefault();
        // setTodos([input, ...todos]);
        fire.firestore().collection('todos').add({
            todo: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        setInput('');
    };

    useEffect(() => {
        fire.firestore()
            .collection('todos')
            .orderBy('timestamp', 'desc')
            .get()
            .then(snapshot =>
                setTodos(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        todo: doc.data().todo
                    }))
                )
            );
    }, []);

    return (
        <div className='App'>
            <header>
                <h1>할 일 목록</h1>
                <p>React hooks 파이어베이스 연동 CRUD</p>
            </header>
            <form onSubmit={onSubmit}>
                <input
                    type='text'
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder='✅할 일은?'
                />
                <button type='submit'>입력</button>
            </form>
            <ul className='todo__list'>
                {todos.map(todo => (
                    <Todo todo={todo} key={todo.id} />
                ))}
            </ul>
        </div>
    );
}

export default App;
