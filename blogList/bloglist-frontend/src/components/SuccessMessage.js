import React from 'react'

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
  
  export default SuccessMessage