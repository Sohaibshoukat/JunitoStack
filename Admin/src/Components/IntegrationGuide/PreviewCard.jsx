import React from 'react'

const PreviewCard = ({
  content,
  title,
  Image
}) => {
  return (
    <div className='bg-[url(/assets/bgImage.png)] xl:p-14 p-4 lg:m-4 m-2 flex items-center justify-center'>

      <div
        className="bg-black w-full max-w-sm bg-primary group py-6 px-4 rounded-md shadow-black shadow-md relative cursor-pointer border border-black hover:bg-white ease-in-out duration-300 group-hover:text-black "
      >
        <div className="flex flex-col items-center pb-2">
          <img
            className="w-[75px] h-[75px] mb-3 rounded-full "
            src={Image}
            alt="Image"
          />
        </div>
        <div>
          <h5 className="mb-2 text-3xl md:text-4xl font-bold  group-hover:text-black ease-in-out duration-300 text-white text-center uppercase font-head">
            {title}
          </h5>
          <p className=" mb-3 font-para text-base md:text-lg font-normal group-hover:text-black ease-in-out duration-300 text-white text-center">
            {content}
          </p>

        </div>
      </div>

    </div>
  )
}

export default PreviewCard
