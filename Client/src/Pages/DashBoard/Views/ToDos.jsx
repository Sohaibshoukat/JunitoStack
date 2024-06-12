import React, { useContext, useEffect, useState } from 'react';
import TODOCart from '../../../Components/Dashboard/TODOCart';
import AlertContext from '../../../Context/Alert/AlertContext';
import { BaseURL } from '../../../Data/BaseURL';
import TODOModel from '../../../Components/Dashboard/TODOModel';

const ToDos = () => {
    const [todos, setTodos] = useState([]);
    const [ModelTODO, setModelTODO] = useState(false)
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
        if(!ModelTODO){
            fetchTodos();
        }
    }, [ModelTODO]);

    return (
        <>
        <TODOModel ModelTODO={ModelTODO} setModelTODO={setModelTODO} />
        <div className='w-[95%] pt-10 pb-20 lg:w-[90%] font-para m-auto'>
            <div className="bg-white rounded-lg shadow-shadow2 py-2 md:py-4 px-2 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <h2 className='text-gray text-lg font-bold'>ToDo</h2>
                    <button
                        className='bg-gray py-2 px-4 rounded-lg border-2 border-gray hover:bg-transparent text-white hover:text-gray ease-in-out duration-300'
                        onClick={()=>{setModelTODO(true)}}
                    >
                        Add Todo
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-6 my-6">
                    {todos.map((item, index) => (
                        <TODOCart item={item} key={index} fetchTodos={fetchTodos} />
                    ))}
                </div>
            </div>
        </div>
        </>
    );
};

export default ToDos;
