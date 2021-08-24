import React, { useState } from 'react'


const Anecdote = ({ anecdotesList, selected }) => {
    return (<div>
        "{anecdotesList[selected]}"
    </div>)
}

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
    ]

    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(Array(7).fill(0))


    const randomIndex = () => {
        let index = Math.floor(Math.random() * 7)
        return index;
    }

    const vote = () => {

        const votesCopy = [...votes]
        votesCopy[selected] += 1
        setVotes(votesCopy)
    }



    const next = () => {
        let rdIndex = randomIndex()
        while (rdIndex === selected) {
            rdIndex = randomIndex()
        }
        setSelected(rdIndex)
    }

    const maxIndex = () => {
        if (votes.length === 0) {
            return -1;
        }

        var max = votes[0];
        var maxIndex = 0;

        for (var i = 1; i < votes.length; i++) {
            if (votes[i] > max) {
                maxIndex = i;
                max = votes[i];
            }
        }
        return maxIndex
    }


    return (
        <div>
            <h1>Anecdotes of the day</h1>
            <Anecdote anecdotesList={anecdotes} selected={selected}></Anecdote>
            <p>has {votes[selected]} votes</p>
            <button onClick={vote}>vote</button>
            <button onClick={next}>next anecdote</button>
            <h1>Anecdotes with most votes</h1>
            <Anecdote anecdotesList={anecdotes} selected={maxIndex()}></Anecdote>
            <p>has {votes[maxIndex()]} votes</p>
        </div>
    )
}

export default App