import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Log from './components/Log'
import AddForm from './components/AddForm'
import ErrorMessage from './components/Messages'
//import SuccessMessage from './components/Messages'
import blogService from './services/blogs'
import loginService from './services/login' 



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState( '' ) 
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])



  const loginForm = () => {
    return (
      <>
        <h2>Log</h2>
        <Log 
          onSubmit={handleLogin}
          newUsername={username}
          newPass={password}
          onChangeUsername={handleUsernameChange}
          onChangePass={handlePassChange}
        />

        <ErrorMessage 
          errorMessage={errorMessage}
        />  
      </>
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    console.log('User in going to log')

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 

      console.log('Log in succesful')

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    console.log('log out')
  }


  const addBlogForm = () => {
    return (
      <>
        <h2>Add New blog</h2>
        <AddForm 
          onSubmit={addBlog}
          newTitle={newTitle}
          newAuthor={newAuthor}
          newUrl={newUrl}
          onChangeTitle={handleTitleChange}
          onChangeAuthor={handleAuthorChange}
          onChangeUrl={handleUrlChange}
        />
      </>
    )
  }

  const addBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0,
      user: user
    }

    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
      })

  }


  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }
  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const handlePassChange = (event) => {
    setPassword(event.target.value)
  }


  return (
    <div>

      {user === null ? loginForm() :
        <div>
          <p>{user.name} logged-in <button onClick={handleLogout}>Logout</button></p>
        </div>
      }

      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

    {user !== null && addBlogForm()}   
      
    </div>
  )
}

export default App