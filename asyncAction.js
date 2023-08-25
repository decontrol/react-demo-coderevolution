const redux = require('redux')
const { createStore } = redux

// redux-thunk is a middleware that defines async action creators

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

const store = createStore(reducer)
