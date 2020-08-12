import React from 'react'

const AddForm = ({onSubmit, newTitle, newAuthor, newUrl, onChangeTitle, onChangeAuthor, onChangeUrl}) => (
    <form onSubmit={onSubmit}>
        <div>
            Title: <input value={newTitle} onChange={onChangeTitle}/>
            <br />
            Author: <input value={newAuthor} onChange={onChangeAuthor}/>
            <br />
            Url: <input value={newUrl} onChange={onChangeUrl}/>
        </div>
        <br />
        <div>
            <button type="submit">Add Blog</button>
        </div>
    </form>  
)

export default AddForm