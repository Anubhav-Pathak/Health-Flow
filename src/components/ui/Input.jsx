import React from "react";

const Input = React.forwardRef(
  ({ style, label, input, error }, ref) => {
    return (
      <div className={style}>
        {label && <label htmlFor={input.id}>{label}</label>}
        <input ref={ref} {...input} />
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    );
  }
);

export default Input;
