import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { ArrowLeft, PlayCircle } from "lucide-react";

// --- Keyframes ---
const floatOne = keyframes`
  0% { transform: translate3d(0, 0, 0) scale(1); }
  25% { transform: translate3d(16px, -18px, 0) scale(1.03); }
  50% { transform: translate3d(-10px, -34px, 0) scale(0.98); }
  75% { transform: translate3d(20px, -8px, 0) scale(1.02); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
`;

const floatTwo = keyframes`
  0% { transform: translate3d(0, 0, 0) scale(1); }
  20% { transform: translate3d(-20px, -16px, 0) scale(0.98); }
  45% { transform: translate3d(10px, -30px, 0) scale(1.04); }
  75% { transform: translate3d(-14px, -10px, 0) scale(1.01); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
`;

const floatThree = keyframes`
  0% { transform: translate3d(0, 0, 0) scale(1); }
  30% { transform: translate3d(12px, -26px, 0) scale(1.02); }
  55% { transform: translate3d(-16px, -18px, 0) scale(0.99); }
  85% { transform: translate3d(6px, -4px, 0) scale(1.03); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
`;

const floatFour = keyframes`
  0% { transform: translate3d(0, 0, 0) scale(1); }
  35% { transform: translate3d(-18px, -28px, 0) scale(1.04); }
  60% { transform: translate3d(14px, -12px, 0) scale(0.99); }
  85% { transform: translate3d(-10px, -2px, 0) scale(1.02); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
`;

const shootProjectile = keyframes`
  from {
    transform: translate(-50%, -50%) scale(0.5);
    opacity: 1;
  }
  to {
    transform: translate(var(--target-x), var(--target-y)) scale(1.5);
    opacity: 0.8;
  }
`;

const shake = keyframes`
  0%, 100% { transform: translate(0, 0); }
  10%, 30%, 50%, 70%, 90% { transform: translate(-2px, -2px); }
  20%, 40%, 60%, 80% { transform: translate(2px, 2px); }
`;

const pulseGlow = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
`;

const explosion = keyframes`
  0% { transform: scale(0.1); opacity: 1; }
  70% { transform: scale(1.2); opacity: 0.8; }
  100% { transform: scale(1.5); opacity: 0; }
`;

const starsMove = keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(-1000px); }
`;

// --- Styled Components ---
const GameContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  animation: ${(props) => (props.$shaking ? shake : "none")} 0.4s
    cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
`;

const GameHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    padding-top: calc(8px + env(safe-area-inset-top, 0px));
  }
`;

const BackBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  color: var(--text-muted-color);
  cursor: pointer;
  font-weight: 600;
  transition: color 0.2s;
  &:hover {
    color: var(--text-color);
  }
`;

const Title = styled.h2`
  font-size: clamp(18px, 4vw, 24px);
  font-weight: 800;
  color: var(--text-color);
  margin: 0;
`;

const GameMeta = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;

const MetaCard = styled.div`
  background: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const MetaLabel = styled.span`
  font-size: 11px;
  text-transform: uppercase;
  color: var(--text-muted-color);
  font-weight: 700;
  letter-spacing: 0.05em;
`;

const MetaValue = styled.span`
  font-size: 20px;
  font-weight: 900;
  color: var(--primary-color);
`;

const GameBoard = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4/3;
  min-height: 500px;
  background: #050a14;
  border-radius: 24px;
  border: 2px solid color-mix(in srgb, var(--primary-color) 40%, #1a1f2e);
  overflow: hidden;
  box-shadow:
    0 0 40px rgba(0, 0, 0, 0.5),
    inset 0 0 100px rgba(0, 0, 0, 0.8);

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image:
      radial-gradient(white, rgba(255, 255, 255, 0.2) 2px, transparent 40px),
      radial-gradient(white, rgba(255, 255, 255, 0.1) 1px, transparent 30px);
    background-size:
      550px 550px,
      350px 350px;
    background-position:
      0 0,
      40px 60px;
    opacity: 0.1;
    animation: ${starsMove} 100s linear infinite;
  }
`;

const BoardGlow = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at center bottom,
    color-mix(in srgb, var(--primary-color) 15%, transparent),
    transparent 70%
  );
  pointer-events: none;
  animation: ${pulseGlow} 4s ease-in-out infinite;
`;

const PromptBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 24px;
  z-index: 10;
  background: linear-gradient(180deg, rgba(5, 10, 20, 0.95), transparent);
  text-align: center;
`;

const PromptText = styled.h3`
  margin: 0;
  font-size: clamp(24px, 5vw, 42px);
  color: #fff;
  font-weight: 900;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
