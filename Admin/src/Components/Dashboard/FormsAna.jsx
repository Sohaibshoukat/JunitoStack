import React from 'react'
import { ResponsiveLine } from '@nivo/line'
import { FormDesgin } from '../../Data/AnalysisData'

const FormsAna = () => {
    return (
        <div className="bg-white rounded-xl shadow-shadow2 py-6 px-6 h-[100%]">
            <div className="flex flex-col gap-4 h-[100%]">
                <div className="flex flex-col gap-2">
                    <h2 className='font-Para font-bold text-xl'>Top Funtionalities</h2>
                </div>
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-hidden font-Para">
                                <table
                                    className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                                    <thead
                                        className="border-b border-neutral-200 font-medium dark:border-white/10">
                                        <tr>
                                            <th scope="col" className="px-6 py-4">#</th>
                                            <th scope="col" className="px-6 py-4">Name</th>
                                            <th scope="col" className="px-6 py-4">Popularity</th>
                                            <th scope="col" className="px-6 py-4">Sales</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-neutral-200 dark:border-white/10">
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
                                            <td className="whitespace-nowrap px-6 py-4">HR</td>
                                            <td className="whitespace-nowrap w-full px-6 py-4">
                                                <div className="w-full bg-gray-200 rounded-full h-2 bg-[#CDE7FF]">
                                                    <div className="bg-[#0095FF] h-2 rounded-full" style={{ width: "45%" }}></div>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="bg-[#F0F9FF] w-fit py-2 px-4 rounded-xl border-2 border-[#0095FF]">
                                                    45%
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-neutral-200 dark:border-white/10">
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">2</td>
                                            <td className="whitespace-nowrap px-6 py-4">Marketing</td>
                                            <td className="whitespace-nowrap w-full px-6 py-4">
                                                <div className="w-full bg-gray-200 rounded-full h-2 bg-[#CDE7FF]">
                                                    <div className="bg-[#0095FF] h-2 rounded-full" style={{ width: "45%" }}></div>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="bg-[#F0F9FF] w-fit py-2 px-4 rounded-xl border-2 border-[#0095FF]">
                                                    45%
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-neutral-200 dark:border-white/10">
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">3</td>
                                            <td className="whitespace-nowrap px-6 py-4">Sale</td>
                                            <td className="whitespace-nowrap w-full px-6 py-4">
                                                <div className="w-full bg-gray-200 rounded-full h-2 bg-[#CDE7FF]">
                                                    <div className="bg-[#0095FF] h-2 rounded-full" style={{ width: "45%" }}></div>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="bg-[#F0F9FF] w-fit py-2 px-4 rounded-xl border-2 border-[#0095FF]">
                                                    45%
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormsAna