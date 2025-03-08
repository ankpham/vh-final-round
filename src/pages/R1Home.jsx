import React from 'react';
import {Link} from 'react-router-dom';

const R1Home = () => {
    return (
        <div className='home'>
            <div className='container'>
                <Link className="link back-to-selection-right" to={"/selection"}>Trở Về Trang Đầu</Link> 
                <h1 className='heading'>Niên Học 2024-25</h1>
                <h1 className='sub-heading'>Cấp I</h1>
                <Link className="start-link link" to="/r1-selection">Bắt Đầu</Link>
            </div>
        </div>
    )
}

export default R1Home;