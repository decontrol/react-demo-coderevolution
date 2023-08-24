const redux = require('redux')
const { createStore } = redux
const bindActionCreators = redux.bindActionCreators

// ACTION (= an object with type property)
const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'

//ACTION CREATOR (= function taht returns an object)
function orderCake() {
	return {
		type: CAKE_ORDERED,
		payload: 1, // use 'payload' instead of 'quantity'
	}
}

function restockCake(qty = 1) {
	return {
		type: CAKE_RESTOCKED,
		payload: qty,
	}
}

// REDUCERS (= specify how the app's state changes in response to actions sent to the store. Reducer is a function that accepts state and action as arguments, and returns the next state of the app

// (previousState, action) => newState

numOfCakes = 10

const initialState = {
	numOfCakes: 10,
	anotherProperty: 195,
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case CAKE_ORDERED:
			return {
				...state,
				numOfCakes: state.numOfCakes - 1,
			}
		case CAKE_RESTOCKED:
			return {
				...state,
				numOfCakes: state.numOfCakes + action.payload,
			}
		default:
			return state
	}
}

/*
- Holds application state
- Allows access to state via **getState()**
- Allows state to be updated via **dispatch(action)**
- Regsisters listeners via n**subscribe(listener)**
- Handles unregistering of listeners via the function returned by **subscribe(listener)** 
*/

const store = createStore(reducer) // Holds application state
console.log('Initial State:', store.getState()) // Allows access to state via **getState()**
const unsubscribe = store.subscribe(() =>
	console.log('Update state:', store.getState())
) // Regsisters listeners via n**subscribe(listener)**

// store.dispatch(orderCake()) // Allows state to be updated via **dispatch(action)**
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(restockCake(3))
// store.dispatch(restockCake(100))

const actions = bindActionCreators({ orderCake, restockCake }, store.dispatch)

actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(3)
actions.restockCake(100)

unsubscribe() // Handles unregistering of listeners via the function returned by **subscribe(listener)**
