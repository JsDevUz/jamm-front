import styled from "styled-components";

export const SidebarIconButton = styled.button`
  margin-left: auto;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 15px;
  border: none;
  background: var(--input-color);
  color: var(--text-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--primary-color);
    color: white;
  }
`;

