import React, { useState, useEffect } from 'react'
import personService from './services/persons'


const SuccessMsg = ({successMsg}) => {
  const successMsgStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  if (successMsg !== '') {
    return (
      <p style={successMsgStyle}>{successMsg}</p>
    )
  } else {
    return null
  }
}

const ErrorMsg = ({errorMsg}) => {
  const errorMsgStyle = {
    color: 'red',
    fontStyle: 'bold',
    fontSize: 18
  }

  if (errorMsg !== '') {
    return (
      <p style={errorMsgStyle}>{errorMsg}</p>
    )
  } else {
    return null
  }
}

const Filter = ({onChange, filter}) => {
    return ( 
     <div>
        Filter : <input value={filter} onChange={onChange}/>
     </div> 
    )
}

const AddSomeone = ({onSubmit, newName, newNumber, onChange, onChange2}) => {
    return (  
      <form onSubmit={onSubmit}>
        <div>
          Name: <input value={newName} onChange={onChange}/>
          <br />
          Number: <input value={newNumber} onChange={onChange2}/>
        </div>
        <br />
        <div>
          <button type="submit">Add Name</button>
        </div>
      </form>   
    )
}

const Numbers = ({persons, filter, onClick}) => {
    return (
        <ul>
            {persons
            .filter((person) => person.name.toLowerCase().includes(filter))
            .map((person) => <li key={person.name}>{person.name}, {person.number}<button onClick={(id, name) => onClick(person.id, person.name)}>&#9760;</button></li>)}
        </ul>
    )
}



const App = () => {

    // ------------------ Variables ------------------

  const [ persons, setPersons ] = useState([])  // Contains all persons
  const [ newName, setNewName ] = useState('')  // Contain Name of the person to add
  const [ newNumber, setNewNumber ] = useState('') // Contain Number of the person to add
  const [ filter, setFilter ] = useState('') // Contain the content of the filter input
  const [ successMsg, setSuccessMsg ] = useState( '' ) 
  const [ errorMsg, setErrorMsg ] = useState( '' ) 

  // Fill "persons" array with json file, on server
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled (getAll, first)')
        setPersons(initialPersons)
      })
  }, [])


    // ----------------- Methods ---------------------

  const addSomeone = (event) => {
    event.preventDefault()

    console.log("already in array ? ", persons.map((person) => person.name).includes(newName))

    if (!persons.map((person) => person.name).includes(newName)) {
        const personObject = {
            name : newName,
            number : newNumber
        }

        // Add it to the server
        personService
          .create(personObject)
          .then(personObject => {
            console.log('promise fulfilled (create), with new object :', personObject)
            setPersons(persons.concat(personObject))
          })
    
        // Display message during two seconds
        setSuccessMsg(`${newName} has been successfully add`)
        setTimeout(() => {
          setSuccessMsg('')
        }, 2000)

        // Reinitialize Name and Number for the next one
        setNewName('')
        setNewNumber('')

    } else {
        // If name already exist, ask for changing the number, and so update it
        if (window.confirm(`${newName} is already added to phonebook, would you like to change the number?`)) {
          
          // How to get the id ? 
          console.log(persons.filter((person) => person.name === newName))

          const id = persons.filter((person) => person.name === newName)[0].id
          const updateObject = {
            name : newName,
            number : newNumber
          }

          personService
            .update(id, updateObject)
            .then(updateObject => {
              console.log('promise fulfilled (update), with object :', updateObject)
              setPersons(persons.map((person) => person.name !== newName ? person : updateObject))
            })
            .catch(error => { 
              setErrorMsg(
                `Person '${newName}' was already removed from server`
              )
              setTimeout(() => {
                setErrorMsg('')
              }, 3000)
              setPersons(persons.filter(p => p.id !== id))
            })
        
        } else {
          console.log("Cancelled, nothing changes")
          setNewName('')
          setNewNumber('')
        }
    }
  }

  const deleteSomeone = (id, name) => {


    console.log('Zoup, you are dead, you with id :', id, 'and name :', name)

    personService
      .deletePerson(id)
      .then(()=> {
        console.log('promise fulfilled (delete), object id :', id)

        // Works, but let the old id (if you delete id 5, old id 6 stays at 6 and not become 5)
        // Is it that bad?
        setPersons(persons.filter(p => p.id !== id))

      }) 
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  //console.log("Persons array :", persons, " , newName variable :", newName, " , newNumber variable :", newNumber," , filter variable :", filter)

  return (
    <div>

      <h2>Phonebook</h2>
      <SuccessMsg 
        successMsg={successMsg}
      />
      <Filter 
        onChange={handleFilterChange}
        filter={filter}
      /> 

      <h2>Add someone</h2>
      <AddSomeone 
        onSubmit={addSomeone}
        newName={newName}
        newNumber={newNumber}
        onChange={handleNameChange}
        onChange2={handleNumberChange}
      /> 

      <h2>Numbers</h2>
      <ErrorMsg 
        errorMsg={errorMsg}
      />

      <Numbers 
        persons={persons}
        filter={filter}
        onClick={deleteSomeone}
      />

    </div>
  )
}

export default App