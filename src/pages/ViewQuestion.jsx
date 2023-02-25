import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
import party from 'party-js';
import Timer from './Timer';
import {TbLetterA, TbLetterB, TbLetterC} from 'react-icons/tb';
import {BsCheckLg, BsXLg} from 'react-icons/bs';
import { useParams, Link } from "react-router-dom";
import { PlayAudio } from '../components/PlayAudio';
import { RandomizeChoices } from '../components/RandomizeChoices';

const ViewQuestion = () => {
    const timerContainer = useRef(null)
    const correctElement = useRef(null);
    const wrongElement1 = useRef(null);
    const wrongElement2 = useRef(null);

    const [questionList, setQuestionList] = useState([])
    const [timerState, setTimerState] = useState(<Timer/>)
    const [reloadCounter, setreloadCounter] = useState(0)

    const [choices, setChoices] = useState(RandomizeChoices(<></>,<></>,<></>))
    const [currentQuestionId, setCurrentQuestionId] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [question, setQuestion] = useState('');
    const [nextButtonStyle, setnextButtonStyle] = useState({display: 'block'});
    const [questionElementStyle, setquestionElementStyle] = useState({display: 'none'});


    const [displayA, setdisplayA] = useState(choices[0]);
    const [displayB, setdisplayB] = useState(choices[1]);
    const [displayC, setdisplayC] = useState(choices[2]);
    
    const {category } = useParams();

    //Confetti Effect
    const confetti = useRef(null);

    const setConfetti = () => {
        party.confetti(confetti.current, {
            count: party.variation.range(100, 200),
            size: party.variation.range(2, 2.5),
            spread: party.variation.range(80, 160)
        });
    }

    const displayIcon = (questionLocation, isRemove) => {
        if (isRemove) {
            correctElement.current.childNodes[1].classList.remove('active-x-check');
            wrongElement1.current.childNodes[1].classList.remove('active-x-check');
            wrongElement2.current.childNodes[1].classList.remove('active-x-check');
        }
        else {
            if (questionLocation === 'correct') {
                correctElement.current.childNodes[1].classList.add('active-x-check');
                setTimerState('')
            }
            else if (questionLocation === 'wrong1') {
                wrongElement1.current.childNodes[1].classList.add('active-x-check');
            }
            else if (questionLocation === 'wrong2') {
                wrongElement2.current.childNodes[1].classList.add('active-x-check');
            }
        }
    }

    const user = "089e-weni-098w";
    const pass = "0842-0983-ibjw-2q9w";

    const NextQuestion = () => {
        timerContainer.current.classList.remove("display-none")
        setTimerState(<Timer/>)

        displayIcon('current', 'remove')
        setCurrentQuestion(currentQuestion+1)
        let plcehldr = currentQuestion+1;

        setCurrentQuestionId(questionList[plcehldr].id);
        setQuestion(questionList[plcehldr].question);

        let choice1 = questionList[plcehldr].correctChoice;
        let choice2 = questionList[plcehldr].otherChoices[0];
        let choice3 = questionList[plcehldr].otherChoices[1];

        const correctChoice = (
            <div onClickCapture={() => PlayAudio("ding")} onClick={() => {
                setConfetti(true)
                displayIcon('correct')
            }} className='border-yellow'><p ref={correctElement} className="question-text">{choice1}<BsCheckLg className="inactive-check"/></p></div>
        )
    
        const otherChoice1 = (
            <div onClickCapture={() => PlayAudio("buzzer")} onClick={() => {
                displayIcon('wrong1')
            }} className='border-yellow'><p ref={wrongElement1} className="question-text">{choice2}<BsXLg className='inactive-x'/></p></div>
        )
    
        const otherChoice2 = (
            <div onClickCapture={() => PlayAudio("buzzer")} onClick={() => {
                displayIcon('wrong2')
            }} className='border-yellow'><p ref={wrongElement2} className="question-text">{choice3}<BsXLg className='inactive-x'/></p></div>
        )

        let arr = RandomizeChoices(correctChoice,otherChoice1,otherChoice2);

        setdisplayA(arr[0]);
        setdisplayB(arr[1]);
        setdisplayC(arr[2]);
    }

    let url = 'http://vh.backend.hvmatl.org:8080/get/questions/12/no-random/round/2/category/2';

    useEffect(()=> {
        if (currentQuestion === 0) {
            if (reloadCounter === 0) {
                axios.get(url,
                    {auth: { username: user, password: pass}}
                    ).then((response) => {
                        setQuestionList(response.data);
                        setCurrentQuestionId(response.data[0].id);
                        
                        let choice1Init = response.data[0].correctChoice;
                        let choice2Init = response.data[0].otherChoices[0];
                        let choice3Init = response.data[0].otherChoices[1];

                        const correctChoiceInit = (
                            <div onClickCapture={() => PlayAudio("ding")} onClick={() => {
                                setConfetti(true)
                                displayIcon('correct')
                            }} className='border-yellow'><p ref={correctElement} className="question-text">{choice1Init}<BsCheckLg className="inactive-check"/></p></div>
                        )
                    
                        const otherChoice1Init = (
                            <div onClickCapture={() => PlayAudio("buzzer")} onClick={() => {
                                displayIcon('wrong1')
                            }} className='border-yellow'><p ref={wrongElement1} className="question-text">{choice2Init}<BsXLg className='inactive-x'/></p></div>
                        )
                    
                        const otherChoice2Init = (
                            <div onClickCapture={() => PlayAudio("buzzer")} onClick={() => {
                                displayIcon('wrong2')
                            }} className='border-yellow'><p ref={wrongElement2} className="question-text">{choice3Init}<BsXLg className='inactive-x'/></p></div>
                        )
                        setChoices(RandomizeChoices(correctChoiceInit,otherChoice1Init,otherChoice2Init));
                        
                        let arr = RandomizeChoices(correctChoiceInit,otherChoice1Init,otherChoice2Init);
                        
                        //question should not be set and be rerendered along with visually if choices
                        //are not in the data
                        if (choice1Init !== '' && choice1Init !== null)  {
                            //Data for displaying questings is pulled from arr variable instead of choices variable in order to allow
                            //for quicker data retrieval and set the answer choices before rerender needed for a state variable choices.
                            setdisplayA(arr[0])
                            setdisplayB(arr[1])
                            setdisplayC(arr[2])
                            setQuestion(response.data[0].question);
                            setreloadCounter(reloadCounter => reloadCounter+1)
    
                            setquestionElementStyle({})
                        }
                })
            }
        }
        if (currentQuestion >= 11) {
            setnextButtonStyle({display: 'none'})
        }
    }, [currentQuestion, url, category, choices, reloadCounter]);

    return (
        <>
        <div className='view-question'> 
            <div id="container" className='container'>
                <div style={questionElementStyle} className='question'>
                    <div className='question-row'>
                        <div hidden>
                            <h5>Category {category}</h5>
                            <h5>Id: {currentQuestionId}</h5>
                        </div>
                        <div ref={timerContainer} className='timer'>
                            {timerState}
                        </div>
                        <div className='question-number'>
                            <h1>{currentQuestion+1}/12</h1>
                        </div>
                        <h1 ref={confetti} className='question-heading'>{question}</h1>
                    </div>
                    <div className="choices">
                        <div className='choice-container'>
                            <TbLetterA className='letter-icon background-orange'/>{displayA}
                        </div>
                        <div className='choice-container'>
                            <TbLetterB className='letter-icon background-orange'/>{displayB}
                        </div>
                        <div className='choice-container'>
                            <TbLetterC className='letter-icon background-orange'/>{displayC}
                        </div>
                    </div>
                </div>
                <Link className="link back-to-selection" to={"/selection"}>Trở Về Trang Đầu</Link> 
                <p style={nextButtonStyle} onClick={() => NextQuestion()} className='link next-question'>Câu Hỏi Kế Tiếp</p>
            </div>
        </div>
        </>
    )
}

export default ViewQuestion;