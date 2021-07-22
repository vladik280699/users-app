import React from 'react'

import './Clock.scss'

const Clock = () => {
  const [time, setTime] = React.useState(new Date())

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 250)
    return () => {
      clearInterval(timer)
    }
  }, [])
  return <div className="Clock">{`${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`}</div>
}

export default Clock