`;

const GameArena = styled.div`
  position: absolute;
  inset: 0;
`;

const GAME_POSITIONS = [
  { top: "25%", left: "15%" },
  { top: "20%", right: "15%" },
  { top: "50%", left: "12%" },
  { top: "45%", right: "12%" },
];

const Target = styled.button`
  position: absolute;
  top: ${(props) => props.$top};
  left: ${(props) => props.$left || "auto"};
  right: ${(props) => props.$right || "auto"};
  min-width: 140px;
  max-width: 240px;
  padding: 16px 24px;
  background: linear-gradient(135deg, #1e293b, #0f172a);
  border: 2px solid
    ${(props) => (props.$isWrong ? "#ef4444" : "rgba(255,255,255,0.1)")};
  ${(props) =>
    props.$isWrong
      ? "background: linear-gradient(135deg, rgba(127, 29, 29, 0.96), rgba(69, 10, 10, 0.98));"
      : ""}
  border-radius: 999px;
  color: #f8fafc;
  font-weight: 700;
  font-size: 18px;
  cursor: pointer;
  box-shadow:
    ${(props) =>
      props.$isWrong
        ? "0 0 20px rgba(239, 68, 68, 0.4)"
        : "0 10px 25px rgba(0,0,0,0.3)"},
    inset 0 1px 1px rgba(255, 255, 255, 0.1);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 5;

  opacity: ${(props) => (props.$hidden ? 0 : 1)};
  transform: ${(props) => (props.$hidden ? "scale(0.8)" : "scale(1)")};
  pointer-events: ${(props) => (props.$hidden ? "none" : "auto")};

  animation: ${(props) => {
      const idx = props.$index % 4;
      return [floatOne, floatTwo, floatThree, floatFour][idx];
    }}
    ${(props) => 6 + props.$speedBoost}s ease-in-out infinite;

  &:hover {
    border-color: ${(props) => (props.$isWrong ? "#ef4444" : "var(--primary-color)")};
    transform: ${(props) =>
      props.$isWrong ? "translateY(-2px) scale(1.02)" : "translateY(-4px) scale(1.05)"};
    background: ${(props) =>
      props.$isWrong
        ? "linear-gradient(135deg, rgba(153, 27, 27, 0.98), rgba(69, 10, 10, 1))"
        : "linear-gradient(135deg, #2a3852, #1a2a44)"};
    box-shadow:
      ${(props) =>
        props.$isWrong
          ? "0 15px 30px rgba(0, 0, 0, 0.4), 0 0 18px rgba(239, 68, 68, 0.45)"
          : "0 15px 30px rgba(0, 0, 0, 0.4), 0 0 15px color-mix(in srgb, var(--primary-color) 30%, transparent)"};
  }
`;

const ExplosionEffect = styled.div`
  position: absolute;
  left: ${(props) => props.$x}px;
  top: ${(props) => props.$y}px;
  width: 100px;
  height: 100px;
  transform: translate(-50%, -50%);
  background: radial-gradient(
    circle,
    #fbbf24 0%,
    #ef4444 60%,
    transparent 100%
  );
  border-radius: 50%;
  pointer-events: none;
  z-index: 8;
  animation: ${explosion} 0.5s ease-out forwards;
`;

const CannonContainer = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 140px;
  height: 140px;
  z-index: 10;
`;

const CannonBase = styled.div`
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 60px;
  background: linear-gradient(to right, #1e293b, #334155, #1e293b);
  border-radius: 50% 50% 0 0;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.5);
`;

const CannonBarrel = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  width: 24px;
  height: 80px;
  background: linear-gradient(to right, #475569, #94a3b8, #475569);
  border-radius: 12px 12px 4px 4px;
  transform-origin: center 70px;
  transform: translateX(-50%) rotate(${(props) => props.$angle}deg);
  transition: transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.3);

  &::after {
    content: "";
    position: absolute;
    top: -5px;
    left: -4px;
    right: -4px;
    height: 12px;
    background: #0f172a;
    border-radius: 4px;
  }
`;

const Projectile = styled.div`
  position: absolute;
  left: 50%;
  bottom: 60px;
  width: 12px;
  height: 24px;
  background: radial-gradient(
    circle at center,
    #fff 0%,
    #34d399 70%,
    #10b981 100%
  );
  border-radius: 50%;
  box-shadow:
    0 0 20px #10b981,
    0 0 40px rgba(16, 185, 129, 0.4);
  z-index: 6;
  --target-x: ${(props) => props.$tx}px;
  --target-y: ${(props) => props.$ty}px;
  animation: ${shootProjectile} 0.25s ease-out forwards;
`;

const ResultActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const StudyBtn = styled.button`
  padding: 14px 20px;
  background: ${(props) =>
    props.$primary ? "var(--primary-color)" : "var(--tertiary-color)"};
  color: ${(props) => (props.$primary ? "white" : "var(--text-color)")};
  border: 1px solid var(--border-color);
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    filter: brightness(1.1);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const GameResultBox = styled.div`
  background: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 400px;
  overflow-y: auto;
`;

const ResultRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-color);
  &:last-child {
    border: none;
    padding: 0;
  }
`;

const StatusIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${(props) =>
    props.$correct ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)"};
  color: ${(props) => (props.$correct ? "#22c55e" : "#ef4444")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`;

// --- Component ---
const FlashcardShooterGame = ({
  deck,
  queue,
  promptSide,
  onBack,
  onFinish,
}) => {
  const [internalQueue, setInternalQueue] = useState(queue);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [streak, setStreak] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [cannonAngle, setCannonAngle] = useState(0);
  const [projectile, setProjectile] = useState(null);
  const [explosionData, setExplosionData] = useState(null);
  const [wrongOption, setWrongOption] = useState(null);
  const [hiddenOption, setHiddenOption] = useState(null);
  const [locked, setLocked] = useState(false);
  const [shaking, setShaking] = useState(false);

  const boardRef = useRef(null);

  const currentCard = internalQueue[currentIndex];
  const cardsLeft = internalQueue.length - currentIndex;
  const correctCount = answers.filter((a) => a.isCorrect).length;

  const buildOptions = () => {
    if (!currentCard || !deck) return [];
    const correct =
      promptSide === "front" ? currentCard.back : currentCard.front;
    const pool = (deck.cards || [])
      .filter((c) => c._id !== currentCard._id)
      .map((c) => (promptSide === "front" ? c.back : c.front))
      .filter((val) => val && val !== correct);

    const shuffledPool = [...new Set(pool)].sort(() => 0.5 - Math.random());
    const options = [correct, ...shuffledPool.slice(0, 3)].sort(
      () => 0.5 - Math.random(),
    );
    return options;
  };

  const [currentOptions, setCurrentOptions] = useState([]);

  useEffect(() => {
    if (!completed && currentCard) {
      setCurrentOptions(buildOptions());
    }
  }, [currentIndex, completed]);

  const handleFire = (option, event) => {
    if (locked || completed) return;

    const boardRect = boardRef.current.getBoundingClientRect();
    const targetRect = event.currentTarget.getBoundingClientRect();

    // Calculate physics
    const tx = targetRect.left - boardRect.left + targetRect.width / 2;
    const ty = targetRect.top - boardRect.top + targetRect.height / 2;
    const bx = boardRect.width / 2;
    const by = boardRect.height - 60;

    const angle = Math.atan2(tx - bx, by - ty) * (180 / Math.PI);
    setCannonAngle(angle);

    // Visual Projectile offset from board center
    const ptx = tx - bx;
    const pty = ty - by;

    setLocked(true);
    setProjectile({ tx: ptx, ty: pty });

    const checkCorrect = () => {
      const correctValue =
        promptSide === "front" ? currentCard.back : currentCard.front;
      const isCorrect = option === correctValue;

      setProjectile(null);

      if (isCorrect) {
        setExplosionData({ x: tx, y: ty });
        setHiddenOption(option);
        setStreak((s) => s + 1);
      } else {
        setWrongOption(option);
        setStreak(0);
        setShaking(true);
        setTimeout(() => setShaking(false), 400);
      }

      const newAnswer = {
        card: currentCard,
        selectedOption: option,
        isCorrect,
      };
      const newAnswers = [...answers, newAnswer];

      setTimeout(() => {
        setExplosionData(null);
        setWrongOption(null);
        setHiddenOption(null);
        setAnswers(newAnswers);

        if (currentIndex + 1 >= internalQueue.length) {
          setCompleted(true);
        } else {
          setCurrentIndex((i) => i + 1);
          setLocked(false);
        }
      }, 600);
    };

    setTimeout(checkCorrect, 250); // Match shootProjectile animation time
  };

  const handleRestartAll = () => {
    setInternalQueue(queue);
    setAnswers([]);
    setCurrentIndex(0);
    setCompleted(false);
    setLocked(false);
    setStreak(0);
  };

  const handleRestartMissed = () => {
    const missed = answers.filter((a) => !a.isCorrect).map((a) => a.card);
    if (missed.length === 0) return;
    setInternalQueue(missed);
    setAnswers([]);
    setCurrentIndex(0);
    setCompleted(false);
    setLocked(false);
    setStreak(0);
  };

  if (completed) {
    return (
      <GameContainer>
        <GameHeader>
          <BackBtn onClick={onBack}>
            <ArrowLeft size={18} /> Orqaga
          </BackBtn>
          <Title>Natijalar</Title>
        </GameHeader>

        <GameMeta>
          <MetaCard>
            <MetaLabel>Jami</MetaLabel>
            <MetaValue>{internalQueue.length}</MetaValue>
          </MetaCard>
          <MetaCard>
            <MetaLabel>To'g'ri</MetaLabel>
            <MetaValue>{correctCount}</MetaValue>
          </MetaCard>
          <MetaCard>
            <MetaLabel>Foiz</MetaLabel>
            <MetaValue>
              {Math.round((correctCount / internalQueue.length) * 100)}%
            </MetaValue>
          </MetaCard>
        </GameMeta>

        <GameResultBox>
          {answers.map((ans, idx) => (
            <ResultRow key={idx}>
              <StatusIcon $correct={ans.isCorrect}>
                {ans.isCorrect ? "✓" : "✗"}
              </StatusIcon>
              <div style={{ flex: 1 }}>
                <div style={{ color: "var(--text-color)", fontWeight: 600 }}>
                  {ans.card.front}
                </div>
                <div style={{ color: "var(--text-muted-color)", fontSize: 13 }}>
                  To'g'ri: {ans.card.back}
                </div>
              </div>
              {!ans.isCorrect && (
                <div
                  style={{ color: "#ef4444", fontSize: 12, fontWeight: 700 }}
                >
                  {ans.selectedOption}
                </div>
              )}
            </ResultRow>
          ))}
        </GameResultBox>

        <ResultActions>
          <StudyBtn
            onClick={handleRestartMissed}
            disabled={correctCount === internalQueue.length}
          >
            Topilmaganlarni ishlash
          </StudyBtn>
          <StudyBtn onClick={handleRestartAll} $primary>
            Qayta urinish
          </StudyBtn>
          <StudyBtn onClick={onBack}>Tugallash</StudyBtn>
        </ResultActions>
      </GameContainer>
    );
  }

  return (
    <GameContainer $shaking={shaking}>
      <GameHeader>
        <BackBtn onClick={onBack}>
          <ArrowLeft size={18} /> Chiqish
        </BackBtn>
        <Title>{deck.title}</Title>
      </GameHeader>

      <GameMeta>
        <MetaCard>
          <MetaLabel>Savol</MetaLabel>
          <MetaValue>
            {currentIndex + 1}/{internalQueue.length}
          </MetaValue>
        </MetaCard>
        <MetaCard>
          <MetaLabel>Topildi</MetaLabel>
          <MetaValue>{correctCount}</MetaValue>
        </MetaCard>
        <MetaCard>
          <MetaLabel>Streak</MetaLabel>
          <MetaValue>{streak}</MetaValue>
        </MetaCard>
      </GameMeta>

      <GameBoard ref={boardRef}>
        <BoardGlow />
        <PromptBar>
          <PromptText>
            {promptSide === "front" ? currentCard.front : currentCard.back}
          </PromptText>
        </PromptBar>

        <GameArena>
          {currentOptions.map((opt, idx) => (
            <Target
              key={`${currentIndex}-${idx}`}
              type="button"
              $index={idx}
              $top={GAME_POSITIONS[idx].top}
              $left={GAME_POSITIONS[idx].left}
              $right={GAME_POSITIONS[idx].right}
              $hidden={hiddenOption === opt}
              $isWrong={wrongOption === opt}
              $speedBoost={Math.max(0, 4 - Math.floor(streak / 3))}
              onClick={(e) => handleFire(opt, e)}
            >
              {opt}
            </Target>
          ))}

          {projectile && <Projectile $tx={projectile.tx} $ty={projectile.ty} />}
          {explosionData && (
            <ExplosionEffect $x={explosionData.x} $y={explosionData.y} />
          )}
        </GameArena>

        <CannonContainer>
          <CannonBarrel $angle={cannonAngle} />
          <CannonBase />
        </CannonContainer>
      </GameBoard>

      <div
        style={{
          textAlign: "center",
          color: "var(--text-muted-color)",
          fontSize: 13,
        }}
      >
        To'g'ri variantni tanlab o'q uzing!
      </div>
    </GameContainer>
  );
};

export default FlashcardShooterGame;
