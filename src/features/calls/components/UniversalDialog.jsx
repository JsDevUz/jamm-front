import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled, { css, keyframes } from "styled-components";
import { Globe2, Lock, Video, X } from "lucide-react";
import { SidebarIconButton as ButtonWrapper } from "../../../shared/ui/buttons/IconButton";
import { APP_LIMITS } from "../../../constants/appLimits";

const overlayIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const overlayOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const dialogIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(18px) scale(0.985);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const dialogOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(14px) scale(0.985);
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(2, 6, 23, 0.78);
  backdrop-filter: blur(12px);
  animation: ${(props) => (props.$closing ? overlayOut : overlayIn)} 180ms ease
    forwards;

  @media (max-width: 640px) {
    padding: 12px;
    align-items: center;
  }
`;

const Dialog = styled.div`
  --meet-text: var(--text-color);
  --meet-muted: var(--text-muted-color);
  --meet-surface: color-mix(in srgb, var(--secondary-color) 82%, black 18%);
  --meet-surface-2: color-mix(in srgb, var(--tertiary-color) 84%, black 16%);
  --meet-surface-3: color-mix(in srgb, var(--input-color) 86%, black 14%);
  --meet-border: color-mix(in srgb, var(--border-color) 82%, white 18%);
  --meet-soft: color-mix(in srgb, var(--background-color) 72%, transparent);
  --meet-primary: var(--primary-color);
  --meet-primary-soft: color-mix(
    in srgb,
    var(--primary-color) 18%,
    transparent
  );
  --meet-accent: #14b8a6;

  width: min(100%, 480px);
  max-height: min(86vh, 640px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 18px;
  border: 1px solid var(--meet-border);
  background: color-mix(
    in srgb,
    var(--meet-surface) 88%,
    var(--meet-surface-2) 12%
  );
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.34);
  animation: ${(props) => (props.$closing ? dialogOut : dialogIn)} 180ms ease
    forwards;

  @media (max-width: 640px) {
    width: 100%;
    max-height: calc(100vh - 24px);
    border-radius: 18px;
  }
`;

const Header = styled.div`
  padding: 14px 16px 12px;
  border-bottom: 1px solid var(--meet-border);
  background: color-mix(in srgb, var(--meet-surface) 88%, transparent);
  backdrop-filter: blur(16px);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;

  @media (max-width: 640px) {
    padding: 14px 14px 10px;
  }
`;

const HeaderMeta = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

const IconWrap = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: color-mix(in srgb, var(--meet-primary) 82%, white 18%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 10px 24px rgba(20, 184, 166, 0.2);
`;

const TitleBlock = styled.div`
  h2 {
    margin: 0 0 4px;
    color: var(--meet-text);
    font-size: 18px;
    line-height: 1.1;
  }

  p {
    margin: 0;
    color: var(--meet-muted);
    font-size: 12px;
    line-height: 1.45;
    max-width: 320px;
  }
`;

const CloseButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: color-mix(in srgb, var(--meet-soft) 72%, transparent);
  color: var(--meet-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
`;

const Body = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 14px 16px;
  display: grid;
  gap: 12px;

  @media (max-width: 640px) {
    padding: 12px 14px;
    gap: 10px;
  }
`;

const Hero = styled.div`
  border-radius: 12px;
  padding: 12px;
  background: color-mix(
    in srgb,
    var(--meet-surface) 72%,
    var(--meet-primary-soft) 28%
  );
  border: 1px solid
    color-mix(in srgb, var(--meet-primary) 16%, var(--meet-border) 84%);

`;

const HeroTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--meet-text);
  font-size: 14px;
  font-weight: 800;
  margin-bottom: 4px;
`;

const HeroText = styled.p`
  margin: 0;
  color: var(--meet-muted);
  font-size: 12px;
  line-height: 1.45;
`;

const Panel = styled.div`
  border-radius: 12px;
  padding: 12px;
  background: color-mix(in srgb, var(--meet-surface) 76%, transparent);
  border: 1px solid var(--meet-border);
`;

const PanelTitle = styled.div`
  color: var(--meet-text);
  font-size: 14px;
  font-weight: 800;
  margin-bottom: 4px;
