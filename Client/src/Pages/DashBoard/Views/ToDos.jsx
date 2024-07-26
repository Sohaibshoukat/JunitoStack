import React, { useContext, useEffect, useState } from 'react';
import TODOCart from '../../../Components/Dashboard/TODOCart';
import AlertContext from '../../../Context/Alert/AlertContext';
import { BaseURL } from '../../../Data/BaseURL';
import TODOModel from '../../../Components/Dashboard/TODOModel';

const ToDos = () => {
    const [todos, setTodos] = useState([]);
    const [ModelTODO, setModelTODO] = useState(false);
    const [filter, setFilter] = useState('all');
    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;

    const fetchTodos = async () => {
        try {
            const response = await fetch(`${BaseURL}/api/chat/todos`, {
                method: 'GET',
                headers: {
                    'auth-token': localStorage.getItem('auth-token')
                }
            });
            const data = await response.json();
            if (response.ok) {
                setTodos(data.todos);
            } else {
                showAlert(data.message, 'danger');
            }
        } catch (error) {
            showAlert(error.message, 'danger');
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    useEffect(() => {
        if (!ModelTODO) {
            fetchTodos();
        }
    }, [ModelTODO]);

    const filterTodos = (todos, filter) => {
        const now = new Date();
        switch (filter) {
            case 'overdue':
                return todos.filter(todo => {
                    console.log(new Date(todo.Deadline))
                    return new Date(todo.Deadline) < now && !todo.completed
                });
            case 'pending':
                return todos.filter(todo => new Date(todo.Deadline) >= now && !todo.completed);
            default:
                return todos;
        }
    };

    const filteredTodos = filterTodos(todos, filter);

    return (
        <>
            <TODOModel ModelTODO={ModelTODO} setModelTODO={setModelTODO} />
            <div className='w-[95%] pt-10 pb-20 lg:w-[90%] font-para m-auto'>
                <div className="bg-white rounded-lg shadow-shadow2 py-2 md:py-4 px-2 md:px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <h2 className='text-gray text-lg font-bold'>ToDo</h2>
                        <div className="flex items-center gap-4">
                            <select
                                name="filter"
                                id="filter"
                                value={filter}
                                className='border-2 border-gray rounded-xl py-2 px-2 text-gray font-para font-medium'
                                onChange={(e) => setFilter(e.target.value)}
                            >
                                <option value="all">All ToDo's</option>
                                <option value="overdue">Overdue ToDo's</option>
                                <option value="pending">Pending ToDo's</option>
                            </select>
                            <button
                                className='bg-gray py-2 px-4 rounded-lg border-2 border-gray hover:bg-transparent text-white hover:text-gray ease-in-out duration-300'
                                onClick={() => { setModelTODO(true); }}
                            >
                                Add Todo
                            </button>
                        </div>
                    </div>
                    {filteredTodos == null ?
                        <div className='flex justify-center font-para text-xl font-medium uppercase'>
                            <img src="../../Loading.gif" alt="Loading..." className='w-24 h-24' />
                        </div> :
                        filteredTodos?.length > 0
                            ? <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-6 my-6">
                                {filteredTodos.map((item, index) => (
                                    <TODOCart item={item} key={index} fetchTodos={fetchTodos} />
                                ))}
                            </div> :
                            <div className='flex justify-center font-para text-xl font-medium uppercase'>
                                <h2>No Todo's</h2>
                            </div>
                    }
                </div>
            </div>
        </>
    );
};

export default ToDos;
