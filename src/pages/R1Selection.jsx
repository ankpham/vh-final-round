import React, {useRef, useEffect} from 'react';
import usedQuestions from '../database/used-questions.json';
import {Link} from 'react-router-dom';

const R1Selection = () => {
    const heading = useRef();
    const categoryElement = useRef();

    useEffect(() => {
        //remove used questions
        let data = usedQuestions.r1;
        
        for (let i = 0;i<data.length;i++) {
            for (let a = 0;a<data[i].length;a++) {
                categoryElement.current.childNodes[i].childNodes[data[i][a]].classList.add('selection-used');
            }
        }
    }, [])

    //adds used questions
    function newUsedQuestion(column, points) {
        usedQuestions.r1[column-1].push(points-1);
    }

    return (
        <>
        <div className="selection">
            <div className="container category">
                <Link className="link back-to-selection-right" to={"/r1-home/"}>Trở Về Trang Đầu</Link> 
                <h1 ref={heading} className='heading background-lightblue'>Cấp I</h1>
                <div className='selection-container-category-points'>
                    <div ref={categoryElement} className="category">
                        <div className="question-container">
                            <Link onClick={() => newUsedQuestion(1,1)} to={"/view-question/1/1/1/15"} className="select border-red">1</Link>
                            <Link onClick={() => newUsedQuestion(1,2)} to={"/view-question/1/1/2/15"} className="select border-red">2</Link>
                            <Link onClick={() => newUsedQuestion(1,3)} to={"/view-question/1/1/3/15"} className="select border-red">3</Link>
                            <Link onClick={() => newUsedQuestion(1,4)} to={"/view-question/1/1/4/15"} className="select border-red">4</Link>
                            <Link onClick={() => newUsedQuestion(1,5)} to={"/view-question/1/1/5/15"} className="select border-red">5</Link>
                            <Link onClick={() => newUsedQuestion(1,6)} to={"/view-question/1/1/6/15"} className="select border-red">6</Link>
                            <Link onClick={() => newUsedQuestion(1,7)} to={"/view-question/1/1/7/15"} className="select border-red">7</Link>
                            <Link onClick={() => newUsedQuestion(1,8)} to={"/view-question/1/1/8/15"} className="select border-red">8</Link>
                            <Link onClick={() => newUsedQuestion(1,9)} to={"/view-question/1/1/9/15"} className="select border-red">9</Link>
                            <Link onClick={() => newUsedQuestion(1,10)} to={"/view-question/1/1/10/15"} className="select border-red">10</Link>
                            <Link onClick={() => newUsedQuestion(1,11)} to={"/view-question/1/2/1/15"} className="select select-bottom border-lightblue">Câu Dự Bị I</Link>
                            <Link onClick={() => newUsedQuestion(1,12)} to={"/view-question/1/2/2/15"} className="select select-bottom border-lightblue">Câu Dự Bị II</Link>
                            <Link onClick={() => newUsedQuestion(1,13)} to={"/view-question/1/2/3/15"} className="select select-bottom border-lightblue">Câu Dự Bị III</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default R1Selection;