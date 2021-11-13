import {IdentifierType} from "../utilits/isValueCorrect";

export type MessageType = "set values and press 'set'"
export type ErrorType = "Incorrect value!" | ""
export type ModeType = "config" | "counter"
export type InitialCounterStateType = {
    currentCountValue: number
    startCountValue: number
    maxCountValue: number
    stepCountValue: number
    message: MessageType
    error: ErrorType
    mode: ModeType
}
const initialCounterState = {
    currentCountValue: 0,
    startCountValue: 0,
    maxCountValue: 5,
    stepCountValue: 1,
    message: "set values and press 'set'",
    error: "",
    mode: "config"
} as const

export const counterReducer = (state: InitialCounterStateType = initialCounterState, action: CounterActionsType): InitialCounterStateType => {
    switch (action.type) {
        case "INC-CURRENT-COUNT-VALUE":
            return {...state, currentCountValue: state.currentCountValue + state.stepCountValue}
        case "RESET-COUNT-VALUE":
            return {...state, currentCountValue: state.startCountValue}
        case "SET-CORRECT-START-VALUES":
            return action.identifier === "START"
                ? {
                    ...state,
                    error: "",
                    startCountValue: action.correctValue,
                    mode: "config",
                    message: "set values and press 'set'"
                }
                : {
                    ...state,
                    error: "",
                    maxCountValue: action.correctValue,
                    mode: "config",
                    message: "set values and press 'set'"
                }
        case "VIEW-INPUT-VALUE-ON-SETTING":
            return action.identifier === "START"
                ? {...state, startCountValue: action.value}
                : {...state, maxCountValue: action.value}
        case "SET-ERROR":
            return {...state, error: "Incorrect value!"}
        case "SET-COUNTER":
            return {...state, mode: "counter", currentCountValue: state.startCountValue}
        case "SET-FROM-LOCAL-STORAGE":
            return {...state, startCountValue: action.startValue, maxCountValue: action.maxValue}
        default:
            return state
    }
}

export type CounterActionsType = ReturnType<typeof incCurrentCountValueAC>
    | ReturnType<typeof resetCountValueAC>
    | ReturnType<typeof setCorrectStartValuesAC>
    | ReturnType<typeof viewInputValueOnSettingAC>
    | ReturnType<typeof setErrorAC>
    | ReturnType<typeof setCounterAC>
    | ReturnType<typeof setValuesFromLocalStorageAC>


export const incCurrentCountValueAC = () => {
    return {
        type: 'INC-CURRENT-COUNT-VALUE'
    } as const
}

export const resetCountValueAC = () => {
    return {
        type: 'RESET-COUNT-VALUE'
    } as const
}
//refactor
export const setCorrectStartValuesAC = (correctValue: number, identifier: IdentifierType) => {
    return {
        type: 'SET-CORRECT-START-VALUES',
        correctValue,
        identifier
    } as const
}

export const viewInputValueOnSettingAC = (value: number, identifier: IdentifierType) => {
    return {
        type: 'VIEW-INPUT-VALUE-ON-SETTING',
        value,
        identifier
    } as const
}

export const setErrorAC = () => {
    return {
        type: 'SET-ERROR'
    } as const
}

export const setCounterAC = () => {
    return {
        type: 'SET-COUNTER'
    } as const
}

export const setValuesFromLocalStorageAC = (startValue: number, maxValue:number) => {
    return {
        type: 'SET-FROM-LOCAL-STORAGE',
        startValue,
        maxValue
    } as const
}