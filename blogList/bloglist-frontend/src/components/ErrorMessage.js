import React from 'react'

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