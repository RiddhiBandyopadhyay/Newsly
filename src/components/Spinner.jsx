import React from 'react';
import loader from './loader.gif'

const Spinner = () => {
  
    return (
        <div className='text-center'>
            <img style={{width : "6%"}} src={loader} alt="loading..." />
        </div>
    )
  
}

export default Spinner;

