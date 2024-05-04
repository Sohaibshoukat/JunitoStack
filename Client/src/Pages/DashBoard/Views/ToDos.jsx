import React from 'react'
import TODOCart from '../../../Components/Dashboard/TODOCart'

const ToDos = () => {

    const ToDosData = [
        {
            Head:"Lorem Isomphere",
            Des:"IBDJ  BIEDOB I FVEO VEDVIOEDFI EFDBO EFVD",
            Potential:"Low",
            Date:"12 Nov 2022",
            subUser:[
                {
                    img:"../Porp/User.png"
                },
                {
                    img:"../Porp/User.png"
                },
                {
                    img:"../Porp/User.png"
                },
                {
                    img:"../Porp/User.png"
                }
            ]
        },
        {
            Head:"Lorem Isomphere",
            Des:"IBDJ  BIEDOB I FVEO VEDVIOEDFI EFDBO EFVD",
            Potential:"Medium",
            Date:"12 Nov 2022",
            subUser:[
                {
                    img:"../Porp/User.png"
                },
                {
                    img:"../Porp/User.png"
                },
                {
                    img:"../Porp/User.png"
                },
                {
                    img:"../Porp/User.png"
                },
                {
                    img:"../Porp/User.png"
                },
                {
                    img:"../Porp/User.png"
                },
            ]
        },
        {
            Head:"Lorem Isomphere",
            Des:"IBDJ  BIEDOB I FVEO VEDVIOEDFI EFDBO EFVD",
            Potential:"High",
            Date:"12 Nov 2022",
            subUser:[
                {
                    img:"../Porp/User.png"
                },
                {
                    img:"../Porp/User.png"
                },
                {
                    img:"../Porp/User.png"
                },
                {
                    img:"../Porp/User.png"
                },
                {
                    img:"../Porp/User.png"
                },
                {
                    img:"../Porp/User.png"
                },
            ]
        },
        {
            Head:"Lorem Isomphere",
            Des:"IBDJ  BIEDOB I FVEO VEDVIOEDFI EFDBO EFVD",
            Potential:"High",
            Date:"12 Nov 2022",
            subUser:[
                {
                    img:"../Porp/User.png"
                },
                {
                    img:"../Porp/User.png"
                },
                {
                    img:"../Porp/User.png"
                },
                {
                    img:"../Porp/User.png"
                },
                {
                    img:"../Porp/User.png"
                },
                {
                    img:"../Porp/User.png"
                },
            ]
        },
        {
            Head:"Lorem Isomphere",
            Des:"IBDJ  BIEDOB I FVEO VEDVIOEDFI EFDBO EFVD",
            Potential:"High",
            Date:"12 Nov 2022",
            subUser:[
                {
                    img:"../Porp/User.png"
                },
                {
                    img:"../Porp/User.png"
                },
                {
                    img:"../Porp/User.png"
                },
                {
                    img:"../Porp/User.png"
                },
                {
                    img:"../Porp/User.png"
                },
                {
                    img:"../Porp/User.png"
                },
            ]
        },
        {
            Head:"Lorem Isomphere",
            Des:"IBDJ  BIEDOB I FVEO VEDVIOEDFI EFDBO EFVD",
            Potential:"High",
            Date:"12 Nov 2022",
            subUser:[
                {
                    img:"../Porp/User.png"
                },
                {
                    img:"../Porp/User.png"
                },
                {
                    img:"../Porp/User.png"
                },
                {
                    img:"../Porp/User.png"
                },
                {
                    img:"../Porp/User.png"
                },
                {
                    img:"../Porp/User.png"
                },
            ]
        },
        {
            Head:"Lorem Isomphere",
            Des:"IBDJ  BIEDOB I FVEO VEDVIOEDFI EFDBO EFVD",
            Potential:"High",
            Date:"12 Nov 2022",
            subUser:[
                {
                    img:"../Porp/User.png"
                },
                {
                    img:"../Porp/User.png"
                },
                {
                    img:"../Porp/User.png"
                },
                {
                    img:"../Porp/User.png"
                },
                {
                    img:"../Porp/User.png"
                },
                {
                    img:"../Porp/User.png"
                },
            ]
        },
        {
            Head:"Lorem Isomphere",
            Des:"IBDJ  BIEDOB I FVEO VEDVIOEDFI EFDBO EFVD",
            Potential:"High",
            Date:"12 Nov 2022",
            subUser:[
                {
                    img:"../Porp/User.png"
                },
                {
                    img:"../Porp/User.png"
                },
                {
                    img:"../Porp/User.png"
                },
                {
                    img:"../Porp/User.png"
                },
                {
                    img:"../Porp/User.png"
                },
                {
                    img:"../Porp/User.png"
                },
            ]
        },
        {
            Head:"Lorem Isomphere",
            Des:"IBDJ  BIEDOB I FVEO VEDVIOEDFI EFDBO EFVD",
            Potential:"High",
            Date:"12 Nov 2022",
            subUser:[
                {
                    img:"../Porp/User.png"
                },
                {
                    img:"../Porp/User.png"
                },
                {
                    img:"../Porp/User.png"
                },
                {
                    img:"../Porp/User.png"
                },
                {
                    img:"../Porp/User.png"
                },
                {
                    img:"../Porp/User.png"
                },
            ]
        },
        {
            Head:"Lorem Isomphere",
            Des:"IBDJ  BIEDOB I FVEO VEDVIOEDFI EFDBO EFVD",
            Potential:"High",
            Date:"12 Nov 2022",
            subUser:[
                {
                    img:"../Porp/User.png"
                },
                {
                    img:"../Porp/User.png"
                },
                {
                    img:"../Porp/User.png"
                },
                {
                    img:"../Porp/User.png"
                },
                {
                    img:"../Porp/User.png"
                },
                {
                    img:"../Porp/User.png"
                },
            ]
        },
    ]

    return (
        <div className='w-[95%] pt-10 pb-20 lg:w-[90%] font-para m-auto'>
            <div className="bg-white rounded-lg shadow-shadow2 py-2 md:py-4 px-2 md:px-6">
                <h2 className='text-gray text-lg font-bold'>ToDo</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-6 my-6">
                    {ToDosData.map((item,index)=>(
                        <TODOCart item={item} key={index}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ToDos