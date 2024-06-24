import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { BaseURL } from '../../Data/BaseURL';
import AlertContext from '../../Context/Alert/AlertContext';

const BlogPreview = () => {
    const { id } = useParams();
    const [Blog, setBlog] = useState('')
    const [JsonDetail, setJsonDetail] = useState([])


    const alertcontext = useContext(AlertContext);
    const { showAlert } = alertcontext

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
    return (
        <div className="w-[95%] md:w-[90%] lg:w-[80%] m-auto my-10 mb-20">
            <div className="flex flex-col gap-y-8">
                {JsonDetail.map((item, index) => (
                    <>
                        {
                            item.Type == "Detail" ?
                                <>
                                    <div className="flex flex-col gap-y-4">
                                        <h1 className='text-3xl md:text-4xl font-head '>{item?.Heading}</h1>
                                        <div className='relative how-it-item__content'>
                                            <span className='point point_start'></span>
                                            <p className='font-Para text-base md:text-lg'>{item?.Content}</p>
                                            <span className='point point_end'></span>
                                        </div>
                                        {item?.Image && <div>
                                            <img src={item.Image} alt="" className='w-[50%] h-[50%]' />
                                        </div>}
                                    </div>
                                </>
                                : item.Type == "Image" ?
                                    <>
                                        <div className="flex flex-col gap-y-4">
                                            <h1 className='text-3xl md:text-4xl font-head'>{item?.Heading}</h1>
                                            <div className='mx-10 md:w-[90%] m-auto'>
                                                <img src={item.Image} alt="" className='rounded-lg w-[50%] h-[50%]'  />
                                                <h2 className='text-base md:text-lg font-normal'>*{item?.note}</h2>
                                            </div>
                                        </div>
                                    </>
                                    : item.Type == "Steps" ?
                                        <>
                                            <div className="flex flex-col gap-y-4">
                                                <h1 className='text-3xl md:text-4xl font-head '>{item?.Heading}</h1>
                                                <div className='flex flex-col gap-y-0'>
                                                    {item?.Data.map((item2, index2) => (
                                                        <div className='relative step-item pb-20'>
                                                            <span className='step'>{index2 + 1}</span>
                                                            <div>
                                                                <h2 className='text-xl md:text-2xl font-bold font-Para'>{item2.head}</h2>
                                                                <p className='text-base md:text-lg font-normal font-Para mb-8'>{item2.des}</p>
                                                                <div>
                                                                    <img src={item2.image} alt="" className='w-[50%] h-[50%]' />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                        :
                                        <></>
                        }
                    </>
                ))}
            </div>
        </div>
    )
}

export default BlogPreview