import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
import { useParams, Link } from "react-router-dom";

//Question split into paragraphs

const ViewOERQuestion = (props) => {
    const questionElement = useRef(null);

    const [question, setQuestion] = useState('');

    const { points, category } = useParams();

    const user = "089e-weni-098w";
    const pass = "0842-0983-ibjw-2q9w";

    useEffect(()=>{
        axios.get('http://vhgamebackend.hvmatl.org:8080/get/question/round/2/category/' + category, {auth: { username: user, password: pass}}
        ).then((response) => {
            setQuestion(response.data.question);
        })
    }, [category, points]);


    return (
        <>
        <div className='view-question'> 
            <div id="container" className='container'>
                <Link className="link back-to-selection" to={"/r3-home"}>Trở Về Trang Đầu</Link> 
                <div className='question'>
                    <div className='question-row'>
                        <div hidden>
                            <h5>Category {category}</h5>
                            <h5>{points} Points</h5>
                        </div>
                        <div style={{fontSize: '70px', fontWeight: 500}} ref={questionElement} className='question-heading'>{question}</div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default ViewOERQuestion;