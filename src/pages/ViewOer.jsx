import axios from 'axios';
import React, {useMemo, useState, useEffect, useRef} from 'react';
import party from 'party-js';
import {BsCheckLg, BsXLg} from 'react-icons/bs';
import { useParams, Link } from "react-router-dom";
import { PlayAudio } from '../components/PlayAudio';
import { RandomizeChoices } from '../components/RandomizeChoices';
import { SetChoiceAtBottom } from '../components/SetChoiceAtBottom';

const ViewOER = () => {
    const timerElementMC = useRef(null);
    const timerElementOER = useRef(null);
    const questionContainer = useRef(null);
    const correctElement = useRef(null);
    const wrongElement1 = useRef(null);
    const wrongElement2 = useRef(null);
    const correctContainer = useRef(null);
    const wrongContainer1 = useRef(null);
    const wrongContainer2 = useRef(null);
    const [openEndedDisplayStyle, setOpenEndedDisplayStyle] = useState(null);
    const [openEndedAnswerDisplayStyle, setOpenEndedAnswerDisplayStyle] = useState("none")
    const [openEndedAnswerButtonDisplayStyle, setOpenEndedAnswerButtonDisplayStyle] = useState(null);

    const [oerAnswer, setOerAnswer] = useState('no answer');
    const [choice1, setChoice1] = useState('no choice');
    const [choice2, setChoice2] = useState('no choice');
    const [choice3, setChoice3] = useState('no choice');
    const [questionElementStyle, setquestionElementStyle] = useState({display: 'none'});

    const { category, subcategory, points } = useParams();

    let selectionMapping = useMemo(() => 
        new Map([
            ["1", "border-orchid"], ["2", "border-lightblue"], ["3", "border-yellow"], 
            ["4", "border-red"], ["5", "border-green"]
        ])
    , [])
    //Confetti Effect
    const setConfetti = () => {
        party.confetti(questionContainer.current, {
            count: party.variation.range(40, 50),
            size: party.variation.range(2, 2.5),
            spread: party.variation.range(80, 130)
        });
        /*party.sparkles(questionContainer.current, {
            count: party.variation.range(20, 25),
            size: party.variation.range(2, 2.5),
            spread: party.variation.range(80, 130)
        });*/
    }

    const displayIcon = (questionLocation) => {
        if (questionLocation === 'correct') {
            correctContainer.current.childNodes[1].classList.add('active-x-check')
            timerElementMC.current.remove();
            timerElementOER.current.remove();
        }
        else if (questionLocation === 'wrong1') {
            wrongContainer1.current.childNodes[1].classList.add('active-x-check');
        }
        else if (questionLocation === 'wrong2') {
            wrongContainer2.current.childNodes[1].classList.add('active-x-check');
        }
    }

    const user = "089e-weni-098w";
    const pass = "0842-0983-ibjw-2q9w";
    
    //New line for oer snswers
    const newLine = (str) => {
        let newArr = str.split("*newline*");

        let arrOfObjects = [];

        for (let i = 0;i < newArr.length;i++) {
            arrOfObjects.push({
                data: newArr[i] 
            })
        }

        let answer = (
            <>
            {arrOfObjects.map((item) => (
                <div>
                    {item.data}<br></br>
                </div>
            ))}
            </>
        )

        return answer;
    }

    useEffect(()=>{
        correctContainer.current.classList.add(selectionMapping.get(category))
        wrongContainer1.current.classList.add(selectionMapping.get(category))
        wrongContainer2.current.classList.add(selectionMapping.get(category))
        
        axios.get('http://vhbackend.hvmatl.org:8080/get/question/round/2/category/' + category + "-" + subcategory +
        '/grade/0/points/' + points, {auth: { username: user, password: pass}}
        ).then((response) => {
            if (response.data.type + "" === "oer") {
                setOpenEndedDisplayStyle("block")
                setOpenEndedAnswerButtonDisplayStyle("block")
                setOerAnswer(response.data.correctChoice)
            }
            else {
                setOpenEndedDisplayStyle("none")
                setOpenEndedAnswerButtonDisplayStyle("none")
            }

            let arr = [response.data.correctChoice,response.data.otherChoices[0],response.data.otherChoices[1]]

            setChoice1(arr[0]);
            setChoice2(arr[1]);
            setChoice3(arr[2]);
            setquestionElementStyle({})
        })
    }, [category, points, subcategory]);
    
    const correctChoice = (
        <div ref={correctContainer} onClickCapture={() => PlayAudio('ding')} onClick={() => {
            setConfetti(true)
            displayIcon('correct')
        }} className='border-yellow'><p ref={correctElement} className="question-text">{choice1}</p><BsCheckLg className="inactive-check"/></div>
    )

    const otherChoice1 = (
        <div ref={wrongContainer1} onClickCapture={() => PlayAudio("buzzer")} onClick={() => {
            displayIcon('wrong1')
        }} className='border-yellow'><p ref={wrongElement1} className="question-text">{choice2}</p><BsXLg className='inactive-x'/></div>
    )

    const otherChoice2 = (
        <div ref={wrongContainer2} onClickCapture={() => PlayAudio('buzzer')} onClick={() => {
            displayIcon('wrong2')
        }} className='border-yellow'><p ref={wrongElement2} className="question-text">{choice3}</p><BsXLg className='inactive-x'/></div>
    )
    
    const openEnded = (
        <>
        <div style={{display: openEndedDisplayStyle}} className='question-row'>
            <div hidden>
                <h5>Subcategory {subcategory}</h5>
                <h5>Category {category}</h5>
                <h5>{points} Points</h5>
            </div>
            <h1 onClick={() => {
                setOpenEndedAnswerDisplayStyle("block")
                setOpenEndedAnswerButtonDisplayStyle("none")
                timerElementMC.current.remove();
                timerElementOER.current.remove();
            }} style={{display: openEndedAnswerButtonDisplayStyle,color: 'green', cursor: 'pointer', border: '1px solid green', padding: '5px', marginTop: "15vh"}} className='question-heading'>Câu Trả Lời Đúng</h1>
            <h1 style={{display: openEndedAnswerDisplayStyle}} className='question-heading oer-answer'>{newLine(oerAnswer)}</h1>
        </div>
        </>
    )
    
    return (
        <>
        <div className='view-question'> 
            <div id="container" className='container'>
                <div ref={questionContainer} style={questionElementStyle} className='question'>
                    {openEnded}
                </div>
                <Link className="link back-to-selection" to={"/r" + category + "-selection/"}>Trở Về Trang Đầu</Link> 
            </div>
        </div>
        </>
    )
}

export default ViewOER