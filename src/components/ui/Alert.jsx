import React from 'react'

const colourVariants = {
  error: "alert-error",
  success: "alert-success",
  warning: "alert-warning",
  info: "alert-info",
};

const Alert = (props) => {
  return (
    <div role="alert" className={`"alert ${colourVariants[props.type]}`}>
      <span>{props.message}</span>
    </div>
  )
}

export default Alert