import React, { useState, useEffect } from 'react'

import blogService from './services/blogs'

import Blog from './components/Blog'
import Login from './components/Login'
import Logout from './components/Logout'
import Togglable from './components/Togglable'
import AddForm from './components/AddForm'



const App = () => {

  // ---------------------- Variable declarations --------------------------
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  // ---------------------- Blog list --------------------------
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const displayBlogs = () => {
    return (
      <>
          <h2>Blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
      </>
    )
  }

  // ---------------------- Log  --------------------------
  const loginForm = () => {
    return (
        <Togglable buttonLabel='Log in'>
          <Login setUser={setUser} /> 
        </Togglable>
    )
  }

  const logoutForm = () => {
    return (
        <Logout user={user} setUser={setUser} /> 
    )
  }
  
 // ---------------------- Add a Blog  --------------------------
  const addBlogForm = () => {
    return (
      <Togglable buttonLabel='Add a blog'>
        <AddForm createBlog={addBlog} user={user}/>
      </Togglable>
    )
  }

  const addBlog = (newBlog) => {

    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
    })

  }

  // ---------------------- Render --------------------------
  return (
    <div>

      {user === null ? loginForm() : logoutForm()}

      <br/>

      {user === null ? null : displayBlogs()}

      <br/>
      <br/>

      {user !== null && addBlogForm()}   
      
    </div>
  )
}

export default App