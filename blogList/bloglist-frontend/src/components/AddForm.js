import React, { useState }  from 'react'
import SuccessMessage from './SuccessMessage'

const AddForm = ({createBlog, user}) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')
    const [successMessage, setSuccessMessage] = useState( '' ) 

    const addBlog = (event) => {
        event.preventDefault()
    
        const newBlog = {
          title: newTitle,
          author: newAuthor,
          url: newUrl,
          likes: 0,
          user: user
        }
    
        createBlog(newBlog)
        
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')

        setSuccessMessage(newBlog.title + " succesfully added!")
        setTimeout(() => {
           setSuccessMessage(null)
        }, 3000)
    }

    return (
        <>
            <h2>Add New blog</h2>

            <form onSubmit={addBlog}>
                <div>
                    Title: <input value={newTitle} onChange={({ target }) => setNewTitle(target.value)}/>
                    <br />
                    Author: <input value={newAuthor} onChange={({ target }) => setNewAuthor(target.value)}/>
                    <br />
                    Url: <input value={newUrl} onChange={({ target }) => setNewUrl(target.value)}/>
                </div>
                <br/>
                <div>
                    <button type="submit">Add Blog</button>
                </div>
            </form> 

            <SuccessMessage
                successMessage={successMessage}
            /> 
        </>
    )
}

export default AddForm