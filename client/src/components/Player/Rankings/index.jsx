import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Paper, ButtonGroup, Button } from '@material-ui/core'

import {
    LineChart,
    Line,
    ResponsiveContainer,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from 'recharts'

import { getPlayerRanking } from '@services/players'

const useStyles = makeStyles(theme => ({
    chart: {
        minWidth: '90%',
        padding: 15,
        margin: 15,
        backgroundColor: theme.background_color,
    },
    button_container: {
        overflow: 'auto',
        whiteSpace: 'nowrap',
        width: '100%',
    },
}))

const options = [
    { title: '7d', number: 7 },
    { title: '14d', number: 14 },
    { title: '30d', number: 30 },
    { title: '365d', number: 365 },
]

export default function Rankings({ id }) {
    const [zoneName, setZoneName] = React.useState('World')
    const [selectedTime, setSelectedTime] = React.useState(options[0])
    const [playerRanking, setPlayerRanking] = React.useState(null)
    const classes = useStyles()

    React.useEffect(() => {
        const getData = async () => {
            const response = await getPlayerRanking(id, selectedTime.number)
            setPlayerRanking(response)
        }

        getData()
    }, [id, selectedTime])

    const rankings = React.useMemo(
        () =>
            playerRanking &&
            playerRanking.flatMap(ranking => {
                const zone = ranking.zones.find(zone => zone.zoneName === zoneName)
                if (zone) {
                    const date = new Date(ranking.createdAt)
                    return {
                        zone: {
                            ...zone,
                            timestamp: date.getDate() + '.' + (date.getMonth() + 1),
                        },
                    }
                } else {
                    return []
                }
            }),
        [playerRanking, zoneName],
    )

    return (
        <>
            {rankings && (
                <>
                    <h3>Rankings</h3>
                    <div className={classes.button_container}>
                        <ButtonGroup
                            className={classes.buttons}
                            color="primary"
                            aria-label="text primary button group">
                            {playerRanking[0].zones.map(zone => (
                                <Button
                                    style={{ color: '#fff' }}
                                    variant={
                                        zone.zoneName === zoneName ? 'outlined' : 'text'
                                    }
                                    onClick={() => setZoneName(zone.zoneName)}>
                                    {zone.zoneName}
                                </Button>
                            ))}
                        </ButtonGroup>
                    </div>
                    <Paper className={classes.chart} elevation={3}>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart
                                data={rankings}
                                margin={{
                                    top: 20,
                                    right: 20,
                                    left: 20,
                                    bottom: 20,
                                }}>
                                <Line
                                    type="monotone"
                                    dataKey="zone.ranking.position"
                                    stroke="#8884d8"
                                    label={{
                                        fill: 'white',
                                        fontSize: 11,
                                        dy: -13,
                                    }}
                                />
                                <CartesianGrid
                                    stroke="rgba(255,255,255,0.3)"
                                    strokeDasharray="5 5"
                                />
                                <XAxis
                                    dataKey="zone.timestamp"
                                    reversed={true}
                                    interval={0}
                                />
                                <YAxis
                                    allowDecimals={false}
                                    domain={[
                                        Math.round(
                                            Math.min.apply(
                                                Math,
                                                rankings.map(o => {
                                                    return o.zone.ranking.position
                                                }),
                                            ) * 0.5,
                                        ),
                                        Math.round(
                                            Math.max.apply(
                                                Math,
                                                rankings.map(o => {
                                                    return o.zone.ranking.position
                                                }),
                                            ) * 1.5,
                                        ),
                                    ]}
                                />
                                <Tooltip />
                            </LineChart>
                        </ResponsiveContainer>
                        <ButtonGroup
                            className={classes.buttons}
                            color="primary"
                            aria-label="text primary button group">
                            {options.map(option => (
                                <Button
                                    style={{ color: '#fff' }}
                                    variant={
                                        option.title === selectedTime.title
                                            ? 'outlined'
                                            : 'text'
                                    }
                                    onClick={() => setSelectedTime(option)}>
                                    {option.title}
                                </Button>
                            ))}
                        </ButtonGroup>
                    </Paper>
                </>
            )}
        </>
    )
}
