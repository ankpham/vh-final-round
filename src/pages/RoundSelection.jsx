import React from 'react';
import { Link } from 'react-router-dom';

const RoundSelection = () => {
    return (
        <div className='round-selection'>
            <div className='container'>
                <div className='select-round'>
                    <Link className="link" to="/r1-home">Cấp I</Link>
                    <Link className="link" to="/r2-home">Cấp II</Link>
                    <Link className="link" to="/r3-home">Cấp III</Link>
                    <Link className="link" to="/r4-home">Cấp IV</Link>
                </div>
            </div>
        </div>
    )
}

export default RoundSelection;