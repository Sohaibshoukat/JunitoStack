import React from 'react'

const SharedChat = () => {

    const Chats=[
        {
            Heading:"Heading",
            des:"Lorem ipsum dolor sit amet consectetur. At in in pharetra imperdiet proin orci. Quam habitant porta rhoncus viverra elementum ac pulvinar sit arcu. Justo et purus sed egestas dictum senectus cursus risus sed. Nullam libero in id cursus porttitor ipsum orci."
        },
        {
            Heading:"Heading",
            des:"Lorem ipsum dolor sit amet consectetur. At in in pharetra imperdiet proin orci. Quam habitant porta rhoncus viverra elementum ac pulvinar sit arcu. Justo et purus sed egestas dictum senectus cursus risus sed. Nullam libero in id cursus porttitor ipsum orci."
        },
        {
            Heading:"Heading",
            des:"Lorem ipsum dolor sit amet consectetur. At in in pharetra imperdiet proin orci. Quam habitant porta rhoncus viverra elementum ac pulvinar sit arcu. Justo et purus sed egestas dictum senectus cursus risus sed. Nullam libero in id cursus porttitor ipsum orci."
        },
        {
            Heading:"Heading",
            des:"Lorem ipsum dolor sit amet consectetur. At in in pharetra imperdiet proin orci. Quam habitant porta rhoncus viverra elementum ac pulvinar sit arcu. Justo et purus sed egestas dictum senectus cursus risus sed. Nullam libero in id cursus porttitor ipsum orci."
        },
        {
            Heading:"Heading",
            des:"Lorem ipsum dolor sit amet consectetur. At in in pharetra imperdiet proin orci. Quam habitant porta rhoncus viverra elementum ac pulvinar sit arcu. Justo et purus sed egestas dictum senectus cursus risus sed. Nullam libero in id cursus porttitor ipsum orci."
        },
        {
            Heading:"Heading",
            des:"Lorem ipsum dolor sit amet consectetur. At in in pharetra imperdiet proin orci. Quam habitant porta rhoncus viverra elementum ac pulvinar sit arcu. Justo et purus sed egestas dictum senectus cursus risus sed. Nullam libero in id cursus porttitor ipsum orci."
        },
        {
            Heading:"Heading",
            des:"Lorem ipsum dolor sit amet consectetur. At in in pharetra imperdiet proin orci. Quam habitant porta rhoncus viverra elementum ac pulvinar sit arcu. Justo et purus sed egestas dictum senectus cursus risus sed. Nullam libero in id cursus porttitor ipsum orci."
        },
        {
            Heading:"Heading",
            des:"Lorem ipsum dolor sit amet consectetur. At in in pharetra imperdiet proin orci. Quam habitant porta rhoncus viverra elementum ac pulvinar sit arcu. Justo et purus sed egestas dictum senectus cursus risus sed. Nullam libero in id cursus porttitor ipsum orci."
        },
        {
            Heading:"Heading",
            des:"Lorem ipsum dolor sit amet consectetur. At in in pharetra imperdiet proin orci. Quam habitant porta rhoncus viverra elementum ac pulvinar sit arcu. Justo et purus sed egestas dictum senectus cursus risus sed. Nullam libero in id cursus porttitor ipsum orci."
        }        
    ]

    return (
        <div className='w-[90%] pb-20 m-auto'>
            <div className='grid grid-cols-1 my-10 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 w-[90%] lg:w-[80%] m-auto'>
                {Chats.map((item, index) => (
                    <div className={`flex flex-row group items-center gap-3 font-para py-2 md:py-4 px-3 md:px-6 bg-white rounded-2xl shadow-shadow3 ease-in-out duration-300`} key={index}>
                        <div className="flex flex-col text-gray gap-2 ease-in-out duration-300">
                            <h2 className='text-lg md:text-xl font-bold'>{item.Heading}</h2>
                            <p className='text-xsm md:text-sm'>{item.des}</p>
                            <button
                                className='bg-[#7FA084] py-2 px-4 rounded-lg border-2 border-[#7FA084] text-white hover:bg-transparent hover:text-[#7FA084] font-para ease-in-out duration-300 w-fit'
                            >
                                View
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SharedChat