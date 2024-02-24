import React, {useRef, useState} from 'react';
import { useEffect } from 'react';
import timerAudio15 from '../assets/Em Vui Em Học - Timer - 15s.mp3';
import timerAudio30 from '../assets/Em Vui Em Học - Timer - 30s.mp3';
import timerAudio60 from '../assets/Em Vui Em Học - Timer - 60s.mp3';

const Timer = (props) => {
    const audioElement = useRef(null);
    const timerElement = useRef(null);

    const [seconds, setSeconds] = useState(props.seconds ? props.seconds : 15);
    const [isActive, setIsActive] = useState(false);
    const [timerPlayedBefore, setTimerPlayedBefore] = useState(false);

    let timerAudio;

    if (props.seconds === '15') {
        timerAudio = timerAudio15;
    }
    else if (props.seconds === '30') {
        timerAudio = timerAudio30;
    }
    else if (props.seconds === '60') {
        timerAudio = timerAudio60;
    }
    else {
        timerAudio = timerAudio15;
    }
    
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
        setSeconds(props.seconds)
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
