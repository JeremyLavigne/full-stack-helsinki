import React from 'react'

const Logout = ({user, setUser}) => {

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBloglistUser')
        setUser(null)
        console.log('log out')
    }

    return (
        <div>
            <p>{user.name} logged-in</p> 
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Logout