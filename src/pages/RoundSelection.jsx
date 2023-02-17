import React from 'react';
import { Link } from 'react-router-dom';

const RoundSelection = () => {
    return (
        <div className='round-selection'>
            <div className='container'>
                <div className='select-round'>
                    <Link className="link" to="/vl-selection">Vòng I</Link>
                    <Link className="link" to="/r2-home">Vòng II</Link>
                    {/*<Link className="link" to="/r3-home">Vòng III</Link>*/}
                </div>
            </div>
        </div>
    )
}

export default RoundSelection;