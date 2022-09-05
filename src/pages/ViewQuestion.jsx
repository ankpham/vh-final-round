import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
import party from 'party-js';
import Timer from './Timer';
import {TbLetterA, TbLetterB, TbLetterC} from 'react-icons/tb';
import {BsCheckLg, BsXLg} from 'react-icons/bs';
import { useParams, Link } from "react-router-dom";
import ding from '../assets/Em Vui Em Học - Correct Answer - 1s.mp3';
import buzzer from '../assets/Em Vui Em Học - Wrong Answer Buzzer - 2s.mp3';

const ViewQuestion = () => {

    const correctElement = useRef(null);
    const wrongElement1 = useRef(null);
    const wrongElement2 = useRef(null);

    const [questionList, setQuestionList] = useState([])

    const [currentQuestionId, setCurrentQuestionId] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [question, setQuestion] = useState('no question');
    const [choice1, setChoice1] = useState('no choice');
    const [choice2, setChoice2] = useState('no choice');
    const [choice3, setChoice3] = useState('no choice');
    const [nextButtonStyle, setnextButtonStyle] = useState({display: 'block'});

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

    const displayIcon = (questionLocation) => {
        if (questionLocation === 'correct') {
            correctElement.current.childNodes[1].classList.add('active-x-check');
        }
        else if (questionLocation === 'wrong1') {
            wrongElement1.current.childNodes[1].classList.add('active-x-check');
        }
        else if (questionLocation === 'wrong2') {
            wrongElement2.current.childNodes[1].classList.add('active-x-check');
        }
    }

    const user = "089e-weni-098w";
    const pass = "0842-0983-ibjw-2q9w";

    const NextQuestion = () => {
        setCurrentQuestion(currentQuestion+1)
        let plcehldr = currentQuestion+1;

        setCurrentQuestionId(questionList[plcehldr].id);
        setQuestion(questionList[plcehldr].question);
        
        arr = [
            questionList[plcehldr].correctChoice,
            questionList[plcehldr].otherChoices[0],
            questionList[plcehldr].otherChoices[1]
        ];

        setChoice1(arr[0]);
        setChoice2(arr[1]);
        setChoice3(arr[2]);

        arr = [correctChoice,otherChoice1,otherChoice2];
        
        let i = arr.length - 1;
        for (; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    
        displayA = arr[0];
        displayB = arr[1];
        displayC = arr[2];
        
    }

    let url = 'http://localhost:8080/get/questions/3/round/2/category/';

    useEffect(()=> {
        if (currentQuestion === 0) {
            axios.get(url + category,
                {auth: { username: user, password: pass}}
                ).then((response) => {
                    setQuestionList(response.data);
                    setCurrentQuestionId(response.data[0].id);
                    setQuestion(response.data[0].question);
                    let arr = [
                        response.data[0].correctChoice,
                        response.data[0].otherChoices[0],
                        response.data[0].otherChoices[1]
                    ]
                    setChoice1(arr[0]);
                    setChoice2(arr[1]);
                    setChoice3(arr[2]);
                })
        }

        
        if (currentQuestion >= 2) {
            setnextButtonStyle({display: 'none'})
        }



    }, [currentQuestion, url, category]);

    //Sound Effect
    let dingSoundEffect = new Audio(ding);
    let buzzerSoundEffect = new Audio(buzzer);

    const playDingSound = () => {
        dingSoundEffect.play();
        dingSoundEffect = new Audio(ding)
    }

    const playBuzzerSound = () => {
        buzzerSoundEffect.play();
        buzzerSoundEffect = new Audio(buzzer)
    }

    const correctChoice = (
        <li ref={correctElement} onClickCapture={() => playDingSound()} onClick={() => {
            setConfetti(true)
            displayIcon('correct')
        }} className='border-yellow'>{choice1}<BsCheckLg className="inactive-check"/></li>
    )

    const otherChoice1 = (
        <li ref={wrongElement1} onClickCapture={() => playBuzzerSound()} onClick={() => {
            displayIcon('wrong1')
        }} className='border-yellow'>{choice2}<BsXLg className='inactive-x'/></li>
    )

    const otherChoice2 = (
        <li ref={wrongElement2} onClickCapture={() => playBuzzerSound()} onClick={() => {
            displayIcon('wrong2')
        }} className='border-yellow'>{choice3}<BsXLg className='inactive-x'/></li>
    )
    
    let arr = [correctChoice,otherChoice1,otherChoice2];

    let i = arr.length - 1;
    for (; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    let displayA = arr[0];
    let displayB = arr[1];
    let displayC = arr[2];
    return (
        <>
        <div className='view-question'> 
            <div id="container" className='container'>
                <Link className="link back-to-selection" to={"/selection"}>Trở Về Trang Đầu</Link> 
                <div className='question'>
                    <div className='question-row'>
                        <div>
                            <h5>Category {category}</h5>
                            <h5>Id: {currentQuestionId}</h5>
                        </div>
                        <div className='timer'>
                            <Timer/>
                        </div>
                        <h1 ref={confetti} className='question-heading'>{question}</h1>
                    </div>
                    <ul className="choices">
                        <div className='choice-container'>
                            <TbLetterA className='letter-icon'/>{displayA}
                        </div>
                        <div className='choice-container'>
                            <TbLetterB className='letter-icon'/>{displayB}
                        </div>
                        <div className='choice-container'>
                            <TbLetterC className='letter-icon'/>{displayC}
                        </div>
                    </ul>
                </div>
                <p style={nextButtonStyle} onClick={() => NextQuestion()} className='link next-question'>Câu Hỏi Kế Tiếp</p>
            </div>
        </div>
        </>
    )
}

export default ViewQuestion;