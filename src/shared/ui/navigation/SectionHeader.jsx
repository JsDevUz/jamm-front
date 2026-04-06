import React from "react";
import styled from "styled-components";
import { Plus, Search } from "lucide-react";

const Header = styled.div`
  padding: 14px 16px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border-bottom: 1px solid var(--border-color);
  background: var(--secondary-color);
`;

const Title = styled.h2`
  margin: 0;
  flex: 1;
  min-width: 0;
  color: var(--text-color);
  font-size: 22px;
  font-weight: 800;
  letter-spacing: 0.01em;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const IconButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${(props) => (props.$primary ? "#fff" : "var(--text-color)")};
  background: ${(props) => (props.$primary ? "var(--primary-color)" : "var(--input-color)")};
  transition: transform 0.16s ease, filter 0.16s ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.06);
  }
`;

const AddButton = styled(IconButton)`
  width: 38px;
  height: 38px;
  border-radius: 13px;
`;

export default function SectionHeader({
  title,
  onSearch,
  onAdd,
  hideAdd = false,
  addIcon = null,
  searchTitle = "Search",
  addTitle = "Create",
  searchTargetProps = {},
  addTargetProps = {},
}) {
  return (
    <Header>
      <Title>{title}</Title>
      <Actions>
        <IconButton type="button" onClick={onSearch} title={searchTitle} {...searchTargetProps}>
          <Search size={20} />
        </IconButton>
        {!hideAdd ? (
          <AddButton type="button" $primary onClick={onAdd} title={addTitle} {...addTargetProps}>
            {addIcon || <Plus size={20} />}
          </AddButton>
        ) : null}
      </Actions>
    </Header>
  );
}
