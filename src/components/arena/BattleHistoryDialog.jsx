import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import {
  X,
  Trophy,
  Users,
  User,
  Calendar,
  History,
  Loader2,
} from "lucide-react";
import dayjs from "dayjs";
import { useArena } from "../../contexts/ArenaContext";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10001;
  backdrop-filter: blur(4px);
`;

const Content = styled.div`
  background: var(--secondary-color);
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  border: 1px solid var(--border-color);
  animation: slideBottom 0.3s ease-out;

  @keyframes slideBottom {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Header = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    margin: 0;
    font-size: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--text-color);
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--text-muted-color);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    color: var(--text-color);
    background: var(--hover-color);
  }
`;

const ListBody = styled.div`
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 10px;
  }
`;

const HistoryItem = styled.div`
  background: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: transform 0.2s;

  &:hover {
    border-color: var(--primary-color);
  }
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const TestTitle = styled.div`
  font-weight: 700;
  font-size: 16px;
  color: var(--text-color);
`;

const DateText = styled.div`
  font-size: 12px;
  color: var(--text-muted-color);
  display: flex;
  align-items: center;
  gap: 4px;
`;

const StatsRow = styled.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: var(--text-muted-color);
`;

const Stat = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ParticipantList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
`;

const ParticipantBadge = styled.div`
  background: var(--background-color);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  border: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  gap: 6px;

  span {
    color: var(--primary-color);
    font-weight: 600;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  color: var(--primary-color);
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: var(--text-muted-color);
  gap: 12px;
  text-align: center;
`;

const BattleHistoryDialog = ({ isOpen, onClose }) => {
  const { fetchBattleHistory } = useArena();
  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const observer = useRef();

  const loadMore = useCallback(
    async (isInitial = false) => {
      if (isLoading || (!hasMore && !isInitial)) return;

      setIsLoading(true);
      const currentPage = isInitial ? 1 : page;

      try {
        const result = await fetchBattleHistory({
          page: currentPage,
          limit: 15,
        });
        if (result && result.data) {
          if (isInitial) {
            setHistory(result.data);
          } else {
            setHistory((prev) => [...prev, ...result.data]);
          }
          setHasMore(result.page < result.totalPages);
          setPage(currentPage + 1);
        }
      } catch (err) {
        console.error("Failed to load history:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [page, hasMore, isLoading, fetchBattleHistory],
  );

  useEffect(() => {
    if (isOpen) {
      loadMore(true);
    } else {
      setHistory([]);
      setPage(1);
      setHasMore(true);
    }
  }, [isOpen]);

  const lastElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, loadMore],
  );

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <Content onClick={(e) => e.stopPropagation()}>
        <Header>
          <h2>
            <History size={22} /> Bellashuvlar Tarixi
          </h2>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </Header>
        <ListBody>
          {history.length > 0 ? (
            history.map((item, index) => (
              <HistoryItem
                key={item._id}
                ref={index === history.length - 1 ? lastElementRef : null}
              >
                <ItemHeader>
                  <TestTitle>
                    {item.testId?.title || "O'chirilgan test"}
                  </TestTitle>
                  <DateText>
                    <Calendar size={12} />
                    {dayjs(item.createdAt).format("DD.MM.YYYY HH:mm")}
                  </DateText>
                </ItemHeader>

                <StatsRow>
                  <Stat>
                    <Trophy size={14} />{" "}
                    {item.mode === "solo" ? "Yakkalik" : "Jamoaviy"}
                  </Stat>
                  <Stat>
                    <Users size={14} /> {item.participants.length} ishtirokchi
                  </Stat>
                </StatsRow>

                <ParticipantList>
                  {item.participants.map((p, pIdx) => (
                    <ParticipantBadge key={pIdx}>
                      <User size={12} /> {p.nickname} <span>{p.score}</span>
                    </ParticipantBadge>
                  ))}
                </ParticipantList>
              </HistoryItem>
            ))
          ) : !isLoading ? (
            <EmptyState>
              <History size={48} opacity={0.3} />
              <p>Hozircha bellashuvlar tarixi mavjud emas.</p>
            </EmptyState>
          ) : null}

          {isLoading && (
            <LoadingContainer>
              <Loader2 size={24} className="animate-spin" />
            </LoadingContainer>
          )}
        </ListBody>
      </Content>
    </Overlay>
  );
};

export default BattleHistoryDialog;
