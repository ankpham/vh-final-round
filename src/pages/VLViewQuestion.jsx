import axios from 'axios';
import React, {useMemo, useState, useEffect, useRef} from 'react';
import party from 'party-js';
import Timer from './Timer';
import {TbLetterA, TbLetterB, TbLetterC} from 'react-icons/tb';
import {BsCheckLg, BsXLg} from 'react-icons/bs';
import { useParams, Link } from "react-router-dom";
import { PlayAudio } from '../components/PlayAudio';
import { RandomizeChoices } from '../components/RandomizeChoices';

const VLViewQuestion = () => {
    const questionElement = useRef(null);
    const correctElement = useRef(null);
    const wrongElement1 = useRef(null);
    const wrongElement2 = useRef(null);
    const correctContainer = useRef(null);
    const wrongContainer1 = useRef(null);
    const wrongContainer2 = useRef(null);
    const [letterIcon, setLetterIcon] = useState('');

    const [question, setQuestion] = useState('no question');
    const [choice1, setChoice1] = useState('no choice');
    const [choice2, setChoice2] = useState('no choice');
    const [choice3, setChoice3] = useState('no choice');
    const [questionElementStyle, setquestionElementStyle] = useState({display: 'none'});

    const { points, category } = useParams();
    let colorCategory = category.charAt(2);

    let selectionMapping = useMemo(() => 
         new Map([
             ["1", "border-orchid"], ["2", "border-lightblue"], ["3", "border-orange"], 
             ["4", "border-red"], ["5", "border-green"]
         ])
     , [])

     let selectionMappingBackground = useMemo(() => 
         new Map([
             ["1", "background-orchid"], ["2", "background-lightblue"], ["3", "background-orange"], 
             ["4", "background-red"], ["5", "background-green"]
         ])
     , [])

    //Confetti Effect
    const setConfetti = () => {
        party.confetti(questionElement.current, {
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

        correctContainer.current.classList.add(selectionMapping.get(colorCategory))
        wrongContainer1.current.classList.add(selectionMapping.get(colorCategory))
        wrongContainer2.current.classList.add(selectionMapping.get(colorCategory))
        setLetterIcon(selectionMappingBackground.get(colorCategory))

        axios.get('http://vh.backend.hvmatl.org:8080/get/question/round/2/category/' + category + 
        '/grade/vl/points/' + points, {auth: { username: user, password: pass}}
        ).then((response) => {
            console.log(response.data.id)
            setQuestion(response.data.question);
            let arr = [response.data.correctChoice,response.data.otherChoices[0],response.data.otherChoices[1]]

            setChoice1(arr[0]);
            setChoice2(arr[1]);
            setChoice3(arr[2]);
            setquestionElementStyle({})
        })
    }, [category, points]);

    const correctChoice = (
        <div ref={correctContainer} onClickCapture={() => PlayAudio("ding")} onClick={() => {
            setConfetti(true)
            displayIcon('correct')
        }} className='border-yellow'><p ref={correctElement} className="question-text">{choice1}<BsCheckLg className="inactive-check"/></p></div>
    )

    const otherChoice1 = (
        <div ref={wrongContainer1} onClickCapture={() => PlayAudio("buzzer")} onClick={() => {
            displayIcon('wrong1')
        }} className='border-yellow'><p ref={wrongElement1} className="question-text">{choice2}<BsXLg className='inactive-x'/></p></div>
    )

    const otherChoice2 = (
        <div ref={wrongContainer2} onClickCapture={() => PlayAudio("buzzer")} onClick={() => {
            displayIcon('wrong2')
        }} className='border-yellow'><p ref={wrongElement2} className="question-text">{choice3}<BsXLg className='inactive-x'/></p></div>
    )
    
    let arr = RandomizeChoices(correctChoice,otherChoice1,otherChoice2);

    const displayA = arr[0];
    const displayB = arr[1];
    const displayC = arr[2];

    return (
        <>
        <div className='view-question'> 
            <div id="container" className='container'>
                <div style={questionElementStyle} className='question'>
                    <div className='question-row'>
                        <div hidden>
                            <h5>Category {category}</h5>
                            <h5>{points} Points</h5>
                        </div>
                        <div className='timer'>
                            <Timer/>
                        </div>
                        <h1 ref={questionElement} className='question-heading'>{question} <b style={{color: 'yellow'}} className='question-heading'>{'(' + points + ' Điểm)'}</b></h1>
                    </div>
                    <div className="choices">
                        <div className='choice-container'>
                            <TbLetterA className={'letter-icon ' + letterIcon}/>{displayA}
                        </div>
                        <div className='choice-container'>
                            <TbLetterB className={'letter-icon ' + letterIcon}/>{displayB}
                        </div>
                        <div className='choice-container'>
                            <TbLetterC className={'letter-icon ' + letterIcon}/>{displayC}
                        </div>
                    </div>
                </div>
                <Link className="link back-to-selection" to={"/vl-selection"}>Trở Về Trang Đầu</Link> 

            </div>
        </div>
        </>
    )
}

export default VLViewQuestion;