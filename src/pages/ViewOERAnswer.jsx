import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
import { useParams, Link } from "react-router-dom";

const ViewOERAnswer = () => {
    const questionContainer = useRef(null);
    const [openEndedDisplayStyle, setOpenEndedDisplayStyle] = useState(null);

    const [oerAnswer, setOerAnswer] = useState('no answer');
    const [questionElementStyle, setquestionElementStyle] = useState({display: 'none'});

    const { category, subcategory, points } = useParams();

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
        axios.get('http://localhost:8080/get/question/round/2/category/' + category + "-" + subcategory +
        '/grade/0/points/' + points, {auth: { username: user, password: pass}}
        ).then((response) => {
            if (response.data.type + "" === "oer") {
                setOpenEndedDisplayStyle("block")
                setOerAnswer(response.data.correctChoice)
            }
            else {
                setOpenEndedDisplayStyle("none")
            }

            setquestionElementStyle({})
        })
    }, [category, points, subcategory]);

    const openEnded = (
        <>
        <div style={{display: openEndedDisplayStyle}} className='question-row'>
            <div hidden>
                <h5>Subcategory {subcategory}</h5>
                <h5>Category {category}</h5>
                <h5>{points} Points</h5>
            </div>
            <h1 style={{display: "block"}} className='question-heading oer-answer'>{newLine(oerAnswer)}</h1>
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

export default ViewOERAnswer