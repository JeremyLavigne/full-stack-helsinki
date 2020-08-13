import React, { useState, useEffect } from 'react'
import ErrorMessage from './ErrorMessage'
import loginService from '../services/login' 
import blogService from '../services/blogs'

const Login = ({setUser}) => {
    const [errorMessage, setErrorMessage] = useState( '' ) 
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    
        if (loggedUserJSON) {  
           // loggedUserToken(loggedUserJSON)
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [setUser])
    
    const handleLogin = async (event) => {
        event.preventDefault()
    
        console.log('User going to log in')
    
        try {
          const user = await loginService.login({
            username, password,
          })
    
          window.localStorage.setItem(
            'loggedBloglistUser', JSON.stringify(user)
          ) 
    
          blogService.setToken(user.token)
          setUser(user)

          console.log('Log in succesful')

          setUsername('')
          setPassword('')
    
        } catch (exception) {
          setErrorMessage('Wrong credentials')
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        }
      }

    return (

    <>
        <h2>Log</h2>

        <form onSubmit={handleLogin}>

            <div>

                Username: <input value={username} onChange={({ target }) => setUsername(target.value)}/>
                <br />
                Password: <input type="password" value={password} onChange={({ target }) => setPassword(target.value)}/>

            </div>

            <div>
                <button type="submit">Log in</button>
            </div>

        </form>  

        <ErrorMessage 
          errorMessage={errorMessage}
        /> 

    </>

)}

export default Login