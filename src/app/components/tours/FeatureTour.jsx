import React from "react";
import { useTranslation } from "react-i18next";
import { setTourFlag } from "../../utils/tourStorage";
import {
  TourCard,
  TourDescription,
  TourFooter,
  TourHighlight,
  TourMask,
  TourPrimaryButton,
  TourRoot,
  TourStep,
  TourTextButton,
  TourTitle,
} from "./FeatureTour.styles";

const PADDING = 10;
const CARD_MARGIN = 14;

const getRectFromSelector = (selector) => {
  if (!selector) return null;
  const element = document.querySelector(selector);
  if (!element) return null;
  const rect = element.getBoundingClientRect();
  if (!rect.width || !rect.height) return null;
  return rect;
};

const getCardPosition = (rect) => {
  const width = Math.min(320, window.innerWidth - 32);
  const fitsBottom = rect.bottom + CARD_MARGIN + 176 <= window.innerHeight;
  const top = fitsBottom
    ? Math.min(window.innerHeight - 188, rect.bottom + CARD_MARGIN)
    : Math.max(16, rect.top - 188 - CARD_MARGIN);
  const left = Math.min(
    window.innerWidth - width - 16,
    Math.max(16, rect.left + rect.width / 2 - width / 2),
  );
  return { top, left, width };
};

const FeatureTour = ({ isOpen, steps, onClose, storageKey, onStepChange }) => {
  const { t } = useTranslation();
  const [stepIndex, setStepIndex] = React.useState(0);
  const [rect, setRect] = React.useState(null);

  const visibleSteps = React.useMemo(
    () => steps.filter((step) => getRectFromSelector(step.selector)),
    [steps, isOpen],
  );

  const activeStep = visibleSteps[stepIndex] || null;

  const completeTour = React.useCallback(() => {
    if (storageKey) {
      setTourFlag(storageKey, "done");
    }
    setStepIndex(0);
    onClose?.();
  }, [onClose, storageKey]);

  React.useEffect(() => {
    if (!isOpen) {
      setRect(null);
      setStepIndex(0);
      return;
    }

    if (!visibleSteps.length) {
      completeTour();
    }
  }, [completeTour, isOpen, visibleSteps.length]);

  React.useEffect(() => {
    if (!isOpen || !activeStep) return;
    onStepChange?.(stepIndex, activeStep);
  }, [activeStep, isOpen, onStepChange, stepIndex]);

  React.useEffect(() => {
    if (!isOpen || !activeStep) return undefined;

    let frameId = null;
    let timeoutId = null;

    const update = () => {
      const tryResolve = (attempt = 0) => {
        const nextRect = getRectFromSelector(activeStep.selector);
        if (nextRect) {
          setRect(nextRect);
          return;
        }
        if (attempt >= 8) {
          completeTour();
          return;
        }
        timeoutId = window.setTimeout(() => tryResolve(attempt + 1), 80);
      };

      frameId = window.requestAnimationFrame(() => tryResolve());
    };

    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      if (timeoutId) window.clearTimeout(timeoutId);
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [activeStep, completeTour, isOpen]);

  React.useEffect(() => {
    if (!isOpen || !activeStep) return undefined;
    const element = document.querySelector(activeStep.selector);
    element?.scrollIntoView?.({ block: "nearest", inline: "nearest", behavior: "smooth" });
  }, [activeStep, isOpen]);

  if (!isOpen || !activeStep || !rect) return null;

  const paddedRect = {
    top: Math.max(8, rect.top - PADDING),
    left: Math.max(8, rect.left - PADDING),
    right: Math.min(window.innerWidth - 8, rect.right + PADDING),
    bottom: Math.min(window.innerHeight - 8, rect.bottom + PADDING),
  };

  const cardPosition = getCardPosition(paddedRect);
  const isLastStep = stepIndex === visibleSteps.length - 1;

  return (
    <TourRoot>
      <TourMask
        style={{ top: 0, left: 0, right: 0, height: paddedRect.top }}
      />
      <TourMask
        style={{
          top: paddedRect.top,
          left: 0,
          width: paddedRect.left,
          height: paddedRect.bottom - paddedRect.top,
        }}
      />
      <TourMask
        style={{
          top: paddedRect.top,
          left: paddedRect.right,
          right: 0,
          height: paddedRect.bottom - paddedRect.top,
        }}
      />
      <TourMask
        style={{ left: 0, right: 0, bottom: 0, top: paddedRect.bottom }}
      />
      <TourHighlight
        style={{
          top: paddedRect.top,
          left: paddedRect.left,
          width: paddedRect.right - paddedRect.left,
          height: paddedRect.bottom - paddedRect.top,
        }}
      />
      <TourCard style={cardPosition}>
        <TourStep>
          {t("featureTour.step", {
            current: stepIndex + 1,
            total: visibleSteps.length,
          })}
        </TourStep>
        <TourTitle>{activeStep.title}</TourTitle>
        <TourDescription>{activeStep.description}</TourDescription>
        <TourFooter>
          <TourTextButton type="button" onClick={completeTour}>
            {t("featureTour.skip")}
          </TourTextButton>
          <TourPrimaryButton
            type="button"
            onClick={async () => {
              if (activeStep.onNext) {
                await activeStep.onNext();
              }
              if (isLastStep) {
                completeTour();
                return;
              }
              setStepIndex((prev) => prev + 1);
            }}
          >
            {isLastStep ? t("featureTour.done") : t("featureTour.next")}
          </TourPrimaryButton>
        </TourFooter>
      </TourCard>
    </TourRoot>
  );
};

export default FeatureTour;
