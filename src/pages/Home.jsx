import React from 'react';
import {Link} from 'react-router-dom';

const Home = () => {
    return (
        <div className='home'>
            <div className='container'>
                <h1 className='heading'>Niên Học 2022-23</h1>
                <h1 className='sub-heading'>Vòng Chung Kết</h1>
                <Link className="start-link link" to="/selection">Bắt Đầu</Link>
            </div>
        </div>
    )
}

export default Home;