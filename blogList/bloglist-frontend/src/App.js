import React, { useState, useEffect, useRef } from 'react'

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
  const addBlogFormRef = useRef()

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
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog}/>
          )}
      </>
    )
  }

  // ---------------------- Log  --------------------------
  const loginForm = () => {
    const italic = { fontStyle : 'italic'}
    return (
      <>
        <div>
          <p>Please log yourself to access the blog list</p>
          <p style={italic}>Use "myUsername" / "mySecretPass" for a trial version</p>
        </div>
        <Togglable buttonLabel='Log in'>
          <Login setUser={setUser} /> 
        </Togglable>
      </>
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
      <Togglable buttonLabel='Add a blog' ref={addBlogFormRef}>
        <AddForm createBlog={addBlog} user={user}/>
      </Togglable>
    )
  }

  const addBlog = (newBlog) => {
    addBlogFormRef.current.toggleVisibility()

    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
    })

  }

  const updateBlog = (id, updatedBlog) => {
    console.log('We are in the good place')

    console.log(id, updatedBlog)
    blogService
      .update(id, updatedBlog)
      .then(updatedBlog => {
        setBlogs(blogs.map((blog) => blog.id !== id ? blog : updatedBlog))
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