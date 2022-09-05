import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
import party from 'party-js';
import Timer from './Timer';
import {TbLetterA, TbLetterB, TbLetterC} from 'react-icons/tb';
import {BsCheckLg, BsXLg} from 'react-icons/bs';
import { useParams, Link } from "react-router-dom";
import ding from '../assets/Em Vui Em Học - Correct Answer - 1s.mp3';
import buzzer from '../assets/Em Vui Em Học - Wrong Answer Buzzer - 2s.mp3';

const VLViewQuestion = () => {
    const correctElement = useRef(null);
    const wrongElement1 = useRef(null);
    const wrongElement2 = useRef(null);

    const [question, setQuestion] = useState('no question');
    const [choice1, setChoice1] = useState('no choice');
    const [choice2, setChoice2] = useState('no choice');
    const [choice3, setChoice3] = useState('no choice');

    const { category, points } = useParams();

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

    useEffect(()=>{
        axios.get('http://localhost:8080/get/question/round/2/category/' + category + 
        '/points/' + points, {auth: { username: user, password: pass}}
        ).then((response) => {
            console.log(response.data.id)
            setQuestion(response.data.question);
            let arr = [response.data.correctChoice,response.data.otherChoices[0],response.data.otherChoices[1]]

            setChoice1(arr[0]);
            setChoice2(arr[1]);
            setChoice3(arr[2]);
        })
    }, [category, points]);

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

    const displayA = arr[0];
    const displayB = arr[1];
    const displayC = arr[2];
    return (
        <>
        <div className='view-question'> 
            <div id="container" className='container'>
                <Link className="link back-to-selection" to={"/vl-selection"}>Trở Về Trang Đầu</Link> 
                <div className='question'>
                    <div className='question-row'>
                        <div hidden>
                            <h5>Category {category}</h5>
                            <h5>{points} Points</h5>
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
            </div>
        </div>
        </>
    )
}

export default VLViewQuestion;