import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AlertContext from '../../../Context/Alert/AlertContext';
import { BaseURL } from '../../../Data/BaseURL';
import PromptDetailModel from '../../../Components/Dashboard/PromptDetail/PromptDetailModel';
import { IoIosSearch } from 'react-icons/io';

const DepartPrompt = () => {
    const [PromptDetail, setPromptDetail] = useState(false);
    const [prompts, setPrompts] = useState([]);
    const [SelectedId, setSelectedId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedPotential, setSelectedPotential] = useState("all");
    const [categories, setCategories] = useState([]);
    const [potentials, setPotentials] = useState([]);
    const [isLoading, setisLoading] = useState(true)

    const { dep } = useParams();

    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;

    useEffect(() => {
        if (dep) {
            fetchPromptsByDepartment();
        }
    }, [dep]);

    const fetchPromptsByDepartment = async () => {
        try {
            const response = await fetch(`${BaseURL}/api/company/prompts/${dep}`);
            const data = await response.json();
            if (response.ok) {
                setPrompts(data.Prompts);
                extractCategoriesAndPotentials(data.Prompts);
                setisLoading(false)
            } else {
                showAlert(data.message || 'Error Getting Prompts', "danger");
            }
        } catch (error) {
            showAlert(error.message, "danger");
        }
    };

    const extractCategoriesAndPotentials = (prompts) => {
        const categories = new Set();
        const potentials = new Set();
        prompts.forEach(item => {
            item.List.forEach(prompt => {
                categories.add(prompt.Category);
                potentials.add(prompt.Potential);
            });
        });
        setCategories(Array.from(categories));
        setPotentials(Array.from(potentials));
    };

    const handleSearch = (item) => {
        const query = searchQuery.toLowerCase();
        return item.Name.toLowerCase().includes(query) ||
            item.Type.toLowerCase().includes(query) ||
            item.Category.toLowerCase().includes(query) ||
            item.Potential.toLowerCase().includes(query);
    };

    const handleFilter = (item) => {
        if (selectedCategory !== "all" && item.Category !== selectedCategory) {
            return false;
        }
        if (selectedPotential !== "all" && item.Potential !== selectedPotential) {
            return false;
        }
        return true;
    };

    return (
        <>
            <PromptDetailModel PromptDetail={PromptDetail} setPromptDetail={setPromptDetail} SelectedId={SelectedId} />

            <div className='flex flex-col w-[80%] gap-4 m-auto py-6 font-para'>
                <h2 className='text-black font-semibold text-2xl'>Search for specific prompt</h2>
                <div className="bg-slate-100 rounded-lg py-2 px-2 flex flex-row gap-2 items-center">
                    <IoIosSearch className='text-xl' />
                    <input
                        type="text"
                        className='text-base outline-none active:outline-none border-none bg-transparent'
                        placeholder='Search...'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 items-center">
                    <select
                        name="categoryFilter"
                        id="categoryFilter"
                        className='border-2 border-gray rounded-xl py-2 px-2 text-gray font-para font-medium'
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="all">All Categories</option>
                        {categories?.map((category, index) => (
                            <option value={category} key={index}>{category}</option>
                        ))}
                    </select>
                    <select
                        name="potentialFilter"
                        id="potentialFilter"
                        className='border-2 border-gray rounded-xl py-2 px-2 text-gray font-para font-medium'
                        value={selectedPotential}
                        onChange={(e) => setSelectedPotential(e.target.value)}
                    >
                        <option value="all">All Potentials</option>
                        {potentials?.map((potential, index) => (
                            <option value={potential} key={index}>{potential}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='flex flex-col py-10 gap-6 w-[90%] md:w-[90%] m-auto overflow-y-scroll md:px-6'>
                <div className="bg-white rounded-lg shadow-shadow2 py-3 md:py-4 lg:py-6 px-3 md:px-3 lg:px-6">
                    <div className="my-4">
                        {isLoading?
                        <div className='flex justify-center'>
                            <img src="../../Loading.gif" alt="" className='w-32 h-32' />
                        </div> 
                        :<div className="relative overflow-x-auto">
                            <table className="w-full text-sm font-para text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-base font-normal uppercase text-slate-300">
                                    <tr>
                                        <th className="px-auto md:px-6 py-2 md:py-4">#</th>
                                        <th className="px-auto md:px-6 py-2 md:py-4">Name</th>
                                        <th className="px-auto md:px-6 py-2 md:py-4">Type</th>
                                        <th className="px-auto md:px-6 py-2 md:py-4">Potential</th>
                                        <th className="px-auto md:px-6 py-2 md:py-4">Category</th>
                                        <th className="px-auto md:px-6 py-2 md:py-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {prompts.map((item, index) => (
                                        <>
                                            {item?.List?.filter(handleSearch).filter(handleFilter).map((item2, index2) => (
                                                <tr
                                                    className="bg-white cursor-pointer border-b font-normal text-base border-slate-200 hover:bg-gray hover:text-white ease-in-out duration-300"
                                                    key={index2}
                                                >
                                                    <th className="px-auto md:px-6 py-2 md:py-4">{index2}</th>
                                                    <td className="px-auto md:px-6 py-2 md:py-4 min-w-max">{item2.Name}</td>
                                                    <td className="px-auto md:px-6 py-2 md:py-4">
                                                        <div className={`${item2.Type === 'Conversation' ? "bg-[#16C098]/30 border-[#00B087] text-[#008767]" : "bg-[#FEF6E6] border-[#FF8900] text-[#FF8900]"} text-center py-2 px-3 rounded-lg border-2`}>
                                                            {item2.Type}
                                                        </div>
                                                    </td>
                                                    <td className="px-auto md:px-6 py-2 md:py-4">
                                                        <div className={`
                                                        ${item2.Potential === 'Premium' ? "bg-[#F0F9FF] border-[#0095FF] text-[#0095FF]"
                                                                : item2.Potential === 'High' ? "bg-[#F0FDF4] border-[#00E58F] text-[#00E58F]"
                                                                    : item2.Potential === 'Medium' ? "bg-[#FBF1FF] border-[#884DFF] text-[#884DFF]"
                                                                        : "bg-[#FEF6E6] border-[#FF8900] text-[#FF8900]"} text-center w-full py-2 px-3 rounded-lg border-2`}
                                                        >
                                                            {item2.Potential}
                                                        </div>
                                                    </td>
                                                    <td className="px-auto md:px-6 py-2 md:py-4">{item2.Category}</td>
                                                    <td
                                                        className="px-auto md:px-6 py-2 md:py-4"
                                                        onClick={() => {
                                                            setSelectedId(item2._id);
                                                            setPromptDetail(true);
                                                        }}
                                                    >
                                                        <button
                                                            className='bg-black w-max rounded-lg text-white py-2 px-4 border-2 border-black hover:bg-transparent hover:text-white ease-in-out duration-300'
                                                        >
                                                            See More
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </div>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default DepartPrompt;
