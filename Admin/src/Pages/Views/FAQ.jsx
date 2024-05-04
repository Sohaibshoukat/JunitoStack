import React, { useContext, useEffect, useState } from 'react'
import Accordion from '../../Components/FAQ/Accordion'
import { FaMinus, FaPlus } from 'react-icons/fa';
import Form from '../../Components/FAQ/Form';
import EditForm from '../../Components/FAQ/EditForm';
import AlertContext from '../../Context/Alert/AlertContext';
import { BaseURL } from '../../Data/BaseURL';


const FAQ = () => {

  const alertcontext = useContext(AlertContext);
  const { showAlert } = alertcontext

  const [QuestionBTN, setQuestionBTN] = useState(false)
  const [EditBTN, setEditBTN] = useState(false)
  const [Question, setQuestion] = useState(null)
  const [Answer, setAnswer] = useState(null)
  const [TabSelection, setTabSelection] = useState(null)
  const [FAQData, setFAQData] = useState([]);
  const [editID, seteditID] = useState(null)


  const fetchFAQs = async () => {
    try {
      const response = await fetch(`${BaseURL}/getFAQs`, {
        headers: {
          "AdminBizzToken": sessionStorage.getItem('AdminBizzToken')
        }
      });
      const data = await response.json();
      if (!data.success) {
        showAlert(data.message, 'danger');
      }
      setFAQData(data?.faqs)
    } catch (error) {
      showAlert(error.message, 'danger');
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  return (
    <>

      <Accordion
        Question={Question}
        QuestionBTN={QuestionBTN}
        setQuestionBTN={setQuestionBTN}
        setQuestion={setQuestion}
        Answer={Answer}
        FAQData={FAQData}
        fetchFAQs={fetchFAQs}
        setAnswer={setAnswer}
        setEditBTN={setEditBTN}
        EditBTN={EditBTN}
        TabSelection={TabSelection}
        setTabSelection={setTabSelection}
        editID={editID}
        seteditID={seteditID}
      />
      <div className="relative flex flex-col pb-6 px-3 md:px-6 ">
        <button
          className={`py-2 px-4  rounded-lg w-full font-para text-xs sm:text-sm md:text-base font-bold bg-gray text-white hover:bg-white hover:text-gray ease-in-out duration-300 `} onClick={() => { setQuestionBTN(!QuestionBTN) }}
        >
          + Add a Question
        </button>
        {/* <FaPlus className=' absolute top-[10px] left-[485px] text-base text-white' /> */}
      </div>
      <div className={` flex flex-col px-3 md:px-6 ${QuestionBTN ? "block " : "hidden "} `}>
        <Form
          fetchFAQs={fetchFAQs}
        />
      </div>
      <div className={` flex flex-col mt-6 px-3 md:px-6 ${EditBTN ? "block " : "hidden "} `}>
        <EditForm
          Question={Question}
          setQuestion={setQuestion}
          Answer={Answer}
          setAnswer={setAnswer}
          TabSelection={TabSelection}
          setEditBTN={setEditBTN}
          EditBTN={EditBTN}
          setTabSelection={setTabSelection}
          editID={editID}
          fetchFAQs={fetchFAQs}
          seteditID={seteditID}
        />
      </div>

    </>
  )
}

export default FAQ