import React, {ChangeEvent, useEffect, useState} from 'react';

import './App.css';

import {Container} from "./common/container/Container";
import SuperButton from "./common/c2-SuperButton/SuperButton";
import SuperInputText from "./common/c1-SuperInputText/SuperInputText";

const COUNTER = "counter"
const CONFIG = "config"
const STEP_VALUE = 1

const App = () => {
    const [maxCountValue, setMaxCountValue] = useState(5)
    const [initCountValue, setInitCountValue] = useState(0)
    const [countValue, setCountValue] = useState(initCountValue)
    const [error, setError] = useState<string>('')
    const [message, setMessage] = useState<string>("set values and press 'set'")
    const [mode, setMode] = useState(CONFIG)

    // const isValueCorrect = field === 'startValue'
    // ? isStartValueCorrect(e.target.value)
    // : isMaxValueCorrect(e.target.value)

    useEffect(() => {
        const initValueAsString = localStorage.getItem('initValue')
        const maxValueAsString = localStorage.getItem('maxValue')

        if (initValueAsString && maxValueAsString) {
            setInitCountValue(Number(initValueAsString))
            setMaxCountValue(Number(maxValueAsString))
        }
    }, [])

    const setValues = () => {
        localStorage.setItem('initValue', initCountValue.toString())
        localStorage.setItem('maxValue', maxCountValue.toString())
        setCountValue(initCountValue)
        setMode(COUNTER)
    }


    // Refactor!!!
    const onChangeStartValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInitCountValue(Number(e.currentTarget.value))
        if (Number(e.currentTarget.value) < 0 || Number(e.currentTarget.value) >= maxCountValue) {
            setError("Incorrect value!")
        } else {
            setError('')
            setInitCountValue(Number(e.currentTarget.value))
            setMode(CONFIG)
            setMessage("set values and press 'set'")
        }
    }
    // Refactor!!!
    const onChangeMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setMaxCountValue(Number(e.currentTarget.value))
        if (Number(e.currentTarget.value) === initCountValue || Number(e.currentTarget.value) < initCountValue) {
            setError("Incorrect value!")
        } else {
            setError('')
            setMaxCountValue(Number(e.currentTarget.value))
            setMode(CONFIG)
            setMessage("set values and press 'set'")
        }
    }

    const onClickIncHandler = () => {
        setCountValue(countValue + STEP_VALUE)
    }

    const onClickResetHandler = () => {
        setCountValue(initCountValue)
    }

// Components!!
    return (
        <div className="App">
            <Container
                buttons={[<SuperButton disabled={mode === COUNTER || !!error} onClick={setValues}
                                       key="SET">SET</SuperButton>]}>
                <span>start value:
                <SuperInputText error={error} type="number" onChange={onChangeStartValueHandler}
                                value={initCountValue}/>
                                </span>
                <span>max value:
                <SuperInputText error={error} type="number" onChange={onChangeMaxValueHandler} value={maxCountValue}/>
                </span>
            </Container>
            <Container
                buttons={[
                    <SuperButton disabled={mode === CONFIG || countValue === maxCountValue} key="INC"
                                 onClick={onClickIncHandler}>INC</SuperButton>,
                    <SuperButton disabled={mode === CONFIG || countValue === initCountValue} key="RESET"
                                 onClick={onClickResetHandler}>RESET</SuperButton>,
                ]}
            >
                {mode === CONFIG && <span className={error ? "red" : "view"}>{error || message}</span>}
                {mode === COUNTER &&
                <span className={maxCountValue === countValue ? "red" : "view"}>{countValue}</span>}
            </Container>
        </div>
    )
}


export default App;

