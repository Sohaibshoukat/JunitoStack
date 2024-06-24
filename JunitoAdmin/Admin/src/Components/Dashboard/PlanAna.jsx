import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { PlanData } from '../../Data/AnalysisData'

const PlanAna = () => {
    return (
        <div className="bg-white rounded-xl shadow-boxshade py-6 px-6">
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                    <h2 className='font-Para font-bold text-xl'>Total Plan Buy</h2>
                </div>
                <div className='w-[100%] h-[300px]'>
                    <ResponsiveBar
                        data={PlanData}
                        keys={[
                            'Advance',
                            'Pro'
                        ]}
                        indexBy="month"
                        margin={{ top: 0, right: 30, bottom: 60, left: 40 }}
                        padding={0.3}
                        groupMode="grouped"
                        valueScale={{ type: 'linear' }}
                        indexScale={{ type: 'band', round: true }}
                        borderRadius={4}
                        colors={{ scheme: 'accent' }}
                        defs={[
                            {
                                id: 'dots',
                                type: 'patternDots',
                                background: 'inherit',
                                color: '#000000',
                                size: 6,
                                padding: 1,
                                stagger: true
                            },
                            {
                                id: 'lines',
                                type: 'patternLines',
                                background: 'inherit',
                                color: '#000000',
                                rotation: -45,
                                lineWidth: 8,
                                spacing: 10
                            }
                        ]}
                        borderColor={{
                            from: 'color',
                            modifiers: [
                                [
                                    'darker',
                                    1.6
                                ]
                            ]
                        }}
                        axisTop={null}
                        axisRight={null}
                        labelSkipWidth={12}
                        labelSkipHeight={12}
                        // labelTextColor={{
                        //     from: 'color',
                        //     modifiers: [
                        //         [
                        //             'darker',
                        //             1.6
                        //         ]
                        //     ]
                        // }}
                        legends={[
                            {
                                dataFrom: 'keys',
                                anchor: 'bottom',
                                direction: 'row',
                                justify: false,
                                translateY: 50,
                                itemsSpacing: 1,
                                itemWidth: 100,
                                itemHeight: 20,
                                itemDirection: 'left-to-right',
                                itemOpacity: 1,
                                symbolSize: 20,
                                symbolShape:'circle'
                            }
                        ]}
                        // role="application"
                        // ariaLabel="Nivo bar chart demo"
                        // barAriaLabel={e => e.id + ": " + e.formattedValue + " in month: " + e.indexValue}
                    />
                </div>
            </div>
        </div>
    )
}

export default PlanAna