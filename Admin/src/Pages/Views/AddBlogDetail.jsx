import React, { useContext, useEffect, useState } from 'react'
import AlertContext from '../../Context/Alert/AlertContext';
import { BaseURL } from '../../Data/BaseURL';
import { useParams } from 'react-router-dom';

const AddBlogDetail = () => {

  const [JsonDetail, setJsonDetail] = useState([])
  const [DropDown, setDropDown] = useState(false)

  const [IsSubmitting, setIsSubmitting] = useState(false)

  const [Blog, setBlog] = useState('')

  const alertcontext = useContext(AlertContext);
  const { showAlert } = alertcontext

  const { id } = useParams();


  async function fetchBlog() {
    try {
      const response = await fetch(`${BaseURL}/getBlog/${id}`, {
        headers: {
          "AdminODSToken": sessionStorage.getItem('AdminODSToken')
        },
      });
      if (!response.ok) {
        showAlert('Failed to fetch blog', 'danger');
      }
      const data = await response.json();
      setBlog(data.blog);
      setJsonDetail(data.blog.DetailBlog)
    } catch (error) {
      console.error(error.message, 'danger');
    }
  }

  useEffect(() => {
    fetchBlog();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${BaseURL}/updateBlog/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "AdminODSToken": sessionStorage.getItem('AdminODSToken')
        },
        body: JSON.stringify({
          DetailBlog: JsonDetail
        })
      });
      const data = await response.json();
      if (data.success) {
        // navigate(`/admin-dashboard/blogs-Detail/${data.Blog._id}`)
        showAlert('Blog Updated successfully', 'success');
      } else {
        // Handle error
        showAlert(data.message, 'danger');
      }
    } catch (error) {
      showAlert(error.message, 'danger');
    }
  };


  const handleInputChange = (index, fieldPath, value) => {
    const updatedJsonDetail = [...JsonDetail];
    // Split the fieldPath into an array of keys
    const keys = fieldPath.split('.');
    let nestedField = updatedJsonDetail[index];
    // Traverse the nested structure to reach the target field
    for (let i = 0; i < keys.length - 1; i++) {
      nestedField = nestedField[keys[i]];
    }
    // Update the target field
    nestedField[keys[keys.length - 1]] = value;
    setJsonDetail(updatedJsonDetail);
  };


  const handleImageChange = async (index, fieldPath, e) => {
    try {
      setIsSubmitting(true);
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('blogimg', file);

      const response = await fetch(`${BaseURL}/uploadimage`, {
        method: 'POST',
        headers: {
          "AdminODSToken": sessionStorage.getItem('AdminODSToken')
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        const updatedJsonDetail = [...JsonDetail];
        // Update the nested image field
        const keys = fieldPath.split('.');
        let nestedField = updatedJsonDetail[index];
        for (let i = 0; i < keys.length - 1; i++) {
          nestedField = nestedField[keys[i]];
        }
        nestedField[keys[keys.length - 1]] = data.url;
        setJsonDetail(updatedJsonDetail);
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      showAlert(data.message, 'danger');
    } catch (error) {
      setIsSubmitting(false);
      showAlert(error.message, 'danger');
    }
  };



  return (
    <div className="w-[95%] m-auto bg-white flex flex-col gap-4 py-6 px-6 my-6 rounded-xl shadow-2xl">
      <div className="flex flex-row justify-between items-center">
        <h1 className='font-head text-4xl tracking-wider'>Heading</h1>
        <div className="flex gap-2 flex-col md:flex-row">
          <a href={`/Preview-Detail/${id}`} target='_blank'>
            <button className={`py-3 px-10 rounded-3xl mb-4 text-base md:text-xl  bg-black text-white `}>Preview</button>
          </a>
          <button
            className={`py-3 px-10 rounded-3xl mb-4 text-base md:text-xl  bg-green-400 text-white ${IsSubmitting && 'bg-gray-700'}`}
            onClick={() => { handleSubmit() }}
            disabled={IsSubmitting}
          >
            Update
          </button>
        </div>
      </div>
      <div className='bg-black pt-4 group relative rounded-xl text-white font-Para w-fit '>
        <h2 className='text-center px-8 text-lg pb-4' onClick={() => { setDropDown(!DropDown) }}>Add Section</h2>
        <div className="bg-white hidden top-[100%]  absolute rounded-lg  w-fit shadow-boxshade group-hover:flex flex-col gap-2 font-Para text-black text-lg">
          <h3
            className='hover:bg-black hover:text-white px-8 py-2 ease-in-out duration-300 rounded-lg'
            onClick={() => {
              setJsonDetail([
                ...JsonDetail,
                {
                  Type: "Detail",
                  Heading: "",
                  Content: [""],
                  Image: ''
                }
              ])
            }}
          >
            Detail Section
          </h3>
          <h3
            className='hover:bg-black hover:text-white px-8 py-2 ease-in-out duration-300 rounded-lg'
            onClick={() => {
              setJsonDetail([
                ...JsonDetail,
                {
                  Type: "Image",
                  Image: "",
                  note: ""
                }
              ])
            }}
          >
            Image Section
          </h3>
          <h3
            className='hover:bg-black hover:text-white px-8 py-2 ease-in-out duration-300 rounded-lg'
            onClick={() => {
              setJsonDetail([
                ...JsonDetail,
                {
                  Type: "Steps",
                  Heading: "",
                  Data: [
                    {
                      head: "",
                      des: "",
                      image: ""
                    }
                  ]
                }
              ])
            }}
          >
            Step Section
          </h3>
        </div>
      </div>
      {/* {DropDown
        &&

      } */}
      <div className="flex flex-col gap-y-8">
        {JsonDetail?.map((item, index) => (
          <div className='' key={index}>
            {item.Type === 'Detail' && (
              <div className="flex flex-col gap-y-4 font-Para">
                <h1 className='text-xl md:text-3xl font-Para'>Detail Section</h1>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex flex-col gap-2 basis-[50%]">
                      <label htmlFor="" className='text-neutral-500 text-base md:text-xl'>Heading</label>
                      <input
                        type="text"
                        value={item.Heading}
                        onChange={(e) => handleInputChange(index, 'Heading', e.target.value)}
                        className='border-2 border-gray-300 py-2 px-4 rounded-lg h-[100%]'
                      />
                    </div>
                    <div className="flex flex-col gap-2 basis-[50%]">
                      <label htmlFor="" className='text-neutral-500 text-base md:text-xl'>Image</label>
                      <input
                        type="file"
                        // value={item.Image}
                        onChange={(e) => handleImageChange(index, 'Image', e)}
                        className='border-2 border-gray-300 py-2 px-4 rounded-lg'
                      />
                    </div>
                  </div>
                  {item.Content.map((item2, index2) => (
                    <div className="flex flex-col gap-2" key={index2}>
                      <label htmlFor="" className='text-neutral-500 text-base md:text-xl'>Paragraph</label>
                      <textarea
                        name=""
                        id=""
                        cols="30"
                        value={item2}
                        onChange={(e) => {
                          const updatedContent = [...item.Content];
                          updatedContent[index2] = e.target.value;
                          const updatedJsonDetail = [...JsonDetail];
                          updatedJsonDetail[index].Content = updatedContent;
                          setJsonDetail(updatedJsonDetail);
                        }}
                        rows="5"
                        className='border-2 border-gray-300 py-2 px-4 rounded-lg'
                      />
                    </div>
                  ))}
                  <button
                    className='bg-green-400 py-4 w-[100%] text-white font-bold rounded-full'
                    onClick={() => {
                      const updatedJsonDetail = [...JsonDetail];
                      updatedJsonDetail[index].Content.push('');
                      setJsonDetail(updatedJsonDetail);
                    }}
                  >
                    Add Paragraph
                  </button>
                </div>
              </div>
            )}

            {/* Image Section */}
            {item.Type === 'Image' && (
              <div className="flex flex-col gap-y-4 font-Para">
                <h1 className='text-xl md:text-3xl font-Para'>Image Section</h1>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex flex-col gap-2 basis-[50%]">
                      <label htmlFor="" className='text-neutral-500 text-base md:text-xl'>Image</label>
                      <input
                        type="file"
                        // value={item.Image}
                        onChange={(e) => handleImageChange(index, 'Image', e)}
                        className='border-2 border-gray-300 py-2 px-4 rounded-lg'
                      />
                    </div>
                    <div className="flex flex-col gap-2 basis-[50%]">
                      <label htmlFor="" className='text-neutral-500 text-base md:text-xl'>Note</label>
                      <input
                        type="text"
                        value={item.note}
                        onChange={(e) => handleInputChange(index, 'note', e.target.value)}
                        className='border-2 border-gray-300 py-2 px-4 rounded-lg h-[100%]'
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step Section */}
            {item.Type === 'Steps' && (
              <div className="flex flex-col gap-y-4 font-Para">
                <h1 className='text-xl md:text-3xl font-Para'>Step Section</h1>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex flex-col gap-2 basis-[50%]">
                      <label htmlFor="" className='text-neutral-500 text-base md:text-xl'>Main Heading</label>
                      <input
                        type="text"
                        value={item.Heading}
                        onChange={(e) => handleInputChange(index, 'Heading', e.target.value)}
                        className='border-2 border-gray-300 py-2 px-4 rounded-lg h-[100%]'
                      />
                    </div>
                  </div>
                  {item.Data.map((item2, index2) => (
                    <div className="flex flex-col gap-2 font-Para my-4" key={index2}>
                      <h2 className='text-black text-xl font-bold'>Step {index2 + 1}</h2>
                      <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex flex-col gap-2 basis-[50%]">
                          <label htmlFor="" className='text-neutral-500 text-base md:text-xl'>Heading</label>
                          <input
                            type="text"
                            value={item2.head}
                            onChange={(e) => handleInputChange(index, `Data.${index2}.head`, e.target.value)}
                            className='border-2 border-gray-300 py-2 px-4 rounded-lg h-[100%]'
                          />
                        </div>
                        <div className="flex flex-col gap-2 basis-[50%]">
                          <label htmlFor="" className='text-neutral-500 text-base md:text-xl'>Image</label>
                          <input
                            type="file"
                            // value={item2.image}
                            onChange={(e) => handleImageChange(index, `Data.${index2}.image`, e)}
                            // onChange={(e) => handleInputChange(index, `Data.${index2}.image`, e.target.value)}
                            className='border-2 border-gray-300 py-2 px-4 rounded-lg'
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="" className='text-neutral-500 text-base md:text-xl'>Paragraph</label>
                        <textarea
                          name=""
                          id=""
                          cols="30"
                          value={item2.des}
                          onChange={(e) => handleInputChange(index, `Data.${index2}.des`, e.target.value)}
                          rows="5"
                          className='border-2 border-gray-300 py-2 px-4 rounded-lg'
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    className='bg-green-400 py-4 w-[100%] text-white font-bold rounded-full'
                    onClick={() => {
                      const updatedJsonDetail = [...JsonDetail];
                      updatedJsonDetail[index].Data.push({
                        head: "",
                        des: "",
                        image: ""
                      });
                      setJsonDetail(updatedJsonDetail);
                    }}
                  >
                    Add Step
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* <div className="flex flex-row justify-between items-center">
        <h1 className='font-head text-4xl tracking-wider'>Heading</h1>
        <div className="flex gap-2 flex-col md:flex-row">
          <button className={`py-3 px-10 rounded-3xl mb-4 text-base md:text-xl  bg-black text-white `}>Preview</button>
          <button
            className={`py-3 px-10 rounded-3xl mb-4 text-base md:text-xl  bg-green-400 text-white `}
            onClick={() => { handleSubmit() }}
          >
            Update
          </button>
        </div>
      </div>
      <div className='bg-black pt-4 group relative rounded-xl text-white font-Para w-fit '>
        <h2 className='text-center px-8 text-lg pb-4' onClick={() => { setDropDown(!DropDown) }}>Add Section</h2>
        <div className="bg-white hidden top-[100%]  absolute rounded-lg  w-fit shadow-boxshade group-hover:flex flex-col gap-2 font-Para text-black text-lg">
          <h3
            className='hover:bg-black hover:text-white px-8 py-2 ease-in-out duration-300 rounded-lg'
            onClick={() => {
              setJsonDetail([
                ...JsonDetail,
                {
                  Type: "Detail",
                  Heading: "",
                  Content: [""],
                  Image: ''
                }
              ])
            }}
          >
            Detail Section
          </h3>
          <h3
            className='hover:bg-black hover:text-white px-8 py-2 ease-in-out duration-300 rounded-lg'
            onClick={() => {
              setJsonDetail([
                ...JsonDetail,
                {
                  Type: "Image",
                  Image: "",
                  note: ""
                }
              ])
            }}
          >
            Image Section
          </h3>
          <h3
            className='hover:bg-black hover:text-white px-8 py-2 ease-in-out duration-300 rounded-lg'
            onClick={() => {
              setJsonDetail([
                ...JsonDetail,
                {
                  Type: "Steps",
                  Heading: "",
                  Data: [
                    {
                      head: "",
                      des: "",
                      image: ""
                    }
                  ]
                }
              ])
            }}
          >
            Step Section
          </h3>
        </div>
      </div> */}
    </div >
  );
}

export default AddBlogDetail;