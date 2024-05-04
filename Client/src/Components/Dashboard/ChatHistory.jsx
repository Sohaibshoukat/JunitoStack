import React from 'react'

const ChatHistory = () => {

    const DataHistory=[
        {
            title:"Create a chatbot  using python language what will be step for that?",
            icon:"../Porp/Write.png"
        },
        {
            title:"Create a chatbot  using python language what will be step for that?",
            icon:"../Porp/Write.png"
        },
        {
            title:"Create a chatbot  using python language what will be step for that?",
            icon:"../Porp/Write.png"
        },
        {
            title:"Create a chatbot  using python language what will be step for that?",
            icon:"../Porp/Write.png"
        },
        {
            title:"Create a chatbot  using python language what will be step for that?",
            icon:"../Porp/Write.png"
        },
        {
            title:"Create a chatbot  using python language what will be step for that?",
            icon:"../Porp/Write.png"
        }
    ]

  return (
    <div className='gradientbg py-4 px-6 rounded-2xl'>
        <h2 className='font-para text-white font-bold text-lg mb-4'>History</h2>
        <div className="flex flex-col gap-4">
            {DataHistory.map((item,index)=>(
                <div className="bg-white py-3 px-4 rounded-xl gap-4 flex flex-row justify-between items-start cursor-pointer">
                    <h3 className='text-sm font-para text-black'>{item.title}</h3>
                    <img src={item.icon} alt="" className='w-4 h-4' />
                </div>
            ))}
        </div>
    </div>
  )
}

export default ChatHistory