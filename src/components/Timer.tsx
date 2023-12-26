import React from 'react'
import "../styles/MeetingDashboard.css";

const Timer: React.FC<{timer: number}> = ({ timer }: {timer: number}): JSX.Element => {
    return <div className='timer-container'>
        { timer >= -2 && <p className={timer <= 5 ? 'timer-end timer' : 'timer'}>{timer > 0 ? timer + " seconds" : "Time over"}</p>}
    </div>
}

export default Timer;