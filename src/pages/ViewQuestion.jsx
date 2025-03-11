import axios from 'axios';
import React, {useMemo, useState, useEffect, useRef} from 'react';
import party from 'party-js';
import Timer from './Timer';
import {TbLetterA, TbLetterB, TbLetterC, TbLetterD} from 'react-icons/tb';
import {BsCheckLg, BsXLg} from 'react-icons/bs';
import { useParams, Link } from "react-router-dom";
import { PlayAudio } from '../components/PlayAudio';
import { RandomizeChoices } from '../components/RandomizeChoices';
import { SetChoiceAtBottom } from '../components/SetChoiceAtBottom';

const ViewQuestion = () => {
    const timerElementMC = useRef(null);
    const timerElementOER = useRef(null);
    const questionContainer = useRef(null);
    const questionElement = useRef(null);
    const correctElement = useRef(null);
    const wrongElement1 = useRef(null);
    const wrongElement2 = useRef(null);
    const wrongElement3 = useRef(null);
    const correctContainer = useRef(null);
    const wrongContainer1 = useRef(null);
    const wrongContainer2 = useRef(null);
    const wrongContainer3 = useRef(null);
    const [multipleChoiceDisplayStyle, setMultipleChoiceDisplayStyle]= useState("none");
    const [multipleChoiceAnswersDisplayStyle, setMultipleChoiceAnswersDisplayStyle] = useState("none");
    const [openEndedDisplayStyle, setOpenEndedDisplayStyle] = useState(null);
    const [openEndedAnswerButtonDisplayStyle, setOpenEndedAnswerButtonDisplayStyle] = useState(null);
    const [letterIcon, setLetterIcon] = useState('');

    const [question, setQuestion] = useState('no question');
    const [images, setImages] = useState([]);
    const [choice1, setChoice1] = useState('no choice');
    const [choice2, setChoice2] = useState('no choice');
    const [choice3, setChoice3] = useState('no choice');
    const [choice4, setChoice4] = useState('no choice');
    const [questionElementStyle, setquestionElementStyle] = useState({display: 'none'});

    const { category, subcategory, points, seconds } = useParams();

    let selectionMapping = useMemo(() => 
        new Map([
            ["1", "border-orchid"], ["2", "border-lightblue"], ["3", "border-yellow"], 
            ["4", "border-red"], ["5", "border-green"]
        ])
    , [])

    let selectionMappingBackground = useMemo(() => 
        new Map([
            ["1", "background-orchid"], ["2", "background-lightblue"], ["3", "background-yellow"], 
            ["4", "background-red"], ["5", "background-green"]
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
        else if (questionLocation === 'wrong3') {
            wrongContainer3.current.childNodes[1].classList.add('active-x-check');
        }
    }

    const user = "089e-weni-098w";
    const pass = "0842-0983-ibjw-2q9w";

    useEffect(()=>{
        correctContainer.current.classList.add(selectionMapping.get(category))
        wrongContainer1.current.classList.add(selectionMapping.get(category))
        wrongContainer2.current.classList.add(selectionMapping.get(category))
        wrongContainer3.current.classList.add(selectionMapping.get(category))
        setLetterIcon(selectionMappingBackground.get(category))
        
        axios.get('http://localhost:8080/get/question/round/2/category/' + category + "-" + subcategory +
        '/grade/0/points/' + points, {auth: { username: user, password: pass}}
        ).then((response) => {
            if (response.data.type + "" === "oer") {
                setOpenEndedDisplayStyle("block")
                setOpenEndedAnswerButtonDisplayStyle("block")
                setMultipleChoiceDisplayStyle("none")
                setMultipleChoiceAnswersDisplayStyle("none")
            }
            else {
                setOpenEndedDisplayStyle("none")
                setOpenEndedAnswerButtonDisplayStyle("none")
                setMultipleChoiceDisplayStyle("block")
                setMultipleChoiceAnswersDisplayStyle("block")
            }

            setQuestion(response.data.question);

            if (response.data.images) {
                if (response.data.images.indexOf(";") >= 0) {
                    setImages(
                       response.data.images.split(";")
                    )
                }
                else {
                    setImages(
                        [response.data.images]
                    )
                }
            }
            console.log(images)

            let arr = [response.data.correctChoice,response.data.otherChoices[0],response.data.otherChoices[1],response.data.otherChoices[2]]

            setChoice1(arr[0]);
            setChoice2(arr[1]);
            setChoice3(arr[2]);
            setChoice4(arr[3]);
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

    const otherChoice3 = (
        <div ref={wrongContainer3} onClickCapture={() => PlayAudio('buzzer')} onClick={() => {
            displayIcon('wrong3')
        }} className='border-yellow'><p ref={wrongElement3} className="question-text">{choice4}</p><BsXLg className='inactive-x'/></div>
    )

    let arr = RandomizeChoices(correctChoice,otherChoice1,otherChoice2,otherChoice3);
    
    //For questions with this answer choice
    if (choice1.trim() === "Cả hai câu đều đúng." || choice1.trim() === "Không có câu đúng" || choice1.trim() === "Không có câu trả lời đúng" || choice1.trim() === "Cả hai câu a và b đều đúng.") {
        arr = SetChoiceAtBottom(arr, correctChoice);
    }
    else if (choice2.trim() === "Cả hai câu đều đúng." || choice2.trim() === "Không có câu đúng" || choice2.trim() === "Không có câu trả lời đúng" || choice2.trim() === "Cả hai câu a và b đều đúng.") {
        arr = SetChoiceAtBottom(arr, otherChoice1);
    }
    else if (choice3.trim() === "Cả hai câu đều đúng." || choice3.trim() === "Không có câu đúng" || choice3.trim() === "Không có câu trả lời đúng" || choice3.trim() === "Cả hai câu a và b đều đúng.") {
        arr = SetChoiceAtBottom(arr, otherChoice2);
    }
    else if (choice4.trim() === "Cả hai câu đều đúng." || choice4.trim() === "Không có câu đúng" || choice4.trim() === "Không có câu trả lời đúng" || choice4.trim() === "Cả hai câu a và b đều đúng.") {
        arr = SetChoiceAtBottom(arr, otherChoice3);
    }
    
    const displayA = arr[0];
    const displayB = arr[1];
    const displayC = arr[2];
    const displayD = arr[3];

    //New line and bold
    const parseNewLine = (str) => {
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
                    {parseBoldText(item.data)}<br></br>
                </div>
            ))}
            </>
        )

        return answer;
    }
    const parseBoldText = (input) => {
        return input.split(/(\*\*.*?\*\*)/).map((part, index) => {
          if (part.match(/\*\*(.*?)\*\*/)) {
            return <strong key={index}>{part.replace(/\*\*/g, "")}</strong>;
          }
          return part;
        });
    }

    const multipleChoice = (
            <>
            <div style={{display: multipleChoiceDisplayStyle}} className='question-row'>
                <div hidden>
                    <h5>Category {category}</h5>
                    <h5>Subcategory {subcategory}</h5>
                    <h5>{points} Points</h5>
                </div>
                <div ref={timerElementMC} className='timer'>
                    <Timer seconds={seconds}/>
                </div>
                <h1 ref={questionElement} className='question-heading'>{parseNewLine(question)} <b style={{color: 'yellow'}} className='question-heading'>{/*(10 Điểm)*/}</b></h1>
                <div className='question-image-container-mc'>
                    {
                        images.map((image, idx) => (
                            <>
                            <img alt={image} className='question-image' src={image} key={idx}/>
                            </>
                        ))
                    }
                </div>
                <div className='question-image-container-mc question-image-container-mc-right'>
                    {
                        images.map((image, idx) => (
                            <>
                            <img alt={image} className='question-image' src={image} key={idx}/>
                            </>
                        ))
                    }
                </div>
            </div>
            <div style={{display: multipleChoiceAnswersDisplayStyle}} className="choices">
                <div className='choice-container'>
                    <TbLetterA className={'letter-icon ' + letterIcon}/>{displayA}
                </div>
                <div className='choice-container'>
                    <TbLetterB className={'letter-icon ' + letterIcon}/>{displayB}
                </div>
                <div className='choice-container'>
                    <TbLetterC className={'letter-icon ' + letterIcon}/>{displayC}
                </div>
                <div className='choice-container'>
                    <TbLetterD className={'letter-icon ' + letterIcon}/>{displayD}
                </div>
            </div>
            </>
    )

    const openEnded = (
        <>
        <div style={{display: openEndedDisplayStyle}} className='question-row'>
            <div hidden>
                <h5>Subcategory {subcategory}</h5>
                <h5>Category {category}</h5>
                <h5>{points} Points</h5>
            </div>
            <div ref={timerElementOER} className='timer'>
                <Timer seconds={seconds}/>
            </div>
            <h1 ref={questionElement} className='question-heading'>{parseNewLine(question)}</h1>
                <div className='question-image-container-oer'>
                    {
                        images.map((image, idx) => (
                            <>
                            <img alt={image} className='question-image' src={image} key={idx}/>
                            </>
                        ))
                    }
                </div>
            <Link to={"/view-oer-question/" + category + "/" + subcategory + "/" + points} style={{display: openEndedAnswerButtonDisplayStyle,color: 'green', cursor: 'pointer', border: '1px solid green', padding: '5px', marginTop: "15vh"}} className='question-heading'>Câu Trả Lời Đúng</Link>
        </div>
        </>
    )
    
    return (
        <>
        <div className='view-question'> 
            <div id="container" className='container'>
                <div ref={questionContainer} style={questionElementStyle} className='question'>
                    {multipleChoice}
                    {openEnded}
                </div>
                <Link className="link back-to-selection" to={"/r" + category + "-selection/"}>Trở Về Trang Đầu</Link> 
            </div>
        </div>
        </>
    )
}

export default ViewQuestion;
