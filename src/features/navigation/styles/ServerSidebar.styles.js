import styled from "styled-components";

export const SidebarContainer = styled.div`
  position: relative;
  z-index: 40;
  width: 78px;
  height: var(--app-height, 100dvh);
  background: var(--tertiary-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 14px 10px;
  flex-shrink: 0;
  overflow: visible;
  border-right: 1px solid color-mix(in srgb, var(--border-color) 76%, transparent);
`;

export const NavButton = styled.button`
  position: relative;
  z-index: 1;
  width: 52px;
  min-height: 52px;
  border-radius: 16px;
  border: none;
  cursor: pointer;
  transition:
    transform 0.18s ease,
    background-color 0.18s ease,
    color 0.18s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  flex-shrink: 0;
  padding: 0;
  gap: 0;
  background: transparent;
  color: ${(props) =>
    props.$active ? "var(--primary-color)" : "var(--text-secondary-color)"};

  &:hover {
    background: transparent;
    color: ${(props) =>
      props.$active ? "var(--primary-color)" : "var(--text-color)"};
    transform: translateY(-1px);
  }

  &::marker {
    display: none;
  }

  &::before {
    content: "";
    position: absolute;
    left: -14px;
    top: 50%;
    width: 6px;
    height: ${(props) => (props.$active ? "30px" : "16px")};
    border-radius: 999px;
    background: #ffffff;
    transform: translateY(-50%)
      scaleY(${(props) => (props.$active ? 1 : 0)});
    opacity: ${(props) => (props.$active ? 1 : 0)};
    transition:
      opacity 0.18s ease,
      height 0.18s ease,
      transform 0.18s ease;
  }

  &:hover::before,
  &:focus-visible::before {
    opacity: 1;
    height: ${(props) => (props.$active ? "30px" : "16px")};
    transform: translateY(-50%) scaleY(1);
  }

  &::after {
    content: attr(data-tooltip);
    position: absolute;
    left: calc(100% + 12px);
    top: 50%;
    transform: translateY(-50%) translateX(-4px);
    height: 36px;
    padding: 0 12px;
    border-radius: 12px;
    background: color-mix(in srgb, var(--secondary-color) 94%, black 6%);
    border: 1px solid color-mix(in srgb, var(--border-color) 72%, transparent);
    color: var(--text-color);
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
    font-size: 13px;
    font-weight: 700;
    opacity: 0;
    pointer-events: none;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.18);
    transition:
      opacity 0.16s ease,
      transform 0.16s ease;
    z-index: 20;
  }

  & > span:first-child::after {
    content: "";
    position: absolute;
    left: calc(100% + 6px);
    top: 50%;
    width: 10px;
    height: 10px;
    border-left: 1px solid color-mix(in srgb, var(--border-color) 72%, transparent);
    border-top: 1px solid color-mix(in srgb, var(--border-color) 72%, transparent);
    background: color-mix(in srgb, var(--secondary-color) 94%, black 6%);
    transform: translateY(-50%) rotate(-45deg);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.16s ease;
    z-index: 19;
  }

  &:hover::after,
  &:focus-visible::after,
  &:hover > span:first-child::after,
  &:focus-visible > span:first-child::after {
    opacity: 1;
  }

  &:hover::after,
  &:focus-visible::after {
    transform: translateY(-50%) translateX(0);
  }
`;

export const IconSlot = styled.div`
  min-width: 48px;
  width: 48px;
  height: 48px;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  background: ${(props) =>
    props.$active ? "var(--primary-color)" : "var(--secondary-color)"};
  color: ${(props) => (props.$active ? "#ffffff" : "var(--text-color)")};
  box-shadow: ${(props) =>
    props.$active ? "0 12px 24px rgba(80, 96, 255, 0.28)" : "none"};
  transition:
    border-radius 0.18s ease,
    background-color 0.18s ease,
    color 0.18s ease,
    box-shadow 0.18s ease;

  ${NavButton}:hover &,
  ${NavButton}:focus-visible & {
    border-radius: 18px;
  }
`;

export const NavLabel = styled.span`
  display: none;
`;

