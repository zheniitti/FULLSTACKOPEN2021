import React, { useState } from 'react'

const Buttons = ({ setGood, setNeutral, setBad }) => {
    return (<div>
        <Button palaute="good" funktio={setGood}></Button>
        <Button palaute="neutral" funktio={setNeutral}></Button>
        <Button palaute="bad" funktio={setBad}></Button>
    </div>)
}

const Button = ({ palaute, funktio }) => {
    return <button onClick={funktio}>{palaute}</button>
}

const StatisticLine = ({ text, value, extra = '' }) => {
    return (
        <tr>
            <th>{text}</th>
            <td>{value}</td>
            <td>{extra}</td>
        </tr>

    )
}

const Statistics = (props) => {
    /*  debugger */
    if (props.all === 0) return (
        <div>
            <h1>statistics</h1>
            No feedback given
        </div>)

    return (
        <div>
            <h1>statistics</h1>
            <table>
                <tbody>
                    <StatisticLine text="good" value={props.good} />
                    <StatisticLine text="neutral" value={props.neutral} />
                    <StatisticLine text="bad" value={props.bad} />
                    <StatisticLine text="all" value={props.all} />
                    <StatisticLine text="average" value={props.average} />
                    <StatisticLine text="positive" value={props.positive} extra='%' />
                </tbody>
            </table>
        </div>
    )
}

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [statsList, setList] = useState([0, 0, 0])

    const countOtherStats = (good1, bad1) => {
        let all = statsList[0] + 1
        let average = (good1 - bad1) / all
        let positive = 100 * good1 / all
        const newList = [all, average, positive]
        setList(newList)
    }

    const goodButtonFunction = () => {
        setGood(good + 1);
        countOtherStats((good + 1), bad);
    }
    const neutralButtonFunction = () => {
        setNeutral(neutral + 1);
        countOtherStats(good, bad);
    }
    const badButtonFunction = () => {
        setBad(bad + 1);
        countOtherStats(good, (bad + 1));
    }

    return (
        <div>
            <h1>give feedback</h1>
            <Buttons setGood={goodButtonFunction} setNeutral={neutralButtonFunction} setBad={badButtonFunction} />
            <Statistics good={good} neutral={neutral} bad={bad} all={statsList[0]} average={statsList[1]} positive={statsList[2]} />
        </div>


    )
}

export default App