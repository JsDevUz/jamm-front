import React from "react";
import styled from "styled-components";
import { Link2, Trash2, X } from "lucide-react";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: rgba(15, 23, 42, 0.44);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 16px;
  overflow-y: auto;
`;

const Card = styled.div`
  width: min(100%, 420px);
  margin: auto 0;
  border: 1px solid var(--border-color);
  border-radius: 14px;
  background: var(--tertiary-color);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.div`
  padding: 12px 14px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
`;

const TitleWrap = styled.div`
  min-width: 0;
`;

const Title = styled.h3`
  margin: 0;
  color: var(--text-color);
  font-size: 16px;
  line-height: 1.25;
`;

const Text = styled.p`
  margin: 4px 0 0;
  color: var(--text-muted-color);
  font-size: 12px;
  line-height: 1.45;
`;

const CloseButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 9px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-muted-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
`;

const Body = styled.div`
  padding: 12px 14px 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: calc(100vh - 64px);
  overflow-y: auto;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  color: var(--text-muted-color);
  font-size: 12px;
`;

const MetaPill = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: 0 8px;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-color);
  font-size: 11px;
  font-weight: 700;
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.div`
  color: var(--text-muted-color);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
`;

const Segmented = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 6px;
`;

const SegmentButton = styled.button`
  min-height: 40px;
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid
    ${(props) =>
      props.$active ? "var(--primary-color)" : "var(--border-color)"};
  background: ${(props) =>
    props.$active ? "rgba(59, 130, 246, 0.12)" : "var(--secondary-color)"};
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  text-align: left;
  cursor: pointer;
`;

const SegmentTitle = styled.span`
  font-size: 12px;
  font-weight: 700;
`;

const SegmentHint = styled.span`
  font-size: 11px;
  line-height: 1.35;
  color: var(--text-muted-color);
`;

const Input = styled.input`
  width: 100%;
  min-height: 38px;
  box-sizing: border-box;
  padding: 0 10px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-color);
  font-size: 13px;
  outline: none;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  flex-wrap: wrap;
`;

const Button = styled.button`
  min-height: 34px;
  padding: 0 12px;
  border-radius: 10px;
  border: 1px solid
    ${(props) => (props.$primary ? "var(--primary-color)" : "var(--border-color)")};
  background: ${(props) =>
    props.$primary ? "var(--primary-color)" : "var(--secondary-color)"};
  color: ${(props) => (props.$primary ? "#fff" : "var(--text-color)")};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    opacity: 0.65;
    cursor: default;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ListItem = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background: var(--secondary-color);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ItemTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const ItemTitle = styled.div`
  color: var(--text-color);
  font-size: 12px;
  font-weight: 700;
  line-height: 1.35;
`;

const ItemMeta = styled.div`
  color: var(--text-muted-color);
  font-size: 11px;
  line-height: 1.4;
  word-break: break-all;
`;

const ItemActions = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

const IconButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background: ${(props) =>
    props.$danger ? "rgba(239, 68, 68, 0.08)" : "var(--tertiary-color)"};
  color: ${(props) => (props.$danger ? "#ef4444" : "var(--text-color)")};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:disabled {
    opacity: 0.65;
    cursor: default;
  }
`;

const EmptyText = styled.div`
  color: var(--text-muted-color);
  font-size: 12px;
  line-height: 1.45;
`;

