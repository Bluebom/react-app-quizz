import React from 'react';

type Props = {
    pergunta?: string,
    options?: string[],
    id?: string,
    value?: string | undefined,
    handleChange?: any
}

const Radio = ({pergunta, options, id, value, handleChange}: Props) => {
    return (
        <fieldset className='flex flex-col w-max-xs w-full gap-3 border border-solid border-gray-300/50 p-3'>
            <legend className='font-semibold'>{pergunta}</legend>
            {options?.map(option => {
                return (
                    <label key={option} className='flex justify-start gap-3 font-mono'>
                        <input type="radio" value={option} checked={value === option} onChange={handleChange} id={id}/>
                        {option}
                    </label>
                )
            })}
        </fieldset>
    );
};

export default Radio;
