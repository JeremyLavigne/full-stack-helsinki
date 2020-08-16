import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const styleDisplay = {
    border: 'solid',
    marginTop: 10,
    padding: 10,
    borderWidth: 1
  }
  const styleHide = {
    display: 'none'
  }

  return (
    <div style={notification.display ? styleDisplay : styleHide}>
      {notification.content}
    </div>
  )
}

export default Notification