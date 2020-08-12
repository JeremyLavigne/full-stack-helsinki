import React from 'react'
/*
const SuccessMessage = ({successMessage}) => {
    const successMsgStyle = {
      color: 'green',
      fontStyle: 'italic',
      fontSize: 16
    }
  
    if (successMessage !== '') {
      return (
        <p style={successMsgStyle}>{successMessage}</p>
      )
    } else {
      return null
    }
  }
  */
  const ErrorMessage = ({errorMessage}) => {
    const errorMsgStyle = {
      color: 'red',
      fontStyle: 'bold',
      fontSize: 18
    }
  
    if (errorMessage !== '') {
      return (
        <p style={errorMsgStyle}>{errorMessage}</p>
      )
    } else {
      return null
    }
  }

  export default ErrorMessage