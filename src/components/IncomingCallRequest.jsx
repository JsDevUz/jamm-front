import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Phone, PhoneOff, X, User, Clock } from 'lucide-react'

// Import audio functions
import { playIncomingRingtone } from '../../public/sounds/ringtone'

const CallRequestOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  z-index: 10001;
  display: flex;
  align-items: center;
  justify-content: center;
`

const CallRequestDialog = styled.div`
  background-color: #2f3136;
  border-radius: 20px;
  padding: 32px;
  width: 400px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`

const CallerAvatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 48px;
  font-weight: 600;
  position: relative;
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.7);
    }
    70% {
      box-shadow: 0 0 0 20px rgba(102, 126, 234, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(102, 126, 234, 0);
    }
  }
`

const CallerInfo = styled.div`
  text-align: center;
`

const CallerName = styled.div`
  color: #dcddde;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
`

const CallStatus = styled.div`
  color: #43b581;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`

const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
`

const ActionButton = styled.button`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 24px;
  
  ${props => props.variant === 'accept' ? `
    background-color: #43b581;
    color: white;
    
    &:hover {
      background-color: #3ca374;
      transform: scale(1.1);
    }
  ` : `
    background-color: #dc3545;
    color: white;
    
    &:hover {
      background-color: #c82333;
      transform: scale(1.1);
    }
  `}
`

const IncomingCallRequest = ({ isOpen, onAccept, onReject, caller }) => {
  const [ringingTime, setRingingTime] = useState(0)
  const audioIntervalRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      // Play incoming ringtone every 2 seconds
      playIncomingRingtone()
      audioIntervalRef.current = setInterval(() => {
        playIncomingRingtone()
      }, 2000)

      const timer = setInterval(() => {
        setRingingTime(prev => prev + 1)
      }, 1000)
      
      return () => {
        if (timer) clearInterval(timer)
        if (audioIntervalRef.current) {
          clearInterval(audioIntervalRef.current)
          audioIntervalRef.current = null
        }
      }
    }
  }, [isOpen])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  if (!isOpen) return null

  return (
    <CallRequestOverlay>
      <CallRequestDialog>
        <CallerAvatar>
          {caller?.name?.[0] || 'U'}
        </CallerAvatar>
        
        <CallerInfo>
          <CallerName>{caller?.name || 'Unknown'}</CallerName>
          <CallStatus>
            <Clock size={16} />
            {formatTime(ringingTime)}
          </CallStatus>
        </CallerInfo>
        
        <ActionButtons>
          <ActionButton variant="accept" onClick={onAccept}>
            <Phone size={24} />
          </ActionButton>
          <ActionButton onClick={onReject}>
            <PhoneOff size={24} />
          </ActionButton>
        </ActionButtons>
      </CallRequestDialog>
    </CallRequestOverlay>
  )
}

export default IncomingCallRequest
