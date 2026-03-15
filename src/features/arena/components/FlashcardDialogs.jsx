import React from "react";
import { Download, PlayCircle, RefreshCw, Users, Eye, Link2, Pencil, Trash2, LogOut, MoreHorizontal, X } from "lucide-react";

export const FlashcardDeckViewDialog = ({
  ui,
  viewingDeck,
  setViewingDeck,
  isViewingOwnDeck,
  hasJoinedViewingDeck,
  onJoin,
  openTrainingPicker,
}) => {
  const {
    Overlay,
    Dialog,
    HeaderRow,
    Title,
    DialogContent,
    ButtonWrapper,
    StudyBtn,
    DeckPreviewList,
    PreviewItem,
    PreviewRow,
    PreviewLabel,
    PreviewContent,
  } = ui;

  return (
    <Overlay onClick={() => setViewingDeck(null)}>
      <Dialog onClick={(e) => e.stopPropagation()}>
        <HeaderRow
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid var(--border-color)",
          }}
        >
          <Title>{viewingDeck.title}</Title>
          <ButtonWrapper onClick={() => setViewingDeck(null)}>
            <X size={20} />
          </ButtonWrapper>
        </HeaderRow>
        <DialogContent>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <img
              src={
                viewingDeck.createdBy?.avatar ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="avatar"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <div>
              <div style={{ color: "var(--text-color)", fontWeight: "600" }}>
                {viewingDeck.createdBy?.nickname || "Noma'lum"}
              </div>
              <div
                style={{
                  color: "var(--text-muted-color)",
                  fontSize: "13px",
                }}
              >
                Lug'at yaratuvchisi
              </div>
            </div>

            {!isViewingOwnDeck && !hasJoinedViewingDeck && (
              <button
                onClick={() => onJoin(viewingDeck._id)}
                style={{
                  marginLeft: "auto",
                  background: "var(--primary-color)",
                  color: "white",
                  border: "none",
                  padding: "8px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
                title="Yuklab olish (Qo'shilish)"
              >
                <Download size={20} />
              </button>
            )}
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            {viewingDeck.cards?.some((c) => new Date(c.nextReviewDate) <= new Date()) ? (
              <StudyBtn style={{ flex: 1 }} onClick={() => openTrainingPicker(viewingDeck)}>
                <PlayCircle size={18} /> O'qishni boshlash
              </StudyBtn>
            ) : (
              <StudyBtn
                style={{
                  flex: 1,
                  background: "var(--secondary-color)",
                  color: "var(--text-color)",
                  border: "1px solid var(--border-color)",
                }}
                onClick={() => openTrainingPicker(viewingDeck)}
              >
                <RefreshCw size={18} /> Yana mashiq qilish
              </StudyBtn>
            )}
          </div>

          <div>
            <div
              style={{
                color: "var(--text-color)",
                fontWeight: "600",
                marginBottom: "8px",
                fontSize: "15px",
              }}
            >
              To'plamdagi so'zlar ({viewingDeck.cards?.length || 0})
            </div>
            <DeckPreviewList>
              {viewingDeck.cards?.map((card, idx) => (
                <PreviewItem key={card._id || idx}>
                  <PreviewRow style={{ alignItems: "center" }}>
                    <PreviewLabel>Oldi:</PreviewLabel>
                    <PreviewContent
                      style={{ display: "flex", alignItems: "center", gap: "8px" }}
                    >
                      {card.frontImage && (
                        <img
                          src={card.frontImage}
                          alt="f"
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: 4,
                            objectFit: "cover",
                          }}
                        />
                      )}
                      {card.front}
                    </PreviewContent>
                  </PreviewRow>
                  <PreviewRow style={{ alignItems: "center" }}>
                    <PreviewLabel>Orqa:</PreviewLabel>
                    <PreviewContent
                      style={{ display: "flex", alignItems: "center", gap: "8px" }}
                    >
                      {card.backImage && (
                        <img
                          src={card.backImage}
                          alt="b"
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: 4,
                            objectFit: "cover",
                          }}
                        />
                      )}
                      {card.back}
                    </PreviewContent>
                  </PreviewRow>
                </PreviewItem>
              ))}
            </DeckPreviewList>
          </div>
        </DialogContent>
      </Dialog>
    </Overlay>
  );
};

export const FlashcardMembersDialog = ({
  ui,
  showMembersForDeck,
  setShowMembersForDeck,
}) => {
  const { Overlay, Dialog, HeaderRow, Title, ButtonWrapper, DialogContent } = ui;

  return (
    <Overlay onClick={() => setShowMembersForDeck(null)}>
      <Dialog onClick={(e) => e.stopPropagation()}>
        <HeaderRow
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid var(--border-color)",
          }}
        >
          <Title>A'zolar ro'yxati</Title>

          <ButtonWrapper onClick={() => setShowMembersForDeck(null)}>
            <X size={20} />
          </ButtonWrapper>
        </HeaderRow>
        <DialogContent>
          {showMembersForDeck.members?.length > 0 ? (
            showMembersForDeck.members.map((m, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "10px 0",
                  borderBottom: "1px solid var(--border-color)",
                }}
              >
                <img
                  src={
                    m.userId?.avatar ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="avatar"
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <span style={{ color: "var(--text-color)" }}>
                  {m.userId?.nickname || "Noma'lum"}
                </span>
                <span
                  style={{
                    marginLeft: "auto",
                    fontSize: "12px",
                    color: "var(--text-muted-color)",
                  }}
                >
                  Joined: {new Date(m.joinedAt).toLocaleDateString()}
                </span>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", color: "var(--text-muted-color)" }}>
              Hozircha hech kim qo'shilmagan.
            </p>
          )}
        </DialogContent>
      </Dialog>
    </Overlay>
  );
};

export const FlashcardTrainingPickerDialog = ({
  ui,
  trainingPickerDeck,
  setTrainingPickerDeck,
  promptSide,
  setPromptSide,
  startStudy,
  startClassicStudy,
  startTestStudy,
  startGameStudy,
}) => {
  const {
    Overlay,
    Dialog,
    HeaderRow,
    Title,
    ButtonWrapper,
    DialogContent,
    SettingsGrid,
    FieldLabel,
    DirectionSelect,
    ModeOptions,
    ModeCard,
    ModeTitle,
    ModeDesc,
  } = ui;

  return (
    <Overlay onClick={() => setTrainingPickerDeck(null)}>
      <Dialog onClick={(event) => event.stopPropagation()}>
        <HeaderRow
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid var(--border-color)",
          }}
        >
          <Title>Mashq turini tanlang</Title>
          <ButtonWrapper onClick={() => setTrainingPickerDeck(null)}>
            <X size={20} />
          </ButtonWrapper>
        </HeaderRow>
        <DialogContent>
          <SettingsGrid>
            <FieldLabel htmlFor="flashcard-prompt-side">
              Qaysi tomoni so'ralsin?
            </FieldLabel>
            <DirectionSelect
              id="flashcard-prompt-side"
              value={promptSide}
              onChange={(event) => setPromptSide(event.target.value)}
            >
              <option value="front">Old tomoni so'ralsin</option>
              <option value="back">Orqa tomoni so'ralsin</option>
            </DirectionSelect>
          </SettingsGrid>
          <ModeOptions>
            <ModeCard
              onClick={() => {
                startStudy(trainingPickerDeck, true);
                setTrainingPickerDeck(null);
              }}
            >
              <ModeTitle>Eslab qolish</ModeTitle>
              <ModeDesc>
                {promptSide === "front"
                  ? "Old tomoni ko'rsatiladi, orqa tomon bo'yicha baholaysiz."
                  : "Orqa tomoni ko'rsatiladi, old tomon bo'yicha baholaysiz."}
              </ModeDesc>
            </ModeCard>
            <ModeCard onClick={() => startClassicStudy(trainingPickerDeck)}>
              <ModeTitle>Flashcards</ModeTitle>
              <ModeDesc>
                {promptSide === "front"
                  ? "Old tomondan boshlanadi, aylantirib orqa tomonni topasiz."
                  : "Orqa tomondan boshlanadi, aylantirib old tomonni topasiz."}
              </ModeDesc>
            </ModeCard>
            <ModeCard onClick={() => startTestStudy(trainingPickerDeck)}>
              <ModeTitle>Test mashqi</ModeTitle>
              <ModeDesc>
                {promptSide === "front"
                  ? "Old tomon ko'rinadi, variantlarda mos orqa tomonni tanlaysiz."
                  : "Orqa tomon ko'rinadi, variantlarda mos old tomonni tanlaysiz."}
              </ModeDesc>
            </ModeCard>
            <ModeCard onClick={() => startGameStudy(trainingPickerDeck)}>
              <ModeTitle>Shooter o'yin</ModeTitle>
              <ModeDesc>
                {promptSide === "front"
                  ? "Old tomoni bo'yicha mos orqa tomonga o'q uzasiz."
                  : "Orqa tomoni bo'yicha mos old tomonga o'q uzasiz."}
              </ModeDesc>
            </ModeCard>
          </ModeOptions>
        </DialogContent>
      </Dialog>
    </Overlay>
  );
};
