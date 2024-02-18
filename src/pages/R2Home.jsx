import React from 'react';
import {Link} from 'react-router-dom';

const R2Home = () => {
    return (
        <div className='home'>
            <div className='container'>
                <Link className="link back-to-selection-right" to={"/selection"}>Trở Về Trang Đầu</Link> 
                <h1 className='heading'>Niên Học 2023-24</h1>
                <h1 className='sub-heading'>Chung Kết II</h1>
                <Link className="start-link link" to="/r2-selection">Bắt Đầu</Link>
            </div>
        </div>
    )
}

export default R2Home;