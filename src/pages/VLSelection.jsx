import React, {useRef, useEffect} from 'react';
import usedQuestions from '../database/used-questions.json';
import {Link, useParams} from 'react-router-dom';

const VLSelection = () => {
    const heading = useRef();
    const categoryElement = useRef();

    const {grade} = useParams();

    function newUsedQuestion(category, points) {
        usedQuestions.vl[category-1].push(points);console.log(usedQuestions.vl[category-1]);

        console.log(usedQuestions)
    }

    useEffect(() => {
        let data = usedQuestions.vl;

        for (let i = 0;i<data.length;i++) {
            for (let a = 0;a<data[i].length;a++) {
                categoryElement.current.childNodes[i].childNodes[data[i][a]].classList.add('selection-used');
            }
        }

    }, [grade, heading])

    return (
        <>
        <div className="selection">
            <div className="container category">
                <Link className="link back-to-selection-right" to={"/selection"}>Trở Về Trang Đầu</Link> 
                <h1 ref={heading} className='heading background-midnight-blue'>Vòng I</h1>
                <div className='selection-container-category-points'>
                    <div ref={categoryElement} className="category">
                        <div className='column'>
                            <span className="select background-orchid border-orchid">Gia Đình</span>
                            <Link onClick={() => newUsedQuestion(1,1)} to={"/vl-view-question/1-1/10"} className="select border-orchid">10</Link>
                            <Link onClick={() => newUsedQuestion(1,2)} to={"/vl-view-question/1-1/20"} className="select border-orchid">20</Link>
                            <Link onClick={() => newUsedQuestion(1,3)} to={"/vl-view-question/1-1/30"} className="select border-orchid">30</Link>
                        </div>
                        <div className='column'>
                            <span className="select background-lightblue border-lightblue">Ngữ Vựng Chính Tả</span>
                            <Link onClick={() => newUsedQuestion(2,1)} to={"/vl-view-question/1-2/10"} className="select border-lightblue">10</Link>
                            <Link onClick={() => newUsedQuestion(2,2)} to={"/vl-view-question/1-2/20"} className="select border-lightblue">20</Link>
                            <Link onClick={() => newUsedQuestion(2,3)} to={"/vl-view-question/1-2/30"} className="select border-lightblue">30</Link>
                        </div>
                        <div className='column'>
                            <span className="select background-orange border-orange">Món Ăn</span>
                            <Link onClick={() => newUsedQuestion(3,1)} to={"/vl-view-question/1-3/10"} className="select border-orange">10</Link>
                            <Link onClick={() => newUsedQuestion(3,2)} to={"/vl-view-question/1-3/20"} className="select border-orange">20</Link>
                            <Link onClick={() => newUsedQuestion(3,3)} to={"/vl-view-question/1-3/30"} className="select border-orange">30</Link>
                        </div>
                        <div className='column'>
                            <span className="select background-red border-red">Phong Tục Tập Quán</span>
                            <Link onClick={() => newUsedQuestion(4,1)} to={"/vl-view-question/1-4/10"} className="select border-red">10</Link>
                            <Link onClick={() => newUsedQuestion(4,2)} to={"/vl-view-question/1-4/20"} className="select border-red">20</Link>
                            <Link onClick={() => newUsedQuestion(4,3)} to={"/vl-view-question/1-4/30"} className="select border-red">30</Link>
                        </div>
                        <div className='column'>
                            <span className="select background-green border-green">Lịch Sử Địa Lý</span>
                            <Link onClick={() => newUsedQuestion(5,1)} to={"/vl-view-question/1-5/10"} className="select border-green">10</Link>
                            <Link onClick={() => newUsedQuestion(5,2)} to={"/vl-view-question/1-5/20"} className="select border-green">20</Link>
                            <Link onClick={() => newUsedQuestion(5,3)} to={"/vl-view-question/1-5/30"} className="select border-green">30</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default VLSelection;