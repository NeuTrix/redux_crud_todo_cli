import { combineReducers } from 'redux'
import todoReducers from './todoReducers'

export default combineReducers({
	todo: todoReducers
})