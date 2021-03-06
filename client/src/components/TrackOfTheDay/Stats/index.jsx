import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { useHistory } from 'react-router-dom'

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts'

import { Paper, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { getTOTDStats } from '@services/totds'
import { setTOTDStats } from '@redux/store/totd'

const useStyles = makeStyles(theme => ({
    chartContainer: {
        minWidth: 750,
    },
    paper: {
        margin: 10,
        padding: 10,
        color: '#fff',
        backgroundColor: theme.background_color,
    },
}))

export default function Stats() {
    const { TOTDstats } = useSelector(state => state.totd)
    const dispatch = useDispatch()
    const history = useHistory()
    const classes = useStyles()

    React.useEffect(() => {
        const getData = async () => {
            const response = await getTOTDStats()
            dispatch(setTOTDStats(response))
        }
        if (!TOTDstats) getData()
    }, [TOTDstats, dispatch])

    return (
        <>
            {TOTDstats && (
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper} elevation={3}>
                            <h2>Mappers with {'>'} 1 tracks of the day</h2>
                            <div className={classes.chartContainer}>
                                <ResponsiveContainer
                                    width="100%"
                                    height={350}
                                    style={{ overflow: 'auto' }}>
                                    <BarChart
                                        data={TOTDstats.maps}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="nameOnPlatform"
                                            allowDataOverflow={true}
                                            interval={0}
                                            angle={-45}
                                            textAnchor="end"
                                            height={120}
                                            minTickGap={20}
                                            reversed={true}
                                            onClick={e =>
                                                history.push(
                                                    '/player/' +
                                                        TOTDstats.maps[e.index]
                                                            .accountId +
                                                        '/stats',
                                                )
                                            }
                                            style={{
                                                fill: '#0074d1',
                                                fontWeight: 'bold',
                                                cursor: 'pointer',
                                            }}
                                        />
                                        <YAxis allowDecimals={false} />
                                        <Tooltip />
                                        <Legend />
                                        <Bar
                                            dataKey="count"
                                            fill="#8884d8"
                                            label={{
                                                fill: 'white',
                                                fontSize: 11,
                                            }}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper} elevation={3}>
                            <h2>Top 10 placements (Top 10)</h2>
                            <div className={classes.chartContainer}>
                                <ResponsiveContainer
                                    width="100%"
                                    height={350}
                                    style={{ overflow: 'auto' }}>
                                    <BarChart
                                        data={TOTDstats.top10}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="nameOnPlatform"
                                            allowDataOverflow={true}
                                            interval={0}
                                            angle={-45}
                                            textAnchor="end"
                                            height={120}
                                            minTickGap={20}
                                            onClick={e =>
                                                history.push(
                                                    '/player/' +
                                                        TOTDstats.top10[e.index]
                                                            .accountId +
                                                        '/stats',
                                                )
                                            }
                                            style={{
                                                fill: '#0074d1',
                                                fontWeight: 'bold',
                                                cursor: 'pointer',
                                            }}
                                        />
                                        <YAxis allowDecimals={false} />
                                        <Tooltip />
                                        <Legend />
                                        <Bar
                                            dataKey="count"
                                            fill="#8884d8"
                                            label={{
                                                fill: 'white',
                                                fontSize: 11,
                                            }}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper} elevation={3}>
                            <h2>World records (Top 10)</h2>
                            <div className={classes.chartContainer}>
                                <ResponsiveContainer
                                    width="100%"
                                    height={350}
                                    style={{ overflow: 'auto' }}>
                                    <BarChart
                                        data={TOTDstats.top1}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="nameOnPlatform"
                                            allowDataOverflow={true}
                                            interval={0}
                                            angle={-45}
                                            textAnchor="end"
                                            height={120}
                                            minTickGap={20}
                                            onClick={e =>
                                                history.push(
                                                    '/player/' +
                                                        TOTDstats.top1[e.index]
                                                            .accountId +
                                                        '/stats',
                                                )
                                            }
                                            style={{
                                                fill: '#0074d1',
                                                fontWeight: 'bold',
                                                cursor: 'pointer',
                                            }}
                                        />
                                        <YAxis allowDecimals={false} />
                                        <Tooltip />
                                        <Legend />
                                        <Bar
                                            dataKey="count"
                                            fill="#8884d8"
                                            label={{
                                                fill: 'white',
                                                fontSize: 11,
                                            }}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            )}
        </>
    )
}
