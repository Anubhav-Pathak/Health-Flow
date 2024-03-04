import React, { forwardRef } from 'react'

const Select = forwardRef((props, ref) => {
    return (
        <select ref={ref} className="select select-bordered w-full max-w-xs">
            <option disabled selected>{props.description}</option>
            {props.options.map((option, index) => {
                return <option key={index} value={option}>{option}</option>
            })}
        </select>
    )
});

Select.displayName = 'Select';

export default Select