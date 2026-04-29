import React from "react";
import styled from "styled-components";
import {
  CheckCircle2,
  Clock3,
  Copy,
  Eye,
  EyeOff,
  Link2,
  Save,
  Timer,
  Trash2,
  X,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  DialogActionButton,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  ModalPanel,
  ModalSubtitle,
  ModalTitle,
  ModalTitleBlock,
} from "../../../shared/ui/dialogs/ModalShell";

const Overlay = styled(ModalOverlay).attrs({
  $zIndex: 10000,
  $overlay: "rgba(15, 23, 42, 0.58)",
  $backdrop: "blur(8px)",
  $padding: "18px",
})`
`;

const Card = styled(ModalPanel).attrs({
  $width: "min(100%, 760px)",
  $maxWidth: "96vw",
  $maxHeight: "min(90vh, 920px)",
  $radius: "20px",
})`
`;

const Header = styled(ModalHeader)`
  align-items: flex-start;
  padding: 18px 20px;
`;

const TitleWrap = styled(ModalTitleBlock)`
  display: grid;
  gap: 8px;
`;

const HeaderKicker = styled.div`
  width: fit-content;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 6px 9px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--primary-color) 12%, transparent);
  color: var(--primary-color);
  font-size: 11px;
  font-weight: 800;
`;

const Title = styled(ModalTitle)`
  font-size: 19px;
  line-height: 1.25;
`;

const Text = styled(ModalSubtitle)`
  margin: 0;
  color: var(--text-muted-color);
  font-size: 13px;
  line-height: 1.45;
`;

const CloseButton = styled(ModalCloseButton)`
`;

const Body = styled(ModalBody)`
  padding: 18px 20px 20px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(260px, 0.78fr);
  gap: 18px;

  @media (max-width: 760px) {
    grid-template-columns: minmax(0, 1fr);
    padding: 16px;
  }
`;

const FormColumn = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const LinksColumn = styled(FormColumn)`
`;

const Panel = styled.section`
  border: 1px solid var(--border-color);
  border-radius: 16px;
  background: var(--background-color);
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 12px 14px;
  border: 1px solid var(--border-color);
  border-radius: 16px;
  background: var(--background-color);
  color: var(--text-secondary-color);
  font-size: 13px;
  font-weight: 700;
`;

