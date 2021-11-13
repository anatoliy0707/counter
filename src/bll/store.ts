import { combineReducers, createStore } from "redux";
import { counterReducer } from "./counterReducer";


export type AppStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    counter: counterReducer,
})

export const store = createStore(rootReducer)

type AppStoreType = typeof store