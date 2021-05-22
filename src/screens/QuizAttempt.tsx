import { FC, useState, ChangeEvent } from 'react';
import './QuizAttempt.css'

const QuizAttempt: FC = () => {

    const [question, setQuestion] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
    const [count, setCount] = useState(3);
    const [totalQues, setTotalQues] = useState(10);

    return (

        <div>

            <div className="time__count">
                Time Elapsed: XX:XX
            </div>

            <div className="ques__count">
                Question {count}/{totalQues}
            </div>

            <br/> <br/>

            <div className="question">
                {question}
            </div>

            <div className="button__align">
                <div >
                    <button className="option__button__left">Option A</button>
                    <button className="option__button__right">Option B</button>
                </div>

                <div >
                    <button className="option__button__left">Option C</button>
                    <button className="option__button__right">Option D</button>
                </div>
            </div>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <button className="next__button">Next</button>
            </div>


        </div>

    );
};

export default QuizAttempt;
