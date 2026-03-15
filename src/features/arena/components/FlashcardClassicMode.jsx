import React from "react";
import { ArrowLeft, Undo2, Volume2, X } from "lucide-react";

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
  handleClassicReplay,
  getClassicStackLayout,
  getPromptImage,
  getPromptText,
  getAnswerImage,
  getAnswerText,
  handleClassicPointerDown,
  handleClassicPointerMove,
  handleClassicPointerEnd,
  speakClassicCard,
  restartClassicMissed,
  restartClassicAll,
}) {
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
    ClassicNextPreviewCard,
    ClassicCardToolbarSpacer,
    ClassicToolbarIcon,
    ClassicCardBody,
    ClassicCardImage,
    ClassicNextPreviewWord,
    ClassicSwipeCard,
    ClassicFlipLayer,
    ClassicCardFront,
    ClassicCardToolbar,
    ClassicCardWord,
    ClassicCardBack,
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
  const stackedCards = classicQueue.slice(classicIndex + 1);
  const foundCount = classicAnswers.filter((item) => item.known).length;
  const missedCount = classicAnswers.filter((item) => !item.known).length;
  const swipeProgress = Math.min(Math.abs(classicDragX) / 120, 1);
  const promptImage = getPromptImage(currentCard);
  const answerImage = getAnswerImage(currentCard);
  const promptText = getPromptText(currentCard) || "???";
  const answerText = getAnswerText(currentCard) || "???";
  const progressValue = classicQueue.length
    ? ((classicCompleted ? classicQueue.length : classicIndex + 1) /
        classicQueue.length) *
      100
    : 0;
  const swipeTone =
    classicDragX > 0 ? "success" : classicDragX < 0 ? "danger" : null;

  // Faqat birinchi karta uchun kirish animatsiyasi bo'ladi
  const isFirstCard = classicIndex === 0;

  return (
    <Container $fullscreen={!classicCompleted}>
      {!classicCompleted ? (
        <ClassicFullscreenShell data-classic-flashcard-fullscreen="true">
          <ClassicTopBar>
            <ClassicTopIconButton
              type="button"
              onClick={() => {
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
              disabled={classicIndex === 0 && classicAnswers.length === 0}
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
                .map((card, idx) => ({ card, depth: idx + 1 }))
                .reverse()
                .map(({ card, depth }) => {
                  const stackLayout = getClassicStackLayout(depth);
                  if (depth !== 1) {
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
                  }

                  const previewImage = getPromptImage(card);
                  const previewText = getPromptText(card) || "???";
                  return (
                    <ClassicNextPreviewCard
                      key={card._id || `stack-${depth}`}
                      $offsetX={stackLayout.offsetX}
                      $offsetY={stackLayout.offsetY}
                      $rotate={stackLayout.rotate}
                      $scale={stackLayout.scale}
                      $opacity={stackLayout.opacity}
                      $zIndex={stackLayout.zIndex}
                    >
                      <ClassicCardToolbarSpacer>
                        <ClassicToolbarIcon
                          type="button"
                          tabIndex={-1}
                          aria-hidden="true"
                        >
                          <Volume2 size={22} />
                        </ClassicToolbarIcon>
                      </ClassicCardToolbarSpacer>
                      <ClassicCardBody>
                        {previewImage ? (
                          <ClassicCardImage src={previewImage} />
                        ) : null}
                        <ClassicNextPreviewWord>{previewText}</ClassicNextPreviewWord>
                      </ClassicCardBody>
                    </ClassicNextPreviewCard>
                  );
                })}

              {/* Asosiy suriladigan karta */}
{!classicCompleted && currentCard && (
  <ClassicSwipeCard
key={classicExitDirection ? `swipe-card-exiting-${classicIndex}` : `swipe-card-${classicIndex}`}
  $isFirst={classicIndex === 0}
  $dragX={classicDragX}
  $dragging={classicDragging}
  $exiting={Boolean(classicExitDirection)}
  $exitDirection={classicExitDirection}
  $swipeTone={swipeTone}
  $swipeStrength={swipeProgress}
  onPointerDown={handleClassicPointerDown}
  onPointerMove={handleClassicPointerMove}
  onPointerUp={handleClassicPointerEnd}
  onPointerCancel={handleClassicPointerEnd}
  onPointerLeave={() => {
    if (classicDragging) handleClassicPointerEnd();
  }}
  >
                  <ClassicFlipLayer
                    $flipped={classicExitDirection ? classicExitFlipped : classicShowBack}
                  >
                    <ClassicCardFront>
                      <ClassicCardToolbar>
                        <ClassicToolbarIcon
                          type="button"
                          onPointerDown={(event) => event.stopPropagation()}
                          onClick={(event) => speakClassicCard("prompt", event)}
                        >
                          <Volume2 size={22} />
                        </ClassicToolbarIcon>
                      </ClassicCardToolbar>
                      <ClassicCardBody>
                        {promptImage && <ClassicCardImage src={promptImage} />}
                        <ClassicCardWord
                          $blur={swipeProgress * 2}
                          $fade={swipeProgress}
                        >
                          {promptText}
                        </ClassicCardWord>
                      </ClassicCardBody>
                    </ClassicCardFront>

                    <ClassicCardBack>
                      <ClassicCardToolbar>
                        <ClassicToolbarIcon
                          type="button"
                          onPointerDown={(event) => event.stopPropagation()}
                          onClick={(event) => speakClassicCard("answer", event)}
                        >
                          <Volume2 size={22} />
                        </ClassicToolbarIcon>
                      </ClassicCardToolbar>
                      <ClassicCardBody>
                        {answerImage && <ClassicCardImage src={answerImage} />}
                        <ClassicCardWord>{answerText}</ClassicCardWord>
                      </ClassicCardBody>
                    </ClassicCardBack>
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