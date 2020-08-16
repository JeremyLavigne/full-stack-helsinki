const initialState = {
    content : '',
    display : false
}


  export const displayNotification = (content) => {
    return {
      type: 'SHOW_NOTIF',
      data : {
          content : content
      }
    }
  }

  export const hideNotification = () => {
    return {
      type: 'HIDE_NOTIF'
    }
  }
  
  const notificationReducer = (state = initialState, action) => {
    //console.log('state now: ', state)
    //console.log('action', action)
  
    switch (action.type) {
      case 'SHOW_NOTIF' :
        return (
            {
              content: action.data.content,
              display: true
            })
      case 'HIDE_NOTIF' :
        return (
            {
              content: state.content,
              display: false
            })
      default: return state
    }
  }
  
  export default notificationReducer