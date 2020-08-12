import React from 'react'

const Log = ({onSubmit, newUsername, newPass, onChangeUsername, onChangePass}) => (
    <form onSubmit={onSubmit}>
        <div>
            Username: <input value={newUsername} onChange={onChangeUsername}/>
            <br />
            Password: <input type="password" value={newPass} onChange={onChangePass}/>
        </div>
        <div>
            <button type="submit">Log in</button>
        </div>
    </form>  
)

export default Log