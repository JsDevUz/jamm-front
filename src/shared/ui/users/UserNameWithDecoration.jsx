import React, { useMemo } from "react";
import styled, { css, keyframes } from "styled-components";
import OfficalBadge from "../badges/OfficalBadge";
import useProfileDecorationsStore from "../../../store/profileDecorationsStore";

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.12); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
`;

const wiggle = keyframes`
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-8deg); }
  75% { transform: rotate(8deg); }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const sparkle = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.9; }
  50% { transform: scale(1.18); opacity: 1; }
`;

const animationStyles = {
  pulse: css`
    animation: ${pulse} 1.6s ease-in-out infinite;
  `,
  float: css`
    animation: ${float} 1.8s ease-in-out infinite;
  `,
  wiggle: css`
    animation: ${wiggle} 1.7s ease-in-out infinite;
  `,
  spin: css`
    animation: ${spin} 3.8s linear infinite;
  `,
  sparkle: css`
    animation: ${sparkle} 1.45s ease-in-out infinite;
  `,
};

const NameWrap = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  max-width: 100%;
  flex-wrap: wrap;
`;

const NameText = styled.span`
  min-width: 0;
  display: inline-block;
`;

const DecorationBadge = styled.span`
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  min-width: ${(props) => props.$size}px;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  background: var(--input-color);
  color: var(--text-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => Math.max(12, props.$size - 6)}px;
  line-height: 1;
  transform-origin: center;
  ${(props) => animationStyles[props.$animation] || animationStyles.sparkle}
`;

const DecorationImage = styled.img`
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  min-width: ${(props) => props.$size}px;
  border-radius: 999px;
  /* border: 1px solid var(--border-color);
  background: var(--input-color); */
  object-fit: cover;
`;

const premiumIconSize = {
  sm: { width: 14, height: 14 },
  md: { width: 16, height: 16 },
  lg: { width: 18, height: 18 },
};

const decorationSizes = {
  sm: 18,
  md: 20,
  lg: 22,
};

const isOfficialBadgeSelected = (decorationId) =>
  decorationId === "official-badge";

const isPremiumBadgeSelected = (decorationId) =>
  decorationId === "premium-badge";

const isSpecialBadgeSelected = (decorationId) =>
  isOfficialBadgeSelected(decorationId) || isPremiumBadgeSelected(decorationId);

export default function UserNameWithDecoration({
  user,
  fallback = "User",
  size = "md",
  showPremiumBadge = true,
  className,
}) {
  const decorations = useProfileDecorationsStore((state) => state.decorations);

  const displayName =
    user?.name || user?.nickname || user?.username || fallback;

  const decoration = useMemo(() => {
    if (
      !user?.selectedProfileDecorationId ||
      user.selectedProfileDecorationId === "custom-upload" ||
      isSpecialBadgeSelected(user.selectedProfileDecorationId) ||
      !decorations.length
    ) {
      return null;
    }

    return (
      decorations.find(
        (item) =>
          item.key === user.selectedProfileDecorationId ||
          item._id === user.selectedProfileDecorationId,
      ) || null
    );
  }, [decorations, user?.selectedProfileDecorationId]);

  const premiumSize = premiumIconSize[size] || premiumIconSize.md;
  const decorationSize = decorationSizes[size] || decorationSizes.md;
  const showCustomImage =
    user?.selectedProfileDecorationId === "custom-upload" &&
    user?.customProfileDecorationImage;
  const showOfficialBadge =
    showPremiumBadge &&
    user?.premiumStatus === "active" &&
    isOfficialBadgeSelected(user?.selectedProfileDecorationId);
  const showPremiumBadgeVariant =
    showPremiumBadge &&
    user?.premiumStatus === "active" &&
    isPremiumBadgeSelected(user?.selectedProfileDecorationId);

  return (
    <NameWrap className={className}>
      <NameText>{displayName}</NameText>
      {showCustomImage ? (
        <DecorationImage
          src={user.customProfileDecorationImage}
          alt={displayName}
          $size={decorationSize}
        />
      ) : null}
      {decoration ? (
        <DecorationBadge
          $size={decorationSize}
          $animation={decoration.animation}
          title={decoration.label}
          aria-label={decoration.label}
        >
          {decoration.emoji}
        </DecorationBadge>
      ) : null}
      {showOfficialBadge ? (
        <OfficalBadge
          width={premiumSize.width}
          height={premiumSize.height}
          color="var(--primary-color)"
          style={{ filter: "none" }}
        />
      ) : null}
      {showPremiumBadgeVariant ? (
        <OfficalBadge
          width={premiumSize.width}
          height={premiumSize.height}
          variant="premium"
        />
      ) : null}
    </NameWrap>
  );
}
