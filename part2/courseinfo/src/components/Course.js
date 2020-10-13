import React from 'react'

const Total = (props) => {
    console.log(props)
    return <p><strong>Total of {props.total} exercises</strong></p>
  }
  
  const Part = (props) => {
    console.log(props)
    return <p>{props.name} {props.exercises}</p>
  }
  
  const Content = (props) => {
    console.log(props)
    
    return (
      <div>
        {props.parts.map(part => 
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        )}
        
      </div>
    )  
  }
  
  const Header = (props) => {
    console.log(props)
    return <h2>{props.name}</h2>    
  }
  
  const Course = (props) => {
    console.log(props)
    return (
      <div>
        <h1>Web Development Curriculum</h1>
        {props.courses.map(course =>
          <div>
          <Header key={course.id} name={course.name} />
          <Content key={course.parts.id} parts={course.parts} />
          <Total key={course.id} total={course.parts.reduce((sum, part, i) => sum += course.parts[i].exercises, 0)} />
          </div>
        )}  
      </div>
    )
  }

  export default Course