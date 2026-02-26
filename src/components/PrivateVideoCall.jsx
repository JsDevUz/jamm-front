import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { Phone, PhoneOff, Mic, MicOff, Video, VideoOff, Monitor, MonitorOff, X, Maximize2, Minimize2 } from 'lucide-react'

const VideoCallContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #202225;
  z-index: 10000;
  display: flex;
  flex-direction: column;
`

const VideoCallMain = styled.div`
  flex: 1;
  display: flex;
  position: relative;
  overflow: hidden;
`

const FullVideoContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;
  position: relative;
`

const SmallVideoContainer = styled.div`
  position: absolute;
  width: 200px;
  height: 150px;
  background-color: #2f3136;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10001;
  
  ${props => {
    const positions = {
      'top-left': { top: '20px', left: '20px' },
      'top-right': { top: '20px', right: '20px' },
      'bottom-left': { bottom: '80px', left: '20px' },
      'bottom-right': { bottom: '80px', right: '20px' }
    }
    return positions[props.position] || positions['bottom-right']
  }}
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
  }
`

const VideoElement = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: #2f3136;
`

const NoVideoPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #2f3136;
  color: #dcddde;
`

const UserAvatar = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 12px;
`

const UserName = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #dcddde;
  margin-bottom: 8px;
`

const UserStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #b9bbbe;
`

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.active ? '#43b581' : '#72767d'};
  transition: background-color 0.3s ease;
`

const ControlBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(32, 34, 37, 0.9) 20%, rgba(32, 34, 37, 0.95) 100%);
  padding: 24px;
  display: flex;
  justify-content: center;
  gap: 16px;
  backdrop-filter: blur(10px);
`

const ControlButton = styled.button`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 24px;
  
  ${props => props.variant === 'primary' ? `
    background-color: #dc3545;
    color: white;
    
    &:hover {
      background-color: #c82333;
      transform: scale(1.1);
    }
  ` : `
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    backdrop-filter: blur(10px);
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
      transform: scale(1.1);
    }
  `}
`

const PrivateVideoCall = ({ isOpen, onClose, user }) => {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [callTime, setCallTime] = useState(0)
  const [isRemoteSpeaking, setIsRemoteSpeaking] = useState(false)
  const [smallVideoPosition, setSmallVideoPosition] = useState('bottom-right')
  
  const localVideoRef = useRef(null)
  const remoteVideoRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      // Simulate call timer
      const timer = setInterval(() => {
        setCallTime(prev => prev + 1)
      }, 1000)
      
      return () => clearInterval(timer)
    }
  }, [isOpen])

  useEffect(() => {
    // Simulate speaking changes
    const interval = setInterval(() => {
      setIsRemoteSpeaking(Math.random() > 0.6)
    }, 2000)
    
    return () => clearInterval(interval)
  }, [])

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleSmallVideoClick = () => {
    setIsFullscreen(!isFullscreen)
  }

  const handleSmallVideoDrag = (e) => {
    e.preventDefault()
    const startX = e.clientX
    const startY = e.clientY
    const rect = e.target.getBoundingClientRect()
    const offsetX = startX - rect.left
    const offsetY = startY - rect.top

    const handleMouseMove = (moveEvent) => {
      const x = moveEvent.clientX - offsetX
      const y = moveEvent.clientY - offsetY
      
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight
      const elementWidth = 200
      const elementHeight = 150
      
      let newPosition = 'bottom-right'
      
      if (x < windowWidth / 2) {
        newPosition = y < windowHeight / 2 ? 'top-left' : 'bottom-left'
      } else {
        newPosition = y < windowHeight / 2 ? 'top-right' : 'bottom-right'
      }
      
      setSmallVideoPosition(newPosition)
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  if (!isOpen) return null

  return (
    <VideoCallContainer>
      <VideoCallMain>
        {/* Full Screen Video */}
        <FullVideoContainer>
          {isFullscreen ? (
            <VideoElement 
              ref={localVideoRef} 
              autoPlay 
              muted 
              playsInline 
            />
          ) : (
            <VideoElement 
              ref={remoteVideoRef} 
              autoPlay 
              playsInline 
            />
          )}
        </FullVideoContainer>

        {/* Small Video */}
        <SmallVideoContainer 
          position={smallVideoPosition}
          onClick={handleSmallVideoClick}
          onMouseDown={handleSmallVideoDrag}
        >
          {isFullscreen ? (
            <NoVideoPlaceholder>
              <UserAvatar>{(user || 'User')[0]}</UserAvatar>
              <UserName>{user || 'User'}</UserName>
              <UserStatus>
                <StatusIndicator>
                  <StatusDot active={isRemoteSpeaking} />
                  <span>{isRemoteSpeaking ? 'Speaking...' : 'Silent'}</span>
                </StatusIndicator>
                {isMuted && <MicOff size={16} />}
              </UserStatus>
            </NoVideoPlaceholder>
          ) : (
            <NoVideoPlaceholder>
              <UserAvatar>You</UserAvatar>
              <UserName>You</UserName>
              <UserStatus>
                <StatusIndicator>
                  <StatusDot active={false} />
                  <span>Silent</span>
                </StatusIndicator>
                {isMuted && <MicOff size={16} />}
              </UserStatus>
            </NoVideoPlaceholder>
          )}
        </SmallVideoContainer>

        <ControlBar>
          <ControlButton 
            onClick={() => setIsMuted(!isMuted)}
            active={!isMuted}
          >
            {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
          </ControlButton>
          
          <ControlButton 
            onClick={() => setIsVideoOff(!isVideoOff)}
            active={!isVideoOff}
          >
            {isVideoOff ? <VideoOff size={24} /> : <Video size={24} />}
          </ControlButton>
          
          <ControlButton 
            onClick={() => setIsScreenSharing(!isScreenSharing)}
            active={isScreenSharing}
          >
            {isScreenSharing ? <MonitorOff size={24} /> : <Monitor size={24} />}
          </ControlButton>
          
          <ControlButton variant="primary" onClick={onClose}>
            <PhoneOff size={24} />
          </ControlButton>
        </ControlBar>
      </VideoCallMain>
    </VideoCallContainer>
  )
}

export default PrivateVideoCall
