import React from 'react'
import Analytics from '../../Components/Dashboard/Analytics'
import FormsAna from '../../Components/Dashboard/FormsAna'
import PlanAna from '../../Components/Dashboard/PlanAna'
import UserAna from '../../Components/Dashboard/UserAna'
import User from '../../Components/Dashboard/User'
import Email from '../../Components/Dashboard/Email'

const Home = () => {
  return (
    <div className="w-[95%] m-auto flex flex-col gap-6 py-5 lg:py-10">

      <div className="flex flex-col 2xl:flex-row gap-8">
        <div className="lg:basis-[50%] h-auto">
          <Analytics/>
        </div>
        <div className="lg:basis-[50%]">
          <FormsAna/>
        </div>
      </div>
      
      <div className="flex flex-col xl:flex-row gap-4">
        <div className="lg:basis-[60%] h-auto">
          <User />
        </div>
        <div className="lg:basis-[40%] h-auto">
          <Email />
        </div>
      </div>

    </div>
  )
}

export default Home