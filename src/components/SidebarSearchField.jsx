import React from "react";
import styled from "styled-components";
import { Search } from "lucide-react";

const Wrap = styled.div`
  position: relative;
  width: 100%;
  min-width: 0;
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted-color);
  pointer-events: none;
`;

const Input = styled.input`
  width: 100%;
  min-width: 0;
  height: 40px;
  padding: 0 14px 0 40px;
  box-sizing: border-box;
  border: none;
  border-radius: 12px;
  background: var(--input-color);
  color: var(--text-color);
  outline: none;

  &::placeholder {
    color: var(--placeholder-color);
  }
`;

const SidebarSearchField = ({ className, containerStyle, ...props }) => (
  <Wrap className={className} style={containerStyle}>
    <SearchIcon size={16} />
    <Input {...props} />
  </Wrap>
);

export default SidebarSearchField;
