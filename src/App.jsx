import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'

// import the uuid functions
import { v4 as uuidv4 } from 'uuid';

function App() {
	// creating states
	// todo, current todo task entered by the user
	// schedule, an array of all the todo items which is to be completed
	const [todo, setTodo] = useState("")
	const [schedule, setSchedule] = useState([])

	// a state that keeps track whether to show finished work or not, initilly set to true, ie shows the list item that are finished
	const [showFinished, setShowFinished] = useState(false)

	// now we will also load the saved list items from local storage
	// this will run once when the app is loaded, using 'useEffect' hook
	// useEffect(() => {
	// 	// load it from a file called 'save_schedule'
	// 	let save_schedule_string = localStorage.getItem('save_schedule')

	// 	// if the save_schedule is not null, load it
	// 	if (save_schedule_string) {
	// 		// load it from a file called 'save_schedule' and parse it as JSON and set the schecule as loaded from the local storage
	// 		let loaded_schecule = JSON.parse(save_schedule_string)
	// 		setSchedule(loaded_schecule)
	// 	}
	// }, [])


	// since we dont want our to-do list to vanish when we reload the app, we will store item in a local storage
	// we will run this when whenever we add, edit, delete, and complete a to-do list item
	const saveToLocal = () => {
		// save it in a file called 'save_schedule' and items to be stored are 'JSON.stringify(schedule)'
		localStorage.setItem('save_schedule', JSON.stringify(schedule))
	}


	// functions to handle Add, Edit, Delete, Check and Change Events
	const handleAdd = () => {
		// when any todo item is added, it is added to the schedule array, and give an id to to-do list items
		// '...' is called a spread operator, keep the array as it is and just add new object {id: uuidv4(),todo, isCompleted: false } to it
		setSchedule([...schedule, { id: uuidv4(), todo, isCompleted: false }])
		setTodo("")

		// save locally
		saveToLocal()
	}

	// edit the to-do item
	const handleEdit = (e, id) => {
		// set the todo, with value of the to-do object to be edited and make add button as updated
		let newSchedule = schedule.map(item => {
			// if the id is id of object to be edit
			// set the todo as the value of 'item.todo'
			// update in the schedule array
			if (id === item.id) {
				setTodo(item.todo)
			}
		})

		// and create an illusion: delete the to-do item, edit it and save it
		newSchedule = schedule.filter(item => {
			// store (return )the to-do item if id given is not equal to id to be deleted
			return id !== item.id
		})

		// set the schedule as newSchedule
		setSchedule(newSchedule)

		// save locally
		saveToLocal()
	}

	// delete the object from the schedule array
	const handleDelete = (e, id) => {
		// create a new array and filter out the object where id is id of object to be deleted
		let newSchedule = schedule.filter(item => {
			// store (return )the to-do item if id given is not equal to id to be deleted
			return id !== item.id
		})

		// set the schedule as newSchedule
		setSchedule(newSchedule)

		// save locally
		saveToLocal()
	}

	const handleChange = (e) => {
		// whenever there is a change in the input set the todo-item to entered value
		setTodo(e.target.value)
	}

	const handleCheck = (e) => {
		// fetch the id of the to-do item list
		// whenever there is a change in the input set the todo-item to entered value
		// then locate the to-do item of the given id
		// create a new schcedule and change the isCompleted in the new schedule state
		// set the schedule with new schedule
		// this approach we are mutating the original 'schedule' array and react relies on immutability
		let id = e.target.id

		// let index = schedule.findIndex(item => {
		// 	return item.id == id
		// })

		// create an new object for schecule, same reference(let newSchedule = schedule) does not work
		// let newSchedule = [...schedule]
		// // toggle the objects isCompleted variable
		// newSchedule[index].isCompleted = !newSchedule[index].isCompleted
		// setSchedule(newSchedule)

		// new approach, map the original 'schedule' array and just toggle isCompleted of the given id object, keep the rest same
		let newSchedule = schedule.map(item => {
			// for each to-do object, check if the id is matched or not
			if (item.id === id) {
				// if id is matched, toggle the isCompleted
				// '...' spread operator, it means keep the object as it is,just change 'isCompleted: !isCompleted'
				return { ...item, isCompleted: !item.isCompleted }
			}
			return item
		})

		// set the schedule as newSchedule
		setSchedule(newSchedule)

		// save locally
		saveToLocal()
	}

	// to handlw whether to show the finished work
	const handleShowFinished = (e) => {
		// toggle the showFinished state
		setShowFinished(!showFinished)
		console.log(schedule);
	}

	// check if any work is remaining or not
	const workFinished = () => {

		// Returns true if all items are marked as completed, or if the schedule is empty
		return schedule.length === 0 || schedule.every(item => item.isCompleted)
	}



	return (
		<>
			<Navbar />
			<div className="container mx-auto my-5 rounded-xl p-5 bg-slate-800 text-white min-h-[80vh] w-1/2">

				{/* a div to input todo item */}
				<div className="add-todo-item my-8 text-center">
					<h1 className='text-xl font-semibold m-3'>What is the thing on your mind which need to be done?</h1>

					<input onChange={handleChange} value={todo} className='text-black rounded-lg font-semibold w-1/2' type="text" />

					{/* keep the button disable if nothing is written */}
					<button disabled={todo.length == 0} onClick={handleAdd} className='add bg-slate-900 hover:bg-black rounded-lg py-1 px-3 font-semibold mx-3 text-sm'>Add</button>

					{/* an input checkbox to ask user to show the finished task or not */}
					<div className="items-center my-2">
						{/* handle onchange of show finished */}
						<input onChange={(e) => handleShowFinished(e)} type="checkbox" checked={showFinished} /> Show Finished
					</div>
				</div>

				{/* a simple heading */}
				<h1 className='text-xl font-semibold text-center m-4'>Your planner</h1>


				{/* container to hold the todo items */}
				<div className="todo-container w-3/4 max-h-[52vh] border-4 border-slate-700 rounded-md p-6 mx-auto overflow-y-auto">

					{/* if the schedule is empty we can display a simple message */}
					{workFinished() && <div className='font-semibold text-lg text-center'>You have no work lined up, you can relax :)</div>}

					{/* for each item in the schedule state, we use map function */}
					{schedule.map(item => {


						{/* return each todo item, it has text and 2 buttons to delete or mark done */ }
						return (showFinished || !item.isCompleted) && <div key={item.id} className="todo-item flex justify-between w-full p-2 rounded-lg my-2 bg-slate-700">

							{/* if the todo item is completed put line-through class else put nothing */}
							<div className="flex gap-4 items-center">
								<input onChange={handleCheck} type="checkbox" checked={item.isCompleted} name="" id={item.id} />
								<div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
							</div>

							<div className="buttons flex gap-4 items-center">
								{/* checkbox, ticked if completed */}
								<button onClick={(e) => { handleEdit(e, item.id) }} className="edit bg-slate-900 hover:bg-black rounded-lg py-1 px-3 font-semibold text-sm">Edit</button>
								<button onClick={(e) => { handleDelete(e, item.id) }} className="del bg-slate-900 hover:bg-black rounded-lg py-1 px-3 font-semibold text-sm">Delete</button>
							</div>
						</div>
					})}
				</div>
			</div>
		</>
	)
}

export default App
