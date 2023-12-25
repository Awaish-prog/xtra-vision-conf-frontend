import { Container } from '@mui/material'
import React from 'react'

const Timer: React.FC<{timer: number}> = ({ timer }: {timer: number}): JSX.Element => {
    return <Container>
        { timer >= -2 && <p>{timer > 0 ? timer : "Time over"}</p>}
    </Container>
}

export default Timer;