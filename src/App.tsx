import React, {ChangeEvent, useEffect} from 'react';
import './App.css';
import {Container} from "./common/container/Container";
import SuperButton from "./common/c2-SuperButton/SuperButton";
import SuperInputText from "./common/c1-SuperInputText/SuperInputText";
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from './bll/store';
import {
    ErrorType,
    incCurrentCountValueAC,
    MessageType,
    ModeType,
    resetCountValueAC, setCorrectStartValuesAC, setCounterAC, setErrorAC, setValuesFromLocalStorageAC,
    viewInputValueOnSettingAC
} from './bll/counterReducer';
import {isValueCorrect} from "./utilits/isValueCorrect";


const COUNTER = "counter"
const CONFIG = "config"


const App = () => {

    const currentCountValue = useSelector<AppStateType, number>(state => state.counter.currentCountValue)
    const startCountValue = useSelector<AppStateType, number>(state => state.counter.startCountValue)
    const maxCountValue = useSelector<AppStateType, number>(state => state.counter.maxCountValue)
    const message = useSelector<AppStateType, MessageType>(state => state.counter.message)
    const error = useSelector<AppStateType, ErrorType>(state => state.counter.error)
    const mode = useSelector<AppStateType, ModeType>(state => state.counter.mode)
    const countDispatch = useDispatch()


    useEffect(() => {
        debugger
        const startValueAsString = localStorage.getItem('startValue')
        const maxValueAsString = localStorage.getItem('maxValue')

        if (startValueAsString && maxValueAsString) {
            const startValue = Number(startValueAsString)
            const maxValue = Number(maxValueAsString)
            countDispatch(setValuesFromLocalStorageAC(startValue, maxValue))
        }
    }, [])

    const setCounter = () => {
        localStorage.setItem('startValue', startCountValue.toString())
        localStorage.setItem('maxValue', maxCountValue.toString())
        countDispatch(setCounterAC())
    }

    const onChangeStartValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const event = Number(e.currentTarget.value)
       countDispatch(viewInputValueOnSettingAC(event, "START")) // выводит текущее значение инпута при настройке, даже некорректное
        !isValueCorrect(event, maxCountValue, "START")
            ? countDispatch(setErrorAC())
            : countDispatch(setCorrectStartValuesAC(event, "START"))
    }

    const onChangeMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const event = Number(e.currentTarget.value)
        countDispatch(viewInputValueOnSettingAC(event, "MAX")) // выводит текущее значение инпута при настройке, даже некорректное
        !isValueCorrect(event, startCountValue, "MAX")
            ? countDispatch(setErrorAC())
            : countDispatch(setCorrectStartValuesAC(event, "MAX"))
    }

    const onClickIncHandler = () => {
        countDispatch(incCurrentCountValueAC())
    }

    const onClickResetHandler = () => {
        countDispatch(resetCountValueAC())
    }

// Components!!
    return (
        <div className="App">
            <Container
                buttons={[<SuperButton disabled={mode === COUNTER || !!error} onClick={setCounter}
                                       key="SET">SET</SuperButton>]}>
                <span>start value:
                <SuperInputText error={error} type="number" onChange={onChangeStartValueHandler}
                                value={startCountValue}/>
                                </span>
                <span>max value:
                <SuperInputText error={error} type="number" onChange={onChangeMaxValueHandler} value={maxCountValue}/>
                </span>
            </Container>
            <Container
                buttons={[
                    <SuperButton disabled={mode === CONFIG || currentCountValue === maxCountValue} key="INC"
                                 onClick={onClickIncHandler}>INC</SuperButton>,
                    <SuperButton disabled={mode === CONFIG || currentCountValue === startCountValue} key="RESET"
                                 onClick={onClickResetHandler}>RESET</SuperButton>,
                ]}
            >
                {mode === CONFIG && <span className={error ? "red" : "view"}>{error || message}</span>}
                {mode === COUNTER &&
                <span className={maxCountValue === currentCountValue ? "red" : "view"}>{currentCountValue}</span>}
            </Container>
        </div>
    )
}


export default App;

