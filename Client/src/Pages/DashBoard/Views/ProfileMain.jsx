import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import ProfilePage from './Profile'
import Setting from './Setting'
import Company from './Company'

const Main = () => {
    return (
        <div className='w-[90%] xl:w-[70%] my-10 bg-white m-auto rounded-lg shadow-cartshadow py-2 px-4'>
            <div className="border-b-2 font-para border-darkgray flex gap-4 items-center">
                <Link to={"/dashboard/setting/"}>
                    <h2 className={`py-4 font-medium border-b-2 ${location.pathname === "/dashboard/setting/" ? "border-black" : "border-transparent"}`}>Account Setting</h2>
                </Link>
                <Link to={"/dashboard/setting/password"}>
                    <h2 className={`py-4 font-medium border-b-2 ${location.pathname === "/dashboard/setting/password" ? "border-black" : "border-transparent"}`}>Change Password</h2>
                </Link>
                <Link to={"/dashboard/setting/company"}>
                    <h2 className={`py-4 font-medium border-b-2 ${location.pathname === "/dashboard/setting/company" ? "border-black" : "border-transparent"}`}>Company</h2>
                </Link>
            </div>
            <div>
                <Routes>
                    <Route
                        path="/"
                        element={<ProfilePage />}>
                    </Route>
                    <Route
                        path="/password"
                        element={<Setting />}>
                    </Route>
                    <Route
                        path="/company"
                        element={<Company />}>
                    </Route>
                </Routes>
            </div>
        </div>
    )
}

export default Main