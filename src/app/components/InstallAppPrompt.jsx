import React, { useEffect, useMemo, useState } from "react";
import { Download, Share2, Smartphone } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  DialogActionButton,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalPanel,
  ModalSubtitle,
  ModalTitle,
  ModalTitleBlock,
} from "../../shared/ui/dialogs/ModalShell";
import styled from "styled-components";

const DISMISSED_KEY = "jamm-install-prompt-dismissed-v1";
export const OPEN_INSTALL_APP_PROMPT_EVENT = "jamm:open-install-app-prompt";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Hero = styled.div`
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 14px;
  border: 1px solid var(--border-color);
  border-radius: 16px;
  background: var(--tertiary-color, var(--input-color));
`;

const HeroIcon = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 14px;
  background: var(--input-color);
  color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const HeroText = styled.div`
  min-width: 0;
`;

const HeroTitle = styled.div`
  color: var(--text-color);
  font-size: 15px;
  font-weight: 700;
`;

const HeroDescription = styled.p`
  margin: 6px 0 0;
  color: var(--text-muted-color);
  font-size: 13px;
  line-height: 1.55;
`;

const Steps = styled.div`
  display: grid;
  gap: 10px;
`;

const Step = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  padding: 12px 14px;
  border: 1px solid var(--border-color);
  border-radius: 14px;
  background: var(--secondary-color);
`;

const StepIndex = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 999px;
  background: var(--primary-color);
  color: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 1px;
`;

const StepContent = styled.div`
  min-width: 0;
`;

const StepTitle = styled.div`
  color: var(--text-color);
  font-size: 13px;
  font-weight: 700;
`;

const StepDescription = styled.div`
  margin-top: 4px;
  color: var(--text-muted-color);
  font-size: 12px;
  line-height: 1.5;
`;

const Hint = styled.div`
  color: var(--text-muted-color);
  font-size: 12px;
  line-height: 1.5;
  padding: 0 2px;
`;

function isStandaloneMode() {
  if (typeof window === "undefined") return false;
  const mediaStandalone = window.matchMedia?.("(display-mode: standalone)")?.matches;
  const iosStandalone = window.navigator.standalone === true;
  return Boolean(mediaStandalone || iosStandalone);
}

function isIosLike() {
  if (typeof window === "undefined") return false;
  const ua = window.navigator.userAgent || "";
  return /iPad|iPhone|iPod/.test(ua) || (ua.includes("Mac") && "ontouchend" in document);
}

export default function InstallAppPrompt({ currentUser }) {
  const { t } = useTranslation();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isInstalled, setIsInstalled] = useState(() => isStandaloneMode());

  const ios = useMemo(() => isIosLike(), []);

  useEffect(() => {
    if (isInstalled) return;

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };

    const handleInstalled = () => {
      setIsInstalled(true);
      setIsOpen(false);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, [isInstalled]);

  useEffect(() => {
    if (typeof window === "undefined" || isInstalled) {
      return undefined;
    }

    const handleManualOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener(OPEN_INSTALL_APP_PROMPT_EVENT, handleManualOpen);
    return () => {
      window.removeEventListener(OPEN_INSTALL_APP_PROMPT_EVENT, handleManualOpen);
    };
  }, [isInstalled]);

  useEffect(() => {
    if (!currentUser?._id) return;
    if (isInstalled) return;
    if (localStorage.getItem(DISMISSED_KEY) === "done") return;

    const timer = window.setTimeout(() => {
      if (ios || deferredPrompt) {
        setIsOpen(true);
      }
    }, 1800);

    return () => window.clearTimeout(timer);
  }, [currentUser?._id, isInstalled, ios, deferredPrompt]);

  const closePrompt = () => {
    localStorage.setItem(DISMISSED_KEY, "done");
    setIsOpen(false);
  };

  const handleInstall = async () => {
    if (ios || !deferredPrompt) {
      closePrompt();
      return;
    }

    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    if (result?.outcome === "accepted") {
      setIsOpen(false);
    } else {
      closePrompt();
    }
    setDeferredPrompt(null);
  };

  if (!isOpen || isInstalled || !currentUser?._id) return null;

  return (
    <ModalOverlay $zIndex={1400}>
      <ModalPanel $width="min(100%, 520px)" $radius="20px">
        <ModalHeader>
          <ModalTitleBlock>
            <ModalTitle>{t("installPrompt.title")}</ModalTitle>
            <ModalSubtitle>{t("installPrompt.subtitle")}</ModalSubtitle>
          </ModalTitleBlock>
          <ModalCloseButton type="button" onClick={closePrompt} aria-label={t("common.cancel")}>
            ×
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <Card>
            <Hero>
              <HeroIcon>
                <Smartphone size={20} />
              </HeroIcon>
              <HeroText>
                <HeroTitle>{t("installPrompt.heroTitle")}</HeroTitle>
                <HeroDescription>{t("installPrompt.heroDescription")}</HeroDescription>
              </HeroText>
            </Hero>

            {ios ? (
              <>
                <Steps>
                  <Step>
                    <StepIndex>1</StepIndex>
                    <StepContent>
                      <StepTitle>{t("installPrompt.ios.step1Title")}</StepTitle>
                      <StepDescription>
                        {t("installPrompt.ios.step1Description")}
                      </StepDescription>
                    </StepContent>
                  </Step>
                  <Step>
                    <StepIndex>2</StepIndex>
                    <StepContent>
                      <StepTitle>{t("installPrompt.ios.step2Title")}</StepTitle>
                      <StepDescription>
                        {t("installPrompt.ios.step2Description")}
                      </StepDescription>
                    </StepContent>
                  </Step>
                  <Step>
                    <StepIndex>3</StepIndex>
                    <StepContent>
                      <StepTitle>{t("installPrompt.ios.step3Title")}</StepTitle>
                      <StepDescription>
                        {t("installPrompt.ios.step3Description")}
                      </StepDescription>
                    </StepContent>
                  </Step>
                </Steps>
                <Hint>{t("installPrompt.ios.hint")}</Hint>
              </>
            ) : (
              <>
                <Steps>
                  <Step>
                    <StepIndex>1</StepIndex>
                    <StepContent>
                      <StepTitle>{t("installPrompt.android.step1Title")}</StepTitle>
                      <StepDescription>
                        {t("installPrompt.android.step1Description")}
                      </StepDescription>
                    </StepContent>
                  </Step>
                  <Step>
                    <StepIndex>2</StepIndex>
                    <StepContent>
                      <StepTitle>{t("installPrompt.android.step2Title")}</StepTitle>
                      <StepDescription>
                        {t("installPrompt.android.step2Description")}
                      </StepDescription>
                    </StepContent>
                  </Step>
                </Steps>
                <Hint>{t("installPrompt.android.hint")}</Hint>
              </>
            )}
          </Card>
        </ModalBody>
        <ModalFooter>
          <DialogActionButton type="button" $variant="ghost" onClick={closePrompt}>
            {t("installPrompt.later")}
          </DialogActionButton>
          <DialogActionButton type="button" onClick={handleInstall}>
            {ios ? (
              <>
                <Share2 size={15} />
                {t("installPrompt.showSteps")}
              </>
            ) : (
              <>
                <Download size={15} />
                {t("installPrompt.install")}
              </>
            )}
          </DialogActionButton>
        </ModalFooter>
      </ModalPanel>
    </ModalOverlay>
  );
}
