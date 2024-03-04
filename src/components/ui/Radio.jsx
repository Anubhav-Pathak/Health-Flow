import React, { forwardRef } from 'react'

const Radio = forwardRef((props, ref) => {
    return (
        <div className="form-control">
                <label className="label cursor-pointer">
                        <span className="label-text">{props.label}</span> 
                        <input ref={ref} type="radio" name={props.name} className="radio"/>
                </label>
        </div>
    )
});

Radio.displayName = 'Radio';

export default Radio