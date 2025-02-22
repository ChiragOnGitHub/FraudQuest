import React from 'react'
import HighlightText from '../HomePage/HighlightText'

const Quote = () => {
  return (
    // Real-World Scenarios
// Our quizzes replicate actual scam attempts—from phishing emails to suspicious text messages—so you learn to spot fraud in everyday life.

    <div className=" text-xl sm:text-4xl font-semibold mx-auto py-5 text-center text-white">
        Our quizzes replicate actual scam attempts from
        {" "}
        <span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold">
            {" "}
            phishing emails
        </span>

        {" "}
        to 

        <span className="bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold">
            {" "}
            suspicious text messages
        </span> 

        {" "}
        so you learn to spot fraud in everyday life.
    </div>
  )
}

export default Quote