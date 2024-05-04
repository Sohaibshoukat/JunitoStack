import React from 'react'
import { cardsData } from '../../Data/HowToPageCardData'
import Card from './Card'

const IntegrationCards = () => {
  return (
    <>
      {/* Heading 2 */}
      <div className='  pt-20 pb-0 md:py-28 flex flex-col items-center justify-center gap-10 md:gap-20 w-[90%] md:w-[90%] xl:w-[80%] m-auto'>
        <h1 className='text-primary font-head text-4xl font-extrabold md:text-5xl uppercase text-center'>integration guides</h1>

        {/* Cards */}
        <div className='pb-24'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {cardsData.map((card, index) => (
              <Card key={index} cardData={card} />
            ))}
          </div>

        </div>
      </div>

    </>
  )
}

export default IntegrationCards
