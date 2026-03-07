import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Phone, PhoneOff, X, User, Clock, Volume2 } from 'lucide-react'

// Import audio functions
import { playOutgoingRingtone } from "../utils/ringtone";

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

const CallTargetAvatar = styled.div`
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
  margin-bottom: 8px;
`

const CallTargetInfo = styled.div`
  text-align: center;
`

const CallTargetName = styled.div`
  color: #dcddde;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
`

const CallStatus = styled.div`
  color: #b9bbbe;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`

const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  justify-content: center;
`

const ActionButton = styled.button`
  padding: 12px 24px;
  border-radius: 12px;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 16px;
  font-weight: 600;
  
  ${props => props.variant === 'cancel' ? `
    background-color: #dc3545;
    color: white;
    
    &:hover {
      background-color: #c82333;
      transform: scale(1.05);
    }
  ` : `
    background-color: #72767d;
    color: white;
    
    &:hover {
      background-color: #5a5e63;
      transform: scale(1.05);
    }
  `}
`

const RingingAnimation = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
`

const RingingDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #43b581;
  animation: ringing 1.4s infinite ease-in-out;
  
  ${props => props.delay && `
    animation-delay: ${props.delay}s;
  `}
  
  @keyframes ringing {
    0%, 80%, 100% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    40% {
      transform: scale(1.2);
      opacity: 1;
    }
  }
`

const OutgoingCallRequest = ({ isOpen, onCancel, target }) => {
  const [callingTime, setCallingTime] = useState(0)
  const audioIntervalRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      // Play ringtone every 1.5 seconds
      playOutgoingRingtone()
      audioIntervalRef.current = setInterval(() => {
        playOutgoingRingtone()
      }, 1500)

      const timer = setInterval(() => {
        setCallingTime(prev => prev + 1)
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
        <CallTargetAvatar>
          {target?.name?.[0] || 'U'}
        </CallTargetAvatar>
        
        <CallTargetInfo>
          <CallTargetName>{target?.name || 'Unknown'}</CallTargetName>
          <CallStatus>
            <Volume2 size={16} />
            Calling...
          </CallStatus>
          <CallStatus>
            <Clock size={16} />
            {formatTime(callingTime)}
          </CallStatus>
        </CallTargetInfo>
        
        <RingingAnimation>
          <RingingDot />
          <RingingDot delay={0.2} />
          <RingingDot delay={0.4} />
        </RingingAnimation>
        
        <ActionButtons>
          <ActionButton variant="cancel" onClick={onCancel}>
            <PhoneOff size={20} />
            Cancel
          </ActionButton>
        </ActionButtons>
      </CallRequestDialog>
    </CallRequestOverlay>
  )
}

export default OutgoingCallRequest
