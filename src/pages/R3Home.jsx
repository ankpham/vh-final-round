import React from 'react';
import {Link} from 'react-router-dom';

const R3Home = () => {
    return (
        <div className='round-selection'>
            <div className='container'>
            <Link className="link back-to-selection-right" to={"/selection"}>Trở Về Trang Đầu</Link> 
            <h1 className='heading' style={{marginTop: '6%', fontSize: '80px'}}>Vòng III</h1>
                <div className='select-round' style={{display: 'flex', flexDirection: 'row'}}>
                    <Link style={{fontSize: '70px'}} className="link" to="/view-oer-question/3-1">Câu Hỏi 1</Link>
                    <Link style={{fontSize: '70px'}} className="link" to="/view-oer-question/3-2">Câu Hỏi 2</Link>
                    <Link style={{fontSize: '70px'}} className="link" to="/view-oer-question/3-3">Câu Hỏi 3</Link>
                </div>
            </div>
        </div>
    )
}

export default R3Home;