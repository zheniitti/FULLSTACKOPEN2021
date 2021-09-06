import React from 'react'

const Header = (props) => {
    return (
        <div>
            <h2>
                {props.course}
            </h2>
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>
                {props.part} {props.exercises}
            </p>
        </div>
    )
}





const Content = ({ parts }) => {
    const content = parts.map(part =>
        <Part part={part.name} exercises={part.exercises} key={part.id} />
    )
    return (
        <div>
            {content}
        </div>
    )
}

const Total = (props) => {
    const total = props.parts.reduce((sum, part) => {
        console.log('what is happening', sum, part)
        return sum + parseInt(part.exercises)
    }, 0)
    return (
        <div>
            <h4>Number of exercises {total}</h4>
        </div>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course