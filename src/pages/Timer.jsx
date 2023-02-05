import React, {useRef, useState} from 'react';
import { useEffect } from 'react';
import timerAudio from '../assets/Em Vui Em Học - Timer - 15s.mp3';

const Timer = (props) => {
    const audioElement = useRef(null);
    const timerElement = useRef(null);

    const [seconds, setSeconds] = useState(15);
    const [isActive, setIsActive] = useState(false);
    const [timerPlayedBefore, setTimerPlayedBefore] = useState(false);

    const toggle = () => {
        if (seconds <= 0) {
            resetTimer()
            setTimerPlayedBefore(false)
        }
        else if (isActive === true) {
            setIsActive(false);
        }
        else{
            setIsActive(true);
        }
    }

    useEffect(() => {
        if (props.reset === true) {
            console.log("oiruej")
            resetTimer();
        }

        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds-1);
            }, 1000);
            timerElement.current.classList.add("active")
        }
        if (!isActive || seconds <= 0) {
            clearInterval(interval);
            timerElement.current.classList.remove("active")
        }
        return () => clearInterval(interval);

    }, [isActive, seconds, props.reset])

    const playTimerAudio = () => {
        if (seconds <= 0) {
            return null;
        }
        else if (timerPlayedBefore === false) {
            setTimerPlayedBefore(true)
            audioElement.current.play();
        }
        else {
            setTimerPlayedBefore(false)
            audioElement.current.pause()
        }
    }

    const resetTimer = () => {
        setSeconds(15)
        setIsActive(false)
        setTimerPlayedBefore(false)
        console.log("asd")
    }

    return (
        <>
        <audio hidden ref={audioElement} src={timerAudio}/>
        <p ref={timerElement} onClickCapture={() => playTimerAudio()} onClick={() => toggle()}>{seconds}</p>
        </>
    )
}

export default Timer;  
