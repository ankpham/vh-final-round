import React from 'react';
import {Link} from 'react-router-dom';

const VLHome = () => {
    return (
        <div className='home'>
            <div className='container'>
                <h1 className='heading'>Niên Học 2022-23</h1>
                <h1 className='sub-heading'>Vòng Loại</h1>
                <Link className="start-link link" to="/vl-selection">Bắt Đầu</Link>
            </div>
        </div>
    )
}

export default VLHome;