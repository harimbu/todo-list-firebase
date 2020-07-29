import React from 'react';

const Todo = ({ todo }) => {
    return (
        <>
            <li>
                <div>
                    <input type='checkbox' />
                    <span>{todo.todo}</span>
                </div>
                <div className='btn_area'>
                    <button>수정</button>
                    <button>삭제</button>
                </div>
            </li>
        </>
    );
};

export default Todo;
