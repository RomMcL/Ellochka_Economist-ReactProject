import { ResponsiveBar } from '@nivo/bar'

const BarChart = ({ data, keys, parameters }) => (
    <ResponsiveBar
        data={data}
        keys={keys}
        indexBy="criteria"
        margin={{ top: parameters.marginTop, right: 280, bottom: 50, left: parameters.marginLeft }}
        height={500}
        padding={0.3}
        layout={parameters.layout}
        label={parameters.label}
        labelPosition={parameters.labelPosition}
        labelOffset={parameters.labelOffset}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}

        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendOffset: 32,
            truncateTickAt: 0
        }}
        axisLeft={parameters.axisLeft}
        enableGridX={parameters.enableGridX}
        enableGridY={parameters.enableGridY}

        enableTotals={true}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        isInteractive={true}
        animate={true}

    />
)

export default BarChart;