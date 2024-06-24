import React, { useState, useEffect, useContext } from 'react';
import Blog from '../../Components/Blog/Blog';
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineModeEdit } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { BaseURL } from '../../Data/BaseURL';
import AlertContext from '../../Context/Alert/AlertContext';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]); // State to store fetched blogs
  const [selected, setSelected] = useState(false);
  const [selectedID, setSelectedID] = useState(null);
  const navigate = useNavigate();

  const alertcontext = useContext(AlertContext);
  const { showAlert } = alertcontext

  async function fetchBlogs() {
    try {
      const response = await fetch(`${BaseURL}/getBlogs`,{
        headers: {
          "AdminODSToken": sessionStorage.getItem('AdminODSToken')
      },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }
      const data = await response.json();
      setBlogs(data.blogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []); 

  const handleDeleteblog = async (id) => {
    try {
      const response = await fetch(`${BaseURL}/deleteBlog/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "AdminODSToken": sessionStorage.getItem('AdminODSToken')
        }
      });
      const data = await response.json();
      if (response.ok) {
        showAlert('Blog Deleted Successfully', 'success');
        fetchBlogs();
        setSelected(false)
        setSelectedID(null)
      } else {
        showAlert(data.message, 'danger');
      }
    } catch (error) {
      showAlert(error.message, 'danger');
    }
  };

  return (
    <div className='flex flex-col-reverse xl:flex-row lg:py-10 p-2 m-5 md:m-10 rounded-2xl shadow-boxshade '>
      <div className='lg:w-[80%] overflow-y-auto lg:px-4 px-2'>
        {blogs?.length > 0 ? blogs?.map((blog, index) => (
          <div key={index} onClick={() => {
            setSelected(true);
            setSelectedID(blog._id); // Assuming your blog object has an "_id" property
          }}>
            <Blog
              title={blog.Title}
              date={blog.Date}
              image={blog.Image}
              IDSelected={selectedID === blog._id}
              IDindex={blog._id}
            />
          </div>
        )) : <h1 className='font-Para text-xl'>
            No Blog Created Till Now
        </h1>}
      </div>

      <div className='flex-col mx-auto p-4 xl:border-l md:w-[40%] xl:w-[20%] md:border-darkgray'>
        <div className='bg-[#4DB678] flex justify-between items-center rounded-3xl pl-3 md:pl-5 pr-2 h-19  hover:bg-[#2d6f49] my-4 gap-2' onClick={() => {
          navigate('/admin-dashboard/create-blogs')
        }}>
          <div className='text-secondary font-bold lg:text-base cursor-pointer sm:text-sm my-3 ml-4'>Ceate New</div>
          <IoMdAdd className='text-secondary font-bold sm md:text-lg  p-2 my-1 bg-[#2A6B45] rounded-full h-full w-8 md:w-10' />
        </div>
        <div className={`${selected ? "block" : "hidden"}`}>
          <div className='bg-[#285F86] flex justify-between cursor-pointer items-center rounded-3xl pl-3 md:pl-5 pr-2 h-19  hover:bg-[#30546c] my-4 gap-2' onClick={() => {
            navigate(`/admin-dashboard/edit-blogs/${selectedID}`)
          }}>
            <div className='text-secondary font-bold lg:text-base sm:text-sm my-3 ml-4'>Edit</div>
            <MdOutlineModeEdit className='text-secondary font-bold sm md:text-lg  p-2 my-1 bg-[#1C95EB] rounded-full h-full w-8 md:w-10' />
          </div>
          <div className=' text-[#979797] cursor-pointer flex items-center m-2 font-bold hover:text-gray-600' onClick={()=>{handleDeleteblog(selectedID)}}>
            <MdDelete className='text-red text-xl mx-2' />
            Delete
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
