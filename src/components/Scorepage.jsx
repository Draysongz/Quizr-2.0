import React from 'react'
import { useParams } from 'react-router-dom';


const Scorepage = () => {
    const { score } = useParams(); 
  return (
    <div>
       <div>
      <h2>Score Page</h2>
      <p>Total Score: {score}</p>
    </div>
    </div>
  )
}

export default Scorepage
