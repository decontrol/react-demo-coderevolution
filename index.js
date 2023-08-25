const redux = require('redux')
const { createStore } = redux
const bindActionCreators = redux.bindActionCreators
const { combineReducers } = redux

// ACTION (= an object with type property)
const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'

const ICECREAM_ORDERED = 'ICECREAM_ORDERED'
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED'

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

function orderIceCream(qty = 1) {
	return {
		type: ICECREAM_ORDERED,
		payload: qty, // use 'payload' instead of 'quantity'
	}
}

function restockIceCream(qty = 1) {
	return {
		type: ICECREAM_RESTOCKED,
		payload: qty,
	}
}

// REDUCERS (= specify how the app's state changes in response to actions sent to the store. Reducer is a function that accepts state and action as arguments, and returns the next state of the app

// (previousState, action) => newState

numOfCakes = 10

// const initialState = {
// 	numOfCakes: 10,
// 	numOfIceCreams: 20,
// 	anotherProperty: 195,
// }

const initialCakeState = {
	numOfCakes: 10,
	anotherProperty: 195,
}

const initialIceCreamState = {
	numOfIceCreams: 10,
	someProperty: 35,
}

const cakeReducer = (state = initialCakeState, action) => {
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

const iceCreamReducer = (state = initialIceCreamState, action) => {
	switch (action.type) {
		case ICECREAM_ORDERED:
			return {
				...state,
				numOfIceCreams: state.numOfIceCreams - action.payload,
			}
		case ICECREAM_RESTOCKED:
			return {
				...state,
				numOfIceCreams: state.numOfIceCreams + action.payload,
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

const rootReducer = combineReducers({
	cake: cakeReducer,
	iceCream: iceCreamReducer,
})

const store = createStore(rootReducer) // Holds application state
console.log('Initial State:', store.getState()) // Allows access to state via **getState()**
const unsubscribe = store.subscribe(() =>
	console.log('Update state:', store.getState())
) // Regsisters listeners via n**subscribe(listener)**

// store.dispatch(orderCake()) // Allows state to be updated via **dispatch(action)**
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(restockCake(3))
// store.dispatch(restockCake(100))

const actions = bindActionCreators(
	{ orderCake, restockCake, orderIceCream, restockIceCream },
	store.dispatch
)

actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(3)
actions.restockCake(100)

actions.orderIceCream()
actions.orderIceCream()
actions.orderIceCream()
actions.restockIceCream(3)
actions.restockIceCream(100)

unsubscribe() // Handles unregistering of listeners via the function returned by **subscribe(listener)**
