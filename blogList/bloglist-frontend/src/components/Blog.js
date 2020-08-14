import React, { useState } from 'react'


const Blog = ({ blog, updateBlog, userName, removeBlog}) => {
  const titleStyle = { fontWeight : 'bold'}
  const authorStyle = { textDecoration : 'underline', marginRight : '10px'}
  const blocStyle = { 
    border : 'solid 1px black',
    marginBottom : '5px',
    padding : '2px'
  }
  const likeItButtonStyle = { marginLeft : '10px'}
  const paragrapheStyle = { margin : '2px'}

  const [extendedView, setExtendedView] = useState(false)

  const hideWhenExtendedView = { display: extendedView ? 'none' : '' }
  const showWhenExtendedView = { display: extendedView ? '' : 'none' }

  const maximiseView = () => {
    setExtendedView(true)
  }

  const minimiseView = () => {
    setExtendedView(false)
  }



  const addLike = () => {
    console.log('Supposed to update the number of like here')

    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user
    }
    updateBlog(blog.id, updatedBlog)

    //console.log('inside the add like function', blog)
  }

  const deleteBlog = () => {
    console.log('Going to delete the blog', blog.name)

    removeBlog(blog.id)
  }

  return (
    <div style={blocStyle}>

      <p style={paragrapheStyle}>

        <span style={titleStyle}> {blog.title}, </span>
        <span style={authorStyle}>{blog.author} </span>

        <button style={hideWhenExtendedView} onClick={maximiseView}>+</button>
      </p>

      <div style={showWhenExtendedView}>

        <p>
          Visit it : <a href={blog.url}>{blog.url}</a> <br />

          Likes : {blog.likes}
          <button style={likeItButtonStyle} onClick={addLike}>Like it</button> <br/>

          Added by "{blog.user.name}"</p>

        {userName === blog.user.name && <button onClick={deleteBlog}>Delete</button>}

        <button onClick={minimiseView}>-</button>

      </div>

    </div>
  )
}

export default Blog
