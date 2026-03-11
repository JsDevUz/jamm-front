import styled from "styled-components";

export const SidebarIconButton = styled.button`
  margin-left: auto;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 15px;
  border: none;
  background: ${(props) => (props.absolute ? "none" : " var(--input-color)")};
  color: var(--text-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  position: ${(props) => (props.absolute ? "absolute" : "relative")};
  top: ${(props) => (props.absolute ? "5px" : "auto")};
  right: ${(props) => (props.absolute ? "5px" : "auto")};

  &:hover {
    background: var(--primary-color);
    color: white;
  }
`;

