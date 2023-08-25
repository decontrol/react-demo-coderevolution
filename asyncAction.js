const redux = require('redux')
// redux-thunk is a middleware that defines async action creators
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')
const { createStore, applyMiddleware } = redux

const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()

const initialState = {
	loading: false,
	userts: [],
	error: '',
}

const FETCH_USERS_REQUSTED = 'FETCH_USERS_REQUSTED'
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED'
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED'

const fetchUsersRequest = () => {
	return {
		type: FETCH_USERS_REQUSTED,
	}
}

const fetchUsersSuccess = (users) => {
	return {
		type: FETCH_USERS_SUCCEEDED,
		payload: users,
	}
}

const fetchUsersFailure = (error) => {
	return {
		type: FETCH_USERS_FAILED,
		payload: error,
	}
}

const fetchUsers = () => {
	return function (dispatch) {
		dispatch(fetchUsersRequest())
		axios
			.get('https://jsonplaceholder.typicode.com/users')
			.then((response) => {
				// response.data is the users
				const users = response.data.map((user) => user.id)
				dispatch(fetchUsersSuccess(users))
			})
			.catch((error) => {
				// error.message is the error message
				dispatch(fetchUsersFailure(error.message))
			})
	}
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_USERS_REQUSTED:
			return {
				...state,
				loading: true,
			}
		case FETCH_USERS_SUCCEEDED:
			return {
				loading: false,
				users: action.payload,
				error: '',
			}
		case FETCH_USERS_FAILED:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware, logger))

// store.subscribe(() => {
// 	console.log(store.getState())
// })

store.dispatch(fetchUsers())
