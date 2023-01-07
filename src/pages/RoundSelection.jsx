import React from 'react';
import { Link } from 'react-router-dom';

const RoundSelection = () => {
    return (
        <div className='round-selection'>
            <div className='container'>
                <div className='select-round'>
                    <Link className="link" to="/vl-home">Vỡ Lòng</Link>
                    <Link className="link" to="/view-question/2">Căn Bản</Link>
                    <Link className="link" to="/view-oer-question/3">Đối Kháng</Link>
                </div>
            </div>
        </div>
    )
}

export default RoundSelection;