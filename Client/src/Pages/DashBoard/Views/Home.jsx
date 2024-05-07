import React, { useContext, useEffect, useState } from 'react'
import TODOCart from '../../../Components/Dashboard/TODOCart'
import { FaUserFriends } from 'react-icons/fa'
import AlertContext from '../../../Context/Alert/AlertContext'
import { BaseURL } from '../../../Data/BaseURL'

const Home = () => {
  const ToDosData = [
    {
      Head: "Lorem Isomphere",
      Des: "IBDJ  BIEDOB I FVEO VEDVIOEDFI EFDBO EFVD",
      Potential: "Low",
      Date: "12 Nov 2022",
      subUser: [
        {
          img: "../Porp/User.png"
        },
        {
          img: "../Porp/User.png"
        },
        {
          img: "../Porp/User.png"
        },
        {
          img: "../Porp/User.png"
        }
      ]
    },
    {
      Head: "Lorem Isomphere",
      Des: "IBDJ  BIEDOB I FVEO VEDVIOEDFI EFDBO EFVD",
      Potential: "Medium",
      Date: "12 Nov 2022",
      subUser: [
        {
          img: "../Porp/User.png"
        },
        {
          img: "../Porp/User.png"
        },
        {
          img: "../Porp/User.png"
        },
        {
          img: "../Porp/User.png"
        },
        {
          img: "../Porp/User.png"
        },
        {
          img: "../Porp/User.png"
        },
      ]
    },
    {
      Head: "Lorem Isomphere",
      Des: "IBDJ  BIEDOB I FVEO VEDVIOEDFI EFDBO EFVD",
      Potential: "High",
      Date: "12 Nov 2022",
      subUser: [
        {
          img: "../Porp/User.png"
        },
        {
          img: "../Porp/User.png"
        },
        {
          img: "../Porp/User.png"
        },
        {
          img: "../Porp/User.png"
        },
        {
          img: "../Porp/User.png"
        },
        {
          img: "../Porp/User.png"
        },
      ]
    },
    {
      Head: "Lorem Isomphere",
      Des: "IBDJ  BIEDOB I FVEO VEDVIOEDFI EFDBO EFVD",
      Potential: "High",
      Date: "12 Nov 2022",
      subUser: [
        {
          img: "../Porp/User.png"
        },
        {
          img: "../Porp/User.png"
        },
        {
          img: "../Porp/User.png"
        },
        {
          img: "../Porp/User.png"
        },
        {
          img: "../Porp/User.png"
        },
        {
          img: "../Porp/User.png"
        },
      ]
    },
  ]

  const department = [
    {
      head: "HR",
      icon: "../BotIcons/hr.png"
    },
    {
      head: "Marketing",
      icon: "../BotIcons/marketing.png"
    },
    {
      head: "Vertrieb",
      icon: "../BotIcons/vertrieb.png"
    },
    {
      head: "Support",
      icon: "../BotIcons/support.png"
    },
    {
      head: "ToDos",
      icon: "../BotIcons/todo.png"
    },
    {
      head: "Sales",
      icon: "../BotIcons/sales.png"
    },
  ]

  const ChatsShared = [
    {
      Name: "john alley",
      Para: "lorem lipsum is just an dummy data.",
      Time: "1 Hour",
    },
    {
      Name: "john alley",
      Para: "lorem lipsum is just an dummy data.",
      Time: "1 Hour",
    },
    {
      Name: "john alley",
      Para: "lorem lipsum is just an dummy data.",
      Time: "1 Hour",
    },
    {
      Name: "john alley",
      Para: "lorem lipsum is just an dummy data.",
      Time: "1 Hour",
    },
    {
      Name: "john alley",
      Para: "lorem lipsum is just an dummy data.",
      Time: "1 Hour",
    },
  ]


  const toggleUserStatus = async (subuserId) => {
    try {
      const response = await fetch(`${BaseURL}/api/company/statusSubuser/${subuserId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token')
        }
      });
      const data = await response.json();
      if (response.ok) {
        showAlert('User status updated successfully', 'success');
        fetchUsers(); // Refresh the user list after status update
      } else {
        showAlert(data.message, 'danger');
      }
    } catch (error) {
      showAlert(error.message, 'danger');
    }
  };

  const [ModelOpen, setModelOpen] = useState(false)
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);
  const [promptday, setpromptday] = useState(null);

  const AletContext = useContext(AlertContext);
  const { showAlert } = AletContext;


  const fetchUsers = async () => {
    try {
      const response = await fetch(`${BaseURL}/api/company/subUsers/List`, {
        method: 'GET',
        headers: {
          'auth-token': localStorage.getItem('auth-token')
        }
      });
      const data = await response.json();
      if (response.ok) {
        setUsers(data.SubUsers);
      } else {
        showAlert(data.message, 'danger');
      }
    } catch (error) {
      showAlert(error.message, 'danger');
    }
  };


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

  const fetchPrompt = async () => {
    try {
      const response = await fetch(`${BaseURL}/api/company/promptofday`, {
        method: 'GET',
        headers: {
          'auth-token': localStorage.getItem('auth-token')
        }
      });
      const data = await response.json();
      if (response.ok) {
        setpromptday(data.prompt);
      } else {
        showAlert(data.message, 'danger');
      }
    } catch (error) {
      showAlert(error.message, 'danger');
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchTodos();
    fetchPrompt()
  }, []);

  return (
    <div className='w-[95%] m-auto pt-10 pb-20'>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-4">
        <div className="basis-[33.33%]">
          <div className="border-b-4 border-gray pb-4">
            <h2 className='text-gray font-para text-lg font-bold'>Shared Chats</h2>
          </div>
          <div className="flex my-6 font-para flex-col gap-4 max-h-80 overflow-y-scroll">
            {ChatsShared.map((item, index) => (
              <>
                <div className="flex gap-2 font-para cursor-pointer" onClick={() => { setModelOpen(!ModelOpen) }}>
                  <div className="bg-[#C248AD]/40 h-fit rounded-xl p-2 mr-2">
                    <FaUserFriends className='text-[#C248AD] text-xl' />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className='text-black font-bold'>{item.Name}</h2>
                    <p className='text-[#bababa] text-sm'>{item.Para}</p>
                  </div>
                  <p className='text-sm'>{item.Time}</p>
                </div>
                {ModelOpen &&
                  <div className="flex flex-row gap-2 px-4 font-para justify-between">
                    <button className='border-none w-full bg-pink-100 rounded-xl py-1 text-pink-500 font-bold'>Delete</button>
                    <button className='border-none w-full bg-emerald-100 rounded-xl py-1 text-emerald-600 font-bold'>Read</button>
                  </div>
                }
              </>
            ))}
          </div>
        </div>
        <div className="basis-[33.33%] ">
          <div className="border-b-4 font-para border-[#78C552] pb-4 flex justify-between items-center">
            <h2 className='text-gray text-lg font-bold'>ToDos</h2>
            <p className='text-gray font-semibold '>{ToDosData?.length}</p>
          </div>
          <div className="flex my-6 flex-col gap-2 max-h-80 overflow-y-scroll">
            {todos.map((item, index) => (
              <TODOCart item={item} key={index} fetchTodos={fetchTodos} />
            ))}
          </div>
        </div>
        <div className="basis-[33.33%] font-para">
          <div className="border-b-4 border-[#FFA048] pb-4">
            <h2 className='text-gray text-lg font-bold'>Categories</h2>
          </div>
          <div className="flex bg-white border-2 border-[#1C1D22]/10 rounded-xl py-4 px-4 my-6 flex-col gap-2 max-h-80 overflow-y-scroll">
            {department.map((item, index) => (
              <div className="flex flex-row items-center py-2 px-2 md:px-4 gap-3">
                <div className='bg-[#5458F7]/30 p-2 rounded-xl'>
                  <img src={item.icon} alt="" className='w-6 md:w-8 h-6 md:h-8' />
                </div>
                <h2 className='text-black font-para font-bold text-base md:text-lg'>{item.head}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="my-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="bg-white rounded-xl py-4 px-6 basis-[50%]">
            <h2 className='text-lg font-para font-bold'>All Users</h2>
            <div className="my-4">
              <div class="relative overflow-x-scoll">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-sm md:text-base font-normal uppercase text-slate-300">
                    <tr>
                      <th class="px-0 md:px-6 py-2 md:py-3">
                        User name
                      </th>
                      <th class="px-0 md:px-6 py-2 md:py-3">
                        Email
                      </th>
                      <th class="px-0 md:px-6 py-2 md:py-3">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users?.map((item, index) => (
                      <tr class="bg-white border-b font-medium text-sm md:text-base border-slate-200" key={index}>
                        <td class="px-0 md:px-6 py-2 md:py-4">
                          {item?.Own_ID?.FirstName + " " + item?.Own_ID?.LastName}
                        </td>
                        <td class="px-0 md:px-6 py-2 md:py-4">
                          {item?.Own_ID?.Email}
                        </td>
                        <td class="px-0 md:px-6 py-2 md:py-4">
                          <button
                            className={`flex w-max gap-1 font-medium ${item?.Own_ID?.Status == 'Active' ? "bg-[#16C098]/30 border-[#00B087] text-[#008767]" : "bg-[#FFC5C5] border-[#DF0404] text-[#DF0404]"} py-2 px-3 rounded-lg border-2 items-center`}
                            onClick={() => { toggleUserStatus(item._id) }}
                          >
                            {item?.Own_ID?.Status}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="basis-[50%] font-para">
            <div className="flex flex-col gap-2">
              <h2 className='text-lg font-para font-bold'>Prompt of the Day</h2>
              <p className='text-slate-400 text-sm'>{promptday?.Category}</p>
            </div>
            <div className="my-4 bg-white gap-6 flex flex-col md:flex-row rounded-xl py-4 px-6">
              <div className="flex flex-col gap-2 basis-[50%]">
                <h1 className='text-sm font-medium'>Prompt</h1>
                <p className='text-base font-bold'>{promptday?.Name}</p>
                <button className='bg-gray py-3 px-4 rounded-lg border-2 border-gray mt-4 text-white hover:bg-transparent hover:text-gray font-para ease-in-out duration-300 self-end float-right'>Read More</button>
              </div>
              <div className="rounded-full basis-[50%]">
                <img src="../promptemp.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home