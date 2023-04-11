import React from 'react';

const Button = ({onClick, children}: any) => {
    return (
        <button type='button' onClick={onClick} className='rounded px-3 bg-sky-600 hover:bg-sky-700 text-white h-10'>{children}</button>
    );
};

export default Button;