const MetaPill = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--primary-color) 13%, transparent);
  color: var(--primary-color);
  font-size: 12px;
  font-weight: 900;
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: var(--text-secondary-color);
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const Segmented = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;

  @media (max-width: 480px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const SegmentButton = styled.button`
  min-height: 72px;
  padding: 12px;
  border-radius: 14px;
  border: 1px solid
    ${(props) =>
      props.$active ? "var(--primary-color)" : "var(--border-color)"};
  background: ${(props) =>
    props.$active
      ? "color-mix(in srgb, var(--primary-color) 12%, var(--background-color))"
      : "var(--input-color)"};
  color: var(--text-color);
  display: grid;
  grid-template-columns: 22px minmax(0, 1fr);
  align-items: flex-start;
  gap: 10px;
  text-align: left;
  cursor: pointer;
  transition:
    border-color 0.15s ease,
    background 0.15s ease,
    transform 0.15s ease;

  &:hover {
    transform: translateY(-1px);
    border-color: var(--primary-color);
  }
`;

const SegmentIcon = styled.span`
  width: 22px;
  height: 22px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.$active ? "var(--primary-color)" : "var(--text-muted-color)")};
  background: ${(props) =>
    props.$active
      ? "color-mix(in srgb, var(--primary-color) 12%, transparent)"
      : "var(--secondary-color)"};
`;

const SegmentCopy = styled.span`
  min-width: 0;
  display: grid;
  gap: 3px;
`;

const SegmentTitle = styled.span`
  font-size: 13px;
  font-weight: 800;
`;

const SegmentHint = styled.span`
  font-size: 12px;
  line-height: 1.35;
  color: var(--text-muted-color);
`;

const Input = styled.input`
  width: 100%;
  min-height: 44px;
  box-sizing: border-box;
  padding: 0 12px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background: var(--input-color);
  color: var(--text-color);
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: var(--primary-color);
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    flex-direction: column-reverse;
  }
`;

const Button = styled(DialogActionButton)`
  min-height: 40px;
  padding: 0 14px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  ${(props) =>
    props.$primary
      ? ""
      : `
        background: var(--input-color);
        color: var(--text-color);
        border: 1px solid var(--border-color);

        &:hover {
          background: var(--hover-color);
        }
      `}

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ListItem = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 14px;
  background: var(--input-color);
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ItemTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const ItemTitle = styled.div`
  color: var(--text-color);
  font-size: 13px;
  font-weight: 800;
  line-height: 1.35;
`;

const ItemActions = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

const IconButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: ${(props) =>
    props.$danger ? "rgba(239, 68, 68, 0.08)" : "var(--background-color)"};
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
  font-size: 13px;
  line-height: 1.45;
  border: 1px dashed var(--border-color);
  border-radius: 14px;
  padding: 14px;
  background: var(--input-color);
`;

const LinkCode = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  padding: 8px 10px;
  border-radius: 10px;
  background: var(--background-color);
  color: var(--text-color);
  font-size: 12px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  word-break: break-all;
`;

const InlineMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const TinyPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 8px;
  border-radius: 999px;
  background: var(--background-color);
  color: var(--text-secondary-color);
  font-size: 11px;
  font-weight: 700;
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
  const { t } = useTranslation();
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <Card onClick={(event) => event.stopPropagation()}>
        <Header>
          <TitleWrap>
            <HeaderKicker>
              <Link2 size={13} />
              {t("arenaShared.shareLinks.create")}
            </HeaderKicker>
            <Title>{title}</Title>
            <Text>{t("arenaShared.shareLinks.subtitle", { itemTitle })}</Text>
          </TitleWrap>
          <CloseButton type="button" onClick={onClose}>
            <X size={18} />
          </CloseButton>
        </Header>

        <Body>
          <FormColumn>
            <MetaRow>
              <span>{t("arenaShared.shareLinks.limit")}</span>
              <MetaPill>
                {currentCount}/{limit}
              </MetaPill>
            </MetaRow>

            <Panel>
              <Group>
                <Label>
                  <Save size={14} />
                  {t("arenaShared.shareLinks.persistLabel")}
                </Label>
                <Segmented>
                  <SegmentButton
                    type="button"
                    $active={mode === "persist"}
                    onClick={() => onModeChange("persist")}
                  >
                    <SegmentIcon $active={mode === "persist"}>
                      <CheckCircle2 size={15} />
                    </SegmentIcon>
                    <SegmentCopy>
                      <SegmentTitle>{t("arenaShared.shareLinks.persist")}</SegmentTitle>
                      <SegmentHint>{t("arenaShared.shareLinks.persistHint")}</SegmentHint>
                    </SegmentCopy>
                  </SegmentButton>
                  <SegmentButton
                    type="button"
                    $active={mode === "ephemeral"}
                    onClick={() => onModeChange("ephemeral")}
                  >
                    <SegmentIcon $active={mode === "ephemeral"}>
                      <Clock3 size={15} />
                    </SegmentIcon>
                    <SegmentCopy>
                      <SegmentTitle>{t("arenaShared.shareLinks.ephemeral")}</SegmentTitle>
                      <SegmentHint>{t("arenaShared.shareLinks.ephemeralHint")}</SegmentHint>
                    </SegmentCopy>
                  </SegmentButton>
                </Segmented>
              </Group>

              {mode === "persist" ? (
                <Group>
                  <Label>{t("arenaShared.shareLinks.groupName")}</Label>
                  <Input
                    placeholder={t("arenaShared.shareLinks.groupPlaceholder")}
                    value={groupName}
                    onChange={(event) => onGroupNameChange(event.target.value)}
                  />
                </Group>
              ) : null}
            </Panel>

            <Panel>
              <Group>
                <Label>
                  <Eye size={14} />
                  {t("arenaShared.shareLinks.showResults")}
                </Label>
                <Segmented>
                  <SegmentButton
                    type="button"
                    $active={showResults}
                    onClick={() => onShowResultsChange(true)}
                  >
                    <SegmentIcon $active={showResults}>
                      <Eye size={15} />
                    </SegmentIcon>
                    <SegmentCopy>
                      <SegmentTitle>{t("arenaShared.shareLinks.showResultsOn")}</SegmentTitle>
                      <SegmentHint>{t("arenaShared.shareLinks.showResultsOnHint")}</SegmentHint>
                    </SegmentCopy>
                  </SegmentButton>
                  <SegmentButton
                    type="button"
                    $active={!showResults}
                    onClick={() => onShowResultsChange(false)}
                  >
                    <SegmentIcon $active={!showResults}>
                      <EyeOff size={15} />
                    </SegmentIcon>
                    <SegmentCopy>
                      <SegmentTitle>{t("arenaShared.shareLinks.showResultsOff")}</SegmentTitle>
                      <SegmentHint>{t("arenaShared.shareLinks.showResultsOffHint")}</SegmentHint>
                    </SegmentCopy>
                  </SegmentButton>
                </Segmented>
              </Group>

              <Group>
                <Label>
                  <Timer size={14} />
                  {t("arenaShared.shareLinks.timeLimit")}
                </Label>
                <Input
                  type="number"
                  min="0"
                  placeholder={t("arenaShared.shareLinks.timeLimitPlaceholder")}
                  value={timeLimit}
                  onChange={(event) => onTimeLimitChange(event.target.value)}
                />
              </Group>
            </Panel>

            <Actions>
              <Button type="button" onClick={onClose}>
                {t("common.cancel")}
              </Button>
              <Button
                $primary
                type="button"
                onClick={onCreate}
                disabled={isCreating || currentCount >= limit}
              >
                <Link2 size={15} />
                {isCreating
                  ? t("arenaShared.shareLinks.creating")
                  : currentCount >= limit
                    ? t("arenaShared.shareLinks.limitReached")
                    : t("arenaShared.shareLinks.create")}
              </Button>
            </Actions>
          </FormColumn>

          <LinksColumn>
            <Group>
              <Label>
                <Link2 size={14} />
                {t("arenaShared.shareLinks.previousLinks")}
              </Label>
              {loadingLinks ? (
                <EmptyText>{t("common.loading")}</EmptyText>
              ) : links.length === 0 ? (
                <EmptyText>{t("arenaShared.shareLinks.empty")}</EmptyText>
              ) : (
                <List>
                  {links.map((item) => (
                    <ListItem key={item._id}>
                      <ItemTop>
                        <ItemTitle>
                          {item.persistResults
                            ? item.groupName || t("arenaShared.shareLinks.persistedDefault")
                            : t("arenaShared.shareLinks.ephemeralDefault")}
                        </ItemTitle>
                        <ItemActions>
                          <IconButton
                            type="button"
                            onClick={() => onCopyLink(item.shortCode)}
                          >
                            <Copy size={14} />
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
                      <LinkCode>
                        <Link2 size={13} />
                        <span>
                          {linkPrefix}
                          {item.shortCode}
                        </span>
                      </LinkCode>
                      <InlineMeta>
                        <TinyPill>
                          {item.showResults ? <Eye size={12} /> : <EyeOff size={12} />}
                          {item.showResults
                            ? t("arenaShared.shareLinks.resultShown")
                            : t("arenaShared.shareLinks.resultHidden")}
                        </TinyPill>
                        <TinyPill>
                          <Timer size={12} />
                          {item.timeLimit
                            ? t("arenaShared.shareLinks.minutes", {
                                count: item.timeLimit,
                              })
                            : t("arenaShared.shareLinks.unlimited")}
                        </TinyPill>
                      </InlineMeta>
                    </ListItem>
                  ))}
                </List>
              )}
            </Group>
          </LinksColumn>
        </Body>
      </Card>
    </Overlay>
  );
};

export default ShareLinksDialog;
