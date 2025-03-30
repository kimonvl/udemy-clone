import React, { useRef } from 'react'
import ReactPlayer from 'react-player'

const VideoPlayer = ({width="100%", height="100%", url, handleOnEnded = () => {}}) => {
    const playerContairRef = useRef(null)
    const playerRef = useRef(null)
  return (
    <div
    ref={playerContairRef}
    className='relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl transition-all duration-300 ease-in-out'
    style={{width, height}}
    >
        <ReactPlayer
        className="absolute top-0 left-0"
        ref={playerRef}
        url={url}
        width="100%"
        height={"100%"}
        controls={true}
        onEnded={() => handleOnEnded()}
        />


    </div>
  )
}

export default VideoPlayer