`;

const PanelText = styled.div`
  color: var(--meet-muted);
  font-size: 12px;
  line-height: 1.45;
  margin-bottom: 10px;
`;

const FormGrid = styled.div`
  display: grid;
  gap: 10px;
`;

const Field = styled.label`
  display: grid;
  gap: 6px;
  color: var(--meet-muted);
  font-size: 12px;
  font-weight: 700;
`;

const sharedFieldStyles = css`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid var(--meet-border);
  border-radius: 10px;
  background: var(--meet-surface-3);
  color: var(--meet-text);
  outline: none;
  transition:
    border-color 0.2s ease,
    background 0.2s ease;

  &:focus {
    border-color: color-mix(in srgb, var(--meet-primary) 62%, white 38%);
    background: color-mix(in srgb, var(--meet-surface) 86%, white 14%);
  }
`;

const Input = styled.input`
  ${sharedFieldStyles};
  min-height: 40px;
  padding: 0 12px;
  font-size: 13px;
`;

const Textarea = styled.textarea`
  ${sharedFieldStyles};
  min-height: 84px;
  padding: 10px 12px;
  resize: vertical;
  font-size: 13px;
  line-height: 1.5;
`;

const PrivacyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const PrivacyCard = styled.button`
  border: 1px solid
    ${(props) =>
      props.$active
        ? "color-mix(in srgb, var(--meet-primary) 55%, white 45%)"
        : "var(--meet-border)"};
  background: ${(props) =>
    props.$active
      ? "color-mix(in srgb, var(--meet-primary-soft) 70%, var(--meet-surface-2) 30%)"
      : "color-mix(in srgb, var(--meet-surface-2) 90%, transparent)"};
  border-radius: 10px;
  padding: 10px;
  text-align: left;
  cursor: pointer;
`;

const PrivacyTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 8px;
`;

const PrivacyIcon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: color-mix(in srgb, var(--meet-soft) 72%, transparent);
  color: var(--meet-accent);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PrivacyBadge = styled.div`
  padding: 4px 8px;
  border-radius: 999px;
  background: ${(props) =>
    props.$active
      ? "var(--meet-primary-soft)"
      : "color-mix(in srgb, var(--meet-soft) 72%, transparent)"};
  color: ${(props) =>
    props.$active
      ? "color-mix(in srgb, var(--meet-primary) 78%, white 22%)"
      : "var(--meet-muted)"};
  font-size: 10px;
  font-weight: 800;
`;

const PrivacyTitle = styled.div`
  color: var(--meet-text);
  font-size: 12px;
  font-weight: 800;
  margin-bottom: 3px;
`;

const PrivacyText = styled.div`
  color: var(--meet-muted);
  font-size: 11px;
  line-height: 1.4;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 12px 16px 14px;
  border-top: 1px solid var(--meet-border);
  background: color-mix(in srgb, var(--meet-surface) 86%, transparent);

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
    padding: 10px 14px 14px;
  }
`;

const FooterNote = styled.div`
  color: var(--meet-muted);
  font-size: 11px;
  line-height: 1.4;
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;

  @media (max-width: 640px) {
    width: 100%;
  }
`;

const Button = styled.button`
  min-width: 112px;
  height: 38px;
  padding: 0 12px;
  border: 1px solid
    ${(props) =>
      props.$variant === "primary" ? "transparent" : "var(--meet-border)"};
  border-radius: 10px;
  background: ${(props) =>
    props.$variant === "primary"
      ? "var(--meet-primary)"
      : "color-mix(in srgb, var(--meet-soft) 72%, transparent)"};
  color: ${(props) =>
    props.$variant === "primary" ? "white" : "var(--meet-text)"};
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? 0.55 : 1)};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};

  @media (max-width: 640px) {
    flex: 1;
    min-width: 0;
  }
`;

const EXIT_MS = 180;

