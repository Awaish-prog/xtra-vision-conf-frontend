import React from 'react'
import "../styles/MeetingDashboard.css";

const Timer: React.FC<{timer: number}> = ({ timer }: {timer: number}): JSX.Element => {

    function handleCopyClick(){
        const textarea = document.createElement('textarea');
        textarea.value = window.location.href;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('Link copied to clipboard!');
    };
    return <div className='timer-container'>
        <span className='share-link' onClick={handleCopyClick} >Share link</span>
        { timer >= -2 && <p className={timer <= 5 ? 'timer-end timer' : 'timer'}>{timer > 0 ? timer + " seconds" : "Time over"}</p>}
    </div>
}

export default Timer;