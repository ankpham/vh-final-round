import React from 'react';
import { Link } from 'react-router-dom';

const RoundSelection = () => {
    return (
        <div className='round-selection'>
            <div className='container'>
                <div className='select-round'>
                    <Link className="link" to="/r1-home">Chung Kết I</Link>
                    <Link className="link" to="/r2-home">Chung Kết II</Link>
                    <Link className="link" to="/r3-home">Chung Kết II</Link>
                </div>
            </div>
        </div>
    )
}

export default RoundSelection;