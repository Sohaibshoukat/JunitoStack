import React, { useState, useEffect, useContext } from 'react';
import { FaCamera } from "react-icons/fa";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import AlertContext from '../../Context/Alert/AlertContext';
import { BaseURL } from '../../Data/BaseURL';

const AdminForm = () => {
    const [adminData, setAdminData] = useState(null);
    const [Image, setImage] = useState('');
    const [ImageSet, setImageSet] = useState(null);

    const alertcontext = useContext(AlertContext);
    const { showAlert } = alertcontext;

    const fetchAdminData = async () => {
        try {
            const response = await fetch(`${BaseURL}/getadmin`, {
                headers: {
                    "AdminBizzToken": sessionStorage.getItem('AdminBizzToken')
                }
            });
            const data = await response.json();
            if (response.ok) {
                setAdminData(data.adminData);
                setImage(data.adminData.ProfilePhoto)
            } else {
                showAlert(data.message, 'danger');
            }
        } catch (error) {
            showAlert(error.message, 'danger');
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageSet(file);
        setImage(URL.createObjectURL(file));
        setAdminData({ ...adminData, ProfilePhoto: URL.createObjectURL(file) });
    };

    const updateAdminData = async () => {
        const formData = new FormData();
        formData.append('Name', adminData.Name);
        formData.append('Email', adminData.Email);
        formData.append('Phone', adminData.Phone);
        if (ImageSet) {
            formData.append('profimg', ImageSet);
        }

        try {
            const response = await fetch(`${BaseURL}/updateadmin`, {
                method: 'PUT',
                headers: {
                    "AdminBizzToken": sessionStorage.getItem('AdminBizzToken')
                },
                body: formData
            });
            const data = await response.json();
            if (response.ok) {
                showAlert(data.message, 'success');
                fetchAdminData()
            } else {
                showAlert(data.message, 'danger');
            }
        } catch (error) {
            showAlert(error.message, 'danger');
        }
    };

    useEffect(() => {
        fetchAdminData();
    }, []);

    return (
        <>
            <div className={`flex font-Para flex-col justify-center items-center rounded-md m-5 md:m-10 `}>
                <div className="bg-white w-[90%] lg:w-[80%] py-6 px-6 m-auto" style={{ boxShadow: "1px 1px 7.800000190734863px 0px #00000040" }}>
                    <div className="flex flex-col gap-2 w-[90%] md:w-[80%] m-auto">
                        <div className="relative self-center">
                            <img src={adminData ? `https://junitoserver.junito.at/${Image}` : "../Owner.png"} alt="" className='w-40 h-36 rounded-full' />
                            <div className="absolute bottom-2 bg-black p-2 rounded-full z-10 right-0">
                                <label htmlFor="fileupload">
                                    <FaCamera className="text-white cursor-pointer" />
                                </label>
                                <input type="file" name='fileupload' id='fileupload' className='opacity-0 absolute' onChange={handleImageChange} />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 font-para gap-x-10 gap-y-6">
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor=""
                                    className='text-gray font-medium'
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    placeholder='Enter Name'
                                    className='border-2 border-gray font-normal bg-transparent py-2 px-4 rounded-xl'
                                    value={adminData ? adminData?.Name : ''}
                                    onChange={(e) => setAdminData({ ...adminData, Name: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor=""
                                    className='text-gray font-medium'
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder='Enter Admin Mail'
                                    className='border-2 border-gray font-normal bg-transparent py-2 px-4 rounded-xl'
                                    value={adminData ? adminData?.Email : ''}
                                    onChange={(e) => setAdminData({ ...adminData, Email: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor=""
                                    className='text-gray font-medium'
                                >
                                    Phone
                                </label>
                                <PhoneInput
                                    name="Phone"
                                    type="text"
                                    country={"us"}
                                    enableAreaCodes={true}
                                    areaCodes={{ us: ["332"] }}
                                    inputProps={{
                                        name: "phone",
                                        country: "us",
                                        required: true,
                                        autoFocus: true
                                    }}
                                    containerClass={`rounded-lg h-auto basis-[50%]`}
                                    className="rounded-lg h-auto basis-[50%]"
                                    inputClass='h-auto px-6 border-2 basis-[50%] border-transparent font-pop text-lg rounded-lg  bg-[#E8E8E8] py-2 focus:border-green-500 focus:outline-none'
                                    buttonStyle={{
                                        "borderTopLeftRadius": "0.5rem",
                                        "borderBottomLeftRadius": "0.5rem",
                                    }}
                                    inputStyle={{
                                        height: "100%",
                                        flexBasis: "50%",
                                        width: "100%",
                                        "borderRadius": "0.5rem",
                                    }}
                                    value={adminData ? adminData?.Phone : ''}
                                    onChange={(phone) => {
                                        setAdminData({ ...adminData, Phone: phone })
                                    }}
                                    required
                                />
                                {/* <input
                                    type="phone"
                                    placeholder='Enter Phone'
                                    className='border-2 border-gray font-normal bg-transparent py-2 px-4 rounded-xl'
                                    value={adminData ? adminData?.Phone : ''}
                                    onChange={(e) => setAdminData({ ...adminData, Phone: e.target.value })}
                                /> */}
                            </div>
                        </div>
                        <button
                            onClick={updateAdminData}
                            className='bg-gray rounded-xl py-2 px-4 border-2 my-4 border-gray text-white hover:bg-transparent hover:text-gray ease-in-out duration-300'
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminForm;
