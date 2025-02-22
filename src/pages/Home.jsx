import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import CodeBlocks from "../components/core/HomePage/CodeBlocks"

const Home = () => {
return (
    <div className='relative mx-auto my-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between'>
            <div>
                <CodeBlocks 
                    position={"lg:flex-row"}
                    heading={
                        <div className='text-4xl font-semibold'>
                         
                            The Great Scam 
                            <HighlightText text={"Escape-"}/>
                            {" "}
                            Level Up Against Fraud.
                        </div>
                    }
                    subheading = {
                        "FraudQuest is your interactive learning platform dedicated to exposing the tactics used by online scammers. Our bite-sized quizzes help you quickly identify red flags and protect yourself from financial harm."
                    }
                    ctabtn1={
                        {
                            btnText: "sign up",
                            linkto: "/signup",
                            active: true,
                        }
                    }
                    ctabtn2={
                        {
                            btnText: "login",
                            linkto: "/login",
                            active: false,
                        }
                    }

                    codeblock={`🚨 [URGENT] Your bank account\n has been compromised!\n Click here to secure it\n immediately: www.fake-bank.com  `}
                    backgroundGradient={<div className="codeblock1 absolute"></div>}
                    codeColor={"text-yellow-25"}
                />
            </div>
    </div>
  )
}

export default Home
