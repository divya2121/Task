import React, { useState, useEffect } from 'react';
import {render} from 'react-dom';
import './style.css';

const UserTable = props => (
	<table>
	  <thead><tr><th>Name</th><th>Username</th><th>Actions</th></tr></thead>
	  <tbody>{props.users.length > 0 ? props.users.map(user => (
		<tr key={user.id}>
		  <td>{user.name}</td>
		  <td>{user.username}</td>
		  <td>
			<button onClick={() => {props.editRow(user)}} className="button muted-button">Edit</button>
			<button onClick={() => props.deleteUser(user.id)} className="button muted-button">Delete</button>
		  </td>
		</tr>
		)): (<tr><td colSpan={3}>No users</td></tr>)}
	  </tbody>
	</table>
)

const EditUserForm = props => {
	const [ user, setUser ] = useState(props.currentUser)
  
	useEffect(() => { setUser(props.currentUser)
	  },[ props ]
	)
  
	const handleInputChange = event => {
	  const { name, value } = event.target
	  setUser({ ...user, [name]: value })
	}
  
	return (
	  <form onSubmit={event => { event.preventDefault(); props.updateUser(user.id, user)}}>
		<label>Name</label>
		<input type="text" name="name" value={user.name} onChange={handleInputChange} />
		<label>Username</label>
		<input type="text" name="username" value={user.username} onChange={handleInputChange} />
		<button>Update user</button>
		<button onClick={() => props.setEditing(false)} className="button muted-button">Cancel</button>
	  </form>
	)
}

const AddUserForm = props => {
	const initialFormState = { id: null, name: '', username: '' }
	const [ user, setUser ] = useState(initialFormState)

	const handleInputChange = event => {
		const { name, value } = event.target

		setUser({ ...user, [name]: value })
	}

	return (
		<form onSubmit={event => { event.preventDefault() 
			if (!user.name || !user.username) return
				props.addUser(user)
				setUser(initialFormState)
				props.setAddNew(false)
			}}>
			<label>Name</label>
			<input type="text" name="name" value={user.name} onChange={handleInputChange} />
			<label>Username</label>
			<input type="text" name="username" value={user.username} onChange={handleInputChange} />
			<button>Add new user</button>
		</form>
	)
}


const App = () => {
	const initialFormState = { id: null, name: '', username: '' }
	const usersData = [
		{ id: 1, name: 'MARK', username: 'marker' },
		{ id: 2, name: 'PAIGE', username: 'paigy' },
		{ id: 3, name: 'ASDASD', username: 'asdas' }]
	const [ users, setUsers ] = useState(usersData)
	const [ currentUser, setCurrentUser ] = useState(initialFormState)
	const [ editing, setEditing ] = useState(false)
	const [ addNew, setAddNew ]  = useState(false)
	const addUser = user => { setAddNew(true)
		user.id = users.length + 1
		setUsers([ ...users, user ])}
	const deleteUser = id => { setEditing(false)
		setUsers(users.filter(user => user.id !== id))}
	const updateUser = (id, updatedUser) => { setEditing(false)
		setUsers(users.map(user => (user.id === id ? updatedUser : user)))}
	const editRow = user => { setEditing(true)
		setCurrentUser({ id: user.id, name: user.name, username: user.username })}

	return (
		<div className="container">
			<h1>Contact List Application</h1>
			<button onClick={() => setAddNew(true)} className="button muted-button">Add </button>
			<div className="flex-row">
				<div className="flex-large">
					<h2>View users</h2>
					<UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
				</div>
				<div className="flex-large">
					{editing ? <>
						<h2>Edit user</h2>
						<EditUserForm editing={editing} setEditing={setEditing}
							currentUser={currentUser} updateUser={updateUser}/></> : null}
					{addNew ? <>
						<h2>Add user</h2>
						<AddUserForm addUser={addUser} setAddNew={() => setAddNew(false)}/></> : null}
				</div>
			</div>
		</div>
    );
  }

render(<App />, document.getElementById('root'));