const ShareLinksDialog = ({
  isOpen,
  onClose,
  title,
  itemTitle,
  limit,
  currentCount,
  mode,
  onModeChange,
  groupName,
  onGroupNameChange,
  showResults,
  onShowResultsChange,
  timeLimit,
  onTimeLimitChange,
  onCreate,
  isCreating,
  links,
  loadingLinks,
  onCopyLink,
  onDeleteLink,
  deletingLinkId,
  linkPrefix,
}) => {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <Card onClick={(event) => event.stopPropagation()}>
        <Header>
          <TitleWrap>
            <Title>{title}</Title>
            <Text>`{itemTitle}` uchun qisqa havolalar</Text>
          </TitleWrap>
          <CloseButton type="button" onClick={onClose}>
            <X size={15} />
          </CloseButton>
        </Header>

        <Body>
          <MetaRow>
            <span>Jami limit</span>
            <MetaPill>
              {currentCount}/{limit}
            </MetaPill>
          </MetaRow>

          <Group>
            <Label>Natijani saqlash</Label>
            <Segmented>
              <SegmentButton
                type="button"
                $active={mode === "persist"}
                onClick={() => onModeChange("persist")}
              >
                <SegmentTitle>Saqlansin</SegmentTitle>
                <SegmentHint>Ustozga boradi</SegmentHint>
              </SegmentButton>
              <SegmentButton
                type="button"
                $active={mode === "ephemeral"}
                onClick={() => onModeChange("ephemeral")}
              >
                <SegmentTitle>Saqlanmasin</SegmentTitle>
                <SegmentHint>Faqat talabaga</SegmentHint>
              </SegmentButton>
            </Segmented>
          </Group>

          {mode === "persist" ? (
            <Group>
              <Label>Guruh nomi</Label>
              <Input
                placeholder="Masalan: g12"
                value={groupName}
                onChange={(event) => onGroupNameChange(event.target.value)}
              />
            </Group>
          ) : null}

          <Group>
            <Label>Yakuniy natija</Label>
            <Segmented>
              <SegmentButton
                type="button"
                $active={showResults}
                onClick={() => onShowResultsChange(true)}
              >
                <SegmentTitle>Ko'rsatilsin</SegmentTitle>
                <SegmentHint>Talaba ko'radi</SegmentHint>
              </SegmentButton>
              <SegmentButton
                type="button"
                $active={!showResults}
                onClick={() => onShowResultsChange(false)}
              >
                <SegmentTitle>Yashirilsin</SegmentTitle>
                <SegmentHint>Faqat ustozga</SegmentHint>
              </SegmentButton>
            </Segmented>
          </Group>

          <Group>
            <Label>Vaqt cheklovi</Label>
            <Input
              type="number"
              min="0"
              placeholder="0 = cheklanmagan"
              value={timeLimit}
              onChange={(event) => onTimeLimitChange(event.target.value)}
            />
          </Group>

          <Actions>
            <Button type="button" onClick={onClose}>
              Bekor
            </Button>
            <Button
              $primary
              type="button"
              onClick={onCreate}
              disabled={isCreating || currentCount >= limit}
            >
              <Link2 size={14} />
              {isCreating
                ? "Yaratilmoqda..."
                : currentCount >= limit
                  ? "Limitga yetdi"
                  : "Havola yaratish"}
            </Button>
          </Actions>

          <Group>
            <Label>Oldingi havolalar</Label>
            {loadingLinks ? (
              <EmptyText>Yuklanmoqda...</EmptyText>
            ) : links.length === 0 ? (
              <EmptyText>Hali havola yaratilmagan.</EmptyText>
            ) : (
              <List>
                {links.map((item) => (
                  <ListItem key={item._id}>
                    <ItemTop>
                      <ItemTitle>
                        {item.persistResults
                          ? item.groupName || "Natija saqlanadi"
                          : "Natija saqlanmaydi"}
                      </ItemTitle>
                      <ItemActions>
                        <IconButton
                          type="button"
                          onClick={() => onCopyLink(item.shortCode)}
                        >
                          <Link2 size={14} />
                        </IconButton>
                        <IconButton
                          type="button"
                          $danger
                          disabled={deletingLinkId === item._id}
                          onClick={() => onDeleteLink(item._id)}
                        >
                          <Trash2 size={14} />
                        </IconButton>
                      </ItemActions>
                    </ItemTop>
                    <ItemMeta>
                      {linkPrefix}
                      {item.shortCode}
                    </ItemMeta>
                    <ItemMeta>
                      Natija: {item.showResults ? "ko'rsatiladi" : "yashiriladi"}{" "}
                      • Vaqt:{" "}
                      {item.timeLimit ? `${item.timeLimit} daqiqa` : "cheklanmagan"}
                    </ItemMeta>
                  </ListItem>
                ))}
              </List>
            )}
          </Group>
        </Body>
      </Card>
    </Overlay>
  );
};

export default ShareLinksDialog;