const UniversalDialog = ({ isOpen, onClose, onCreateCall }) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setIsPrivate(false);
  };

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
      return;
    }

    if (!shouldRender) return;
    setIsClosing(true);
    const timeout = setTimeout(() => {
      setShouldRender(false);
      setIsClosing(false);
      resetForm();
    }, EXIT_MS);

    return () => clearTimeout(timeout);
  }, [isOpen, shouldRender]);

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      onClose?.();
    }, EXIT_MS);
  };

  const handleCreateCall = () => {
    if (!title.trim()) return;
    onCreateCall({
      title: title.trim(),
      description: description.trim(),
      isPrivate,
    });
    handleClose();
  };

  const privacyLabel = useMemo(
    () =>
      isPrivate
        ? t("meetDialog.privacyPrivateHint")
        : t("meetDialog.privacyPublicHint"),
    [isPrivate, t],
  );

  if (!shouldRender) return null;

  return (
    <Overlay $closing={isClosing} onClick={handleClose}>
      <Dialog $closing={isClosing} onClick={(e) => e.stopPropagation()}>
        <Header>
          <HeaderMeta>
            <IconWrap>
              <Video size={26} />
            </IconWrap>
            <TitleBlock>
              <h2>{t("meetDialog.title")}</h2>
              <p>{t("meetDialog.subtitle")}</p>
            </TitleBlock>
          </HeaderMeta>

          <ButtonWrapper onClick={handleClose}>
            <X size={18} />
          </ButtonWrapper>
        </Header>

        <Body>
          <Hero>
            <HeroTitle>
              <Video size={16} />
              {t("meetDialog.heroTitle")}
            </HeroTitle>
            <HeroText>{t("meetDialog.heroDescription")}</HeroText>
          </Hero>

          <Panel>
            <PanelTitle>{t("meetDialog.detailsTitle")}</PanelTitle>
            <PanelText>{t("meetDialog.detailsDescription")}</PanelText>

            <FormGrid>
              <Field>
                {t("meetDialog.name")}
                <Input
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value.slice(0, APP_LIMITS.meetTitleChars))
                  }
                  placeholder={t("meetDialog.namePlaceholder")}
                  maxLength={APP_LIMITS.meetTitleChars}
                  autoFocus
                />
              </Field>

              <Field>
                {t("meetDialog.description")}
                <Textarea
                  value={description}
                  onChange={(e) =>
                    setDescription(
                      e.target.value.slice(0, APP_LIMITS.meetDescriptionChars),
                    )
                  }
                  placeholder={t("meetDialog.descriptionPlaceholder")}
                  maxLength={APP_LIMITS.meetDescriptionChars}
                />
              </Field>
            </FormGrid>
          </Panel>

          <Panel>
            <PanelTitle>{t("meetDialog.privacyTitle")}</PanelTitle>
            <PanelText>{privacyLabel}</PanelText>

            <PrivacyGrid>
              <PrivacyCard
                type="button"
                $active={!isPrivate}
                onClick={() => setIsPrivate(false)}
              >
                <PrivacyTop>
                  <PrivacyIcon>
                    <Globe2 size={18} />
                  </PrivacyIcon>
                  <PrivacyBadge $active={!isPrivate}>
                    {t("meetDialog.publicBadge")}
                  </PrivacyBadge>
                </PrivacyTop>
                <PrivacyTitle>{t("meetDialog.publicTitle")}</PrivacyTitle>
                <PrivacyText>{t("meetDialog.publicDescription")}</PrivacyText>
              </PrivacyCard>

              <PrivacyCard
                type="button"
                $active={isPrivate}
                onClick={() => setIsPrivate(true)}
              >
                <PrivacyTop>
                  <PrivacyIcon>
                    <Lock size={18} />
                  </PrivacyIcon>
                  <PrivacyBadge $active={isPrivate}>
                    {t("meetDialog.privateBadge")}
                  </PrivacyBadge>
                </PrivacyTop>
                <PrivacyTitle>{t("meetDialog.privateTitle")}</PrivacyTitle>
                <PrivacyText>{t("meetDialog.privateDescription")}</PrivacyText>
              </PrivacyCard>
            </PrivacyGrid>
          </Panel>
        </Body>

        <Footer>
          <FooterNote>{t("meetDialog.footerNote")}</FooterNote>

          <Actions>
            <Button onClick={handleClose}>{t("common.cancel")}</Button>
            <Button
              $variant="primary"
              onClick={handleCreateCall}
              disabled={!title.trim()}
            >
              {t("meetDialog.create")}
            </Button>
          </Actions>
        </Footer>
      </Dialog>
    </Overlay>
  );
};

export default UniversalDialog;