export const NavBadge = styled.span`
  position: absolute;
  top: -2px;
  right: -2px;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 999px;
  background: var(--primary-color);
  color: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  box-shadow: 0 0 0 2px var(--tertiary-color);
`;

export const Spacer = styled.div`
  flex: 1;
`;

export const AvatarButton = styled.button`
  position: relative;
  z-index: 1;
  width: 52px;
  min-height: 52px;
  border-radius: 16px;
  border: 1px solid
    ${(props) =>
      props.$active
        ? "var(--primary-color)"
        : props.$premium
          ? "var(--warning-color)"
          : "var(--border-color)"};
  background: ${(props) =>
    props.$active
      ? "color-mix(in srgb, var(--primary-color) 12%, var(--secondary-color))"
      : "transparent"};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  padding: 0;
  overflow: hidden;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    background-color 0.2s ease;
  gap: 0;

  &:hover {
    transform: translateY(-1px);
    border-color: var(--primary-color);
    background: transparent;
  }

  &:hover ${IconSlot},
  &:focus-visible ${IconSlot} {
    border-radius: 18px;
  }

  &::before {
    content: "";
    position: absolute;
    left: -14px;
    top: 50%;
    width: 6px;
    height: ${(props) => (props.$active ? "30px" : "16px")};
    border-radius: 999px;
    background: #ffffff;
    transform: translateY(-50%)
      scaleY(${(props) => (props.$active ? 1 : 0)});
    opacity: ${(props) => (props.$active ? 1 : 0)};
    transition:
      opacity 0.18s ease,
      height 0.18s ease,
      transform 0.18s ease;
  }

  &:hover::before,
  &:focus-visible::before {
    opacity: 1;
    height: ${(props) => (props.$active ? "30px" : "16px")};
    transform: translateY(-50%) scaleY(1);
  }

  &::after {
    content: attr(data-tooltip);
    position: absolute;
    left: calc(100% + 12px);
    top: 50%;
    transform: translateY(-50%) translateX(-4px);
    height: 36px;
    padding: 0 12px;
    border-radius: 12px;
    background: color-mix(in srgb, var(--secondary-color) 94%, black 6%);
    border: 1px solid color-mix(in srgb, var(--border-color) 72%, transparent);
    color: var(--text-color);
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
    font-size: 13px;
    font-weight: 700;
    opacity: 0;
    pointer-events: none;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.18);
    transition:
      opacity 0.16s ease,
      transform 0.16s ease;
    z-index: 20;
  }

  & > span:first-child::after {
    content: "";
    position: absolute;
    left: calc(100% + 6px);
    top: 50%;
    width: 10px;
    height: 10px;
    border-left: 1px solid color-mix(in srgb, var(--border-color) 72%, transparent);
    border-top: 1px solid color-mix(in srgb, var(--border-color) 72%, transparent);
    background: color-mix(in srgb, var(--secondary-color) 94%, black 6%);
    transform: translateY(-50%) rotate(-45deg);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.16s ease;
    z-index: 19;
  }

  &:hover::after,
  &:focus-visible::after,
  &:hover > span:first-child::after,
  &:focus-visible > span:first-child::after {
    opacity: 1;
  }

  &:hover::after,
  &:focus-visible::after {
    transform: translateY(-50%) translateX(0);
  }
`;

export const SidebarHeader = styled.div`
  display: none;
`;

export const SidebarTitle = styled.div`
  display: none;
`;

export const ProfileAvatarWrap = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 14px;
  position: relative;
  overflow: visible;
  display: inline-flex;
  align-items: center;
  justify-content: center;

`;

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
`;

export const AvatarFallback = styled.span`
  width: 100%;
  height: 100%;
  border-radius: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 800;
  color: white;
  line-height: 1;
  background: color-mix(in srgb, var(--primary-color) 82%, white 18%);
`;

export const ProfileStatusDot = styled.span`
  display: block;
  position: absolute;
  right: -2px;
  bottom: -1px;
  width: 9px;
  height: 9px;
  border-radius: 999px;
  background: #46c46b;
  border: 1.5px solid var(--background-color);
`;
