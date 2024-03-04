import React, { forwardRef } from 'react';

const Input = forwardRef((props, ref) => {
    return (
        <label className={`form-control w-full ${props.styles}`}>
            <div className="label">
                <span className="label-text">{props.label}</span>
            </div>
            <input ref={ref} type={props.type} className="input input-bordered w-full"/>
        </label>
    );
});

Input.displayName = 'Input';

export default Input;