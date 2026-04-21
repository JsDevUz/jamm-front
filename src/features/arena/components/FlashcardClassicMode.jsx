import React from "react";
import { ArrowLeft, Undo2, Volume2, X } from "lucide-react";
import { useHotkeys } from "react-hotkeys-hook";

export default function FlashcardClassicMode({
  ui,
  classicDeck,
  classicQueue,
  classicIndex,
  classicAnswers,
  classicCompleted,
  classicDragX,
  classicDragging,
  classicExitDirection,
  classicExitFlipped,
  classicShowBack,
  setClassicDeck,
  setClassicQueue,
  setClassicAnswers,
  setClassicCompleted,
  onClose,
  handleClassicReplay,
  handleClassicKeyboardSwipe,
  getClassicStackLayout,
  getPromptImage,
  getPromptText,
  getAnswerText,
  handleClassicPointerDown,
  handleClassicPointerMove,
  handleClassicPointerEnd,
  speakClassicCard,
  restartClassicMissed,
  restartClassicAll,
}) {
  const isDesktop = typeof window !== "undefined" && window.innerWidth > 768;
  const shouldUseFullscreen = !classicCompleted && !isDesktop;
  const {
    Container,
    ClassicFullscreenShell,
    ClassicTopBar,
    ClassicTopIconButton,
    ClassicTopCounter,
    ClassicGhostAction,
    ClassicProgressTrack,
    ClassicProgressFill,
    ClassicViewport,
    ClassicFloatingCounter,
    ClassicCardStage,
    ClassicStackCard,
    ClassicToolbarIcon,
    ClassicCardBody,
    ClassicCardContent,
    ClassicCardImage,
    ClassicSwipeCard,
    ClassicFlipLayer,
    ClassicCardToolbar,
    ClassicCardWord,
    ClassicSecondarySlot,
    ClassicPromptHint,
    ClassicAnswerPanel,
    ClassicSwipeStamp,
    StudyArea,
    BackBtn,
    Title,
    StudyMeta,
    FlashcardBox,
    PreviewItem,
    PreviewRow,
    PreviewLabel,
    PreviewContent,
    ResultActions,
    StudyBtn,
  } = ui;

  const currentCard = classicQueue[classicIndex];
  const stackedCards = classicQueue.slice(classicIndex + 1, classicIndex + 4);
  const foundCount = classicAnswers.filter((item) => item.known).length;
  const missedCount = classicAnswers.filter((item) => !item.known).length;
  const swipeProgress = Math.min(Math.abs(classicDragX) / 120, 1);
  const promptImage = getPromptImage(currentCard);
  const promptText = getPromptText(currentCard) || "???";
  const answerText = getAnswerText(currentCard) || "???";
  const progressValue = classicQueue.length
    ? ((classicCompleted ? classicQueue.length : classicIndex + 1) /
        classicQueue.length) *
      100
    : 0;
  const swipeTone =
    classicDragX > 0 ? "success" : classicDragX < 0 ? "danger" : null;
  const leftExitDepth =
    classicQueue.length <= 2
      ? 2
      : classicQueue.length === 3
        ? 3
        : classicQueue.length === 4
          ? 4
          : 5;
  const leftExitLayout = getClassicStackLayout(leftExitDepth);
  const leftExitTranslateZ =
    leftExitDepth === 2
      ? -120
      : leftExitDepth === 3
        ? -180
        : leftExitDepth === 4
          ? -240
          : -300;
  const leftSwipeStampOpacity =
    classicExitDirection === "left"
      ? 1
      : classicDragX < 0
        ? swipeProgress
        : 0;
  const rightSwipeStampOpacity =
    classicExitDirection === "right"
      ? 1
      : classicDragX > 0
        ? swipeProgress
        : 0;

  useHotkeys(
    "left",
    (event) => {
      event.preventDefault();
      handleClassicKeyboardSwipe("left");
    },
    {
      enabled: isDesktop && !classicCompleted && Boolean(currentCard),
      preventDefault: true,
    },
    [isDesktop, classicCompleted, currentCard, handleClassicKeyboardSwipe],
  );

  useHotkeys(
    "right",
    (event) => {
      event.preventDefault();
      handleClassicKeyboardSwipe("right");
    },
    {
      enabled: isDesktop && !classicCompleted && Boolean(currentCard),
      preventDefault: true,
    },
    [isDesktop, classicCompleted, currentCard, handleClassicKeyboardSwipe],
  );

  useHotkeys(
    "down",
    (event) => {
      event.preventDefault();
      handleClassicReplay();
    },
    {
      enabled: isDesktop && !classicCompleted,
      preventDefault: true,
    },
    [isDesktop, classicCompleted, handleClassicReplay],
  );

  useHotkeys(
    "space",
    (event) => {
      event.preventDefault();
      if (!classicExitDirection && !classicDragging && currentCard) {
        handleClassicKeyboardSwipe("flip");
      }
    },
    {
      enabled: isDesktop && !classicCompleted && Boolean(currentCard),
      preventDefault: true,
    },
    [
      isDesktop,
      classicCompleted,
      currentCard,
      classicExitDirection,
      classicDragging,
      handleClassicKeyboardSwipe,
    ],
  );

  return (
    <Container $fullscreen={shouldUseFullscreen}>
      {!classicCompleted ? (
        <ClassicFullscreenShell data-classic-flashcard-fullscreen="true">
          <ClassicTopBar>
            <ClassicTopIconButton
              type="button"
              onClick={() => {
                if (onClose) {
                  onClose();
                  return;
                }
                setClassicDeck(null);
                setClassicQueue([]);
                setClassicAnswers([]);
                setClassicCompleted(false);
              }}
              title="Yopish"
            >
              <X size={26} />
            </ClassicTopIconButton>

            <ClassicTopCounter>
              {classicIndex + 1} / {classicQueue.length}
            </ClassicTopCounter>
            <ClassicGhostAction
              type="button"
              onClick={handleClassicReplay}
              disabled={Boolean(classicExitDirection)}
              title="Oldingi karta"
            >
              <Undo2 size={24} />
            </ClassicGhostAction>
          </ClassicTopBar>

          <ClassicProgressTrack>
            <ClassicProgressFill $progress={progressValue} />
          </ClassicProgressTrack>

          <ClassicViewport>
            <ClassicFloatingCounter $side="left">
              {missedCount}
            </ClassicFloatingCounter>
            <ClassicFloatingCounter $side="right">
              {foundCount}
            </ClassicFloatingCounter>

            <ClassicCardStage>
              {/* Stacked kartalar (oldingi ko'rinishlar) */}
              {stackedCards
                .map((card, idx) => ({ card, depth: idx + 2 }))
                .reverse()
                .map(({ card, depth }) => {
                  const stackLayout = getClassicStackLayout(depth);
                  return (
                    <ClassicStackCard
                      key={card._id || `stack-surface-${depth}`}
                      $offsetX={stackLayout.offsetX}
                      $offsetY={stackLayout.offsetY}
                      $rotate={stackLayout.rotate}
                      $scale={stackLayout.scale}
                      $opacity={stackLayout.opacity}
                      $zIndex={stackLayout.zIndex}
                    />
                  );
                })}

              {/* Asosiy suriladigan karta */}
              {!classicCompleted && currentCard && (
                <ClassicSwipeCard
                  key={currentCard._id || `swipe-card-${classicIndex}`}
                  $isFirst={classicIndex === 0}
                  $dragX={classicDragX}
                  $dragging={classicDragging}
                  $exiting={Boolean(classicExitDirection)}
                  $exitDirection={classicExitDirection}
                  $swipeTone={swipeTone}
                  $swipeStrength={swipeProgress}
                  $leftExitOffsetX={leftExitLayout?.offsetX}
                  $leftExitOffsetY={leftExitLayout?.offsetY}
                  $leftExitRotate={leftExitLayout?.rotate}
                  $leftExitScale={leftExitLayout?.scale}
                  $leftExitTranslateZ={leftExitTranslateZ}
                  onPointerDown={handleClassicPointerDown}
                  onPointerMove={handleClassicPointerMove}
                  onPointerUp={handleClassicPointerEnd}
                  onPointerCancel={handleClassicPointerEnd}
                  onPointerLeave={() => {
                    if (classicDragging) handleClassicPointerEnd();
                  }}
                >
                  <ClassicFlipLayer $swipeTone={swipeTone} $swipeStrength={swipeProgress}>
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        padding: 14,
                        boxSizing: "border-box",
                      }}
                    >
                      <ClassicSwipeStamp
                        $side="left"
                        $tone="danger"
                        $opacity={leftSwipeStampOpacity}
                      >
                        YANA ×
                      </ClassicSwipeStamp>
                      <ClassicSwipeStamp
                        $side="right"
                        $tone="success"
                        $opacity={rightSwipeStampOpacity}
                      >
                        BILAMAN ✓
                      </ClassicSwipeStamp>
                      <ClassicCardToolbar>
                        <ClassicToolbarIcon
                          type="button"
                          onPointerDown={(event) => event.stopPropagation()}
                          onClick={(event) => speakClassicCard("prompt", event)}
                        >
                          <Volume2 size={22} />
                        </ClassicToolbarIcon>
                      </ClassicCardToolbar>
                      <ClassicCardBody
                        style={{
                          justifyContent: "center",
                          paddingTop: 0,
                        }}
                      >
                        <ClassicCardContent $hasImage={Boolean(promptImage)}>
                          {promptImage && <ClassicCardImage src={promptImage} />}
                          <ClassicCardWord
                            $blur={swipeProgress * 2}
                            $fade={swipeProgress}
                            $offsetY={
                              promptImage
                                ? "0px"
                                : "calc(-1 * clamp(34px, 4vh, 60px))"
                            }
                          >
                            {promptText}
                          </ClassicCardWord>
                          <ClassicSecondarySlot $hasImage={Boolean(promptImage)}>
                            <ClassicPromptHint $visible={!classicShowBack}>
                              JAVOBNI KO&apos;RSATISH
                            </ClassicPromptHint>
                            <ClassicAnswerPanel $visible={classicShowBack}>
                              <ClassicCardWord
                                $offsetY="0px"
                                style={{
                                  fontSize: "clamp(22px, 3.2vw, 40px)",
                                  lineHeight: 1.12,
                                  fontWeight: 300,
                                  textAlign: "center",
                                  color: "var(--text-color)",
                                  letterSpacing: "0",
                                }}
                              >
                                {answerText}
                              </ClassicCardWord>
                            </ClassicAnswerPanel>
                          </ClassicSecondarySlot>
                        </ClassicCardContent>
                      </ClassicCardBody>
                    </div>
                  </ClassicFlipLayer>
                </ClassicSwipeCard>
              )}
            </ClassicCardStage>
          </ClassicViewport>
        </ClassicFullscreenShell>
      ) : (
        // Yakuniy natija ekrani (o'zgarmagan)
        <StudyArea>
          <BackBtn
            onClick={() => {
              setClassicDeck(null);
              setClassicQueue([]);
              setClassicAnswers([]);
              setClassicCompleted(false);
            }}
          >
            <ArrowLeft size={20} /> Orqaga
          </BackBtn>

          <Title>{classicDeck.title} - Flashcards</Title>
          <StudyMeta>
            <span>
              Natija: {foundCount}/{classicQueue.length}
            </span>
            <span>Topdi: {foundCount} · Topolmadi: {missedCount}</span>
          </StudyMeta>

          <FlashcardBox>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {classicAnswers.map((item, index) => (
                <PreviewItem key={`${item.card._id || index}-${index}`}>
                  <PreviewRow>
                    <PreviewLabel>{index + 1}.</PreviewLabel>
                    <PreviewContent>{getPromptText(item.card)}</PreviewContent>
                  </PreviewRow>
                  <PreviewRow>
                    <PreviewLabel>Javob:</PreviewLabel>
                    <PreviewContent>{getAnswerText(item.card)}</PreviewContent>
                  </PreviewRow>
                  <PreviewRow>
                    <PreviewLabel>Holat:</PreviewLabel>
                    <PreviewContent
                      style={{
                        color: item.known ? "#22c55e" : "#ef4444",
                        fontWeight: 700,
                      }}
                    >
                      {item.known ? "Topdi" : "Topolmadi"}
                    </PreviewContent>
                  </PreviewRow>
                </PreviewItem>
              ))}
            </div>
          </FlashcardBox>
          <ResultActions>
            <StudyBtn
              onClick={restartClassicMissed}
              disabled={missedCount === 0}
              style={{ marginTop: 0 }}
            >
              Topilmaganlarni ishlash
            </StudyBtn>
            <StudyBtn
              onClick={restartClassicAll}
              style={{
                marginTop: 0,
                background: "var(--secondary-color)",
                color: "var(--text-color)",
                border: "1px solid var(--border-color)",
              }}
            >
              To'liq qayta ishlash
            </StudyBtn>
            <StudyBtn
              onClick={() => {
                setClassicDeck(null);
                setClassicQueue([]);
                setClassicAnswers([]);
                setClassicCompleted(false);
              }}
              style={{
                marginTop: 0,
                background: "var(--secondary-color)",
                color: "var(--text-color)",
                border: "1px solid var(--border-color)",
              }}
            >
              Asosiy oynaga qaytish
            </StudyBtn>
          </ResultActions>
        </StudyArea>
      )}
    </Container>
  );
}
