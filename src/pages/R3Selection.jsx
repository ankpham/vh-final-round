import React, {useRef, useEffect, useState} from 'react';
import usedQuestions from '../database/used-questions.json';
import {Link} from 'react-router-dom';

const R1Selection = () => {
    const heading = useRef();
    const categoryElement = useRef();

    useEffect(() => {
        //remove used questions
        let data = usedQuestions.r3;
        
        for (let i = 0;i<data.length;i++) {
            for (let a = 0;a<data[i].length;a++) {
                categoryElement.current.childNodes[i].firstElementChild.childNodes[data[i][a]].classList.add('selection-used');
            }
        }
    }, [heading])

    //adds used questions
    function newUsedQuestion(category, points) {
        usedQuestions.r3[category-1].push(points);
    }

    return (
        <>
        <div className="selection">
            <div className="container category">
                <Link className="link back-to-selection-right" to={"/r3-home/"}>Trở Về Trang Đầu</Link> 
                <h1 ref={heading} className='heading background-lightblue'>Chung Kết II</h1>
                <div className='selection-container-category-points'>
                    <div ref={categoryElement} className="category">
                        <div className="column-container">
                            <div className='column'>
                                <div className='select-heading-container select background-red border-red'>
                                    <span>Lượt I</span>
                                </div>
                                <Link onClick={() => newUsedQuestion(1,1)} to={"/view-question/3/1/1"} className="select border-red">1</Link>
                                <Link onClick={() => newUsedQuestion(1,2)} to={"/view-question/3/1/2"} className="select border-red">2</Link>
                                <Link onClick={() => newUsedQuestion(1,3)} to={"/view-question/3/1/3"} className="select border-red">3</Link>
                            </div>
                        </div>
                        <div className="column-container">
                            <div className='column'>
                                <div>
                                </div>
                                <Link onClick={() => newUsedQuestion(2,1)} to={"/view-question/3/3/1"} className="select select-bottom border-lightblue">Câu Dự Bị</Link>
                            </div>
                        </div>
                        <div className="column-container">
                            <div className='column'>
                                <div className='select-heading-container select background-yellow border-yellow'>
                                    <span>Lượt II</span>
                                </div>
                                <Link onClick={() => newUsedQuestion(3,1)} to={"/view-question/3/2/1"} className="select border-yellow">1</Link>
                                <Link onClick={() => newUsedQuestion(3,2)} to={"/view-question/3/2/2"} className="select border-yellow">2</Link>
                                <Link onClick={() => newUsedQuestion(3,3)} to={"/view-question/3/2/3"} className="select border-yellow">3</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default R1Selection;