import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { X, User, Trophy } from "lucide-react";
import { useArena } from "../../contexts/ArenaContext";
import dayjs from "dayjs";
import { Skeleton, SkeletonCircle } from "../Skeleton";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const Dialog = styled.div`
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  color: var(--text-color);
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  color: var(--text-muted-color);
  cursor: pointer;
  &:hover {
    color: var(--text-color);
  }
`;

const Content = styled.div`
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ResultCard = styled.div`
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Nickname = styled.span`
  font-weight: 600;
  color: var(--text-color);
`;

const Score = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--primary-color);
  font-weight: bold;
  font-size: 1.1rem;
`;

const EmptyState = styled.div`
  text-align: center;
  color: var(--text-muted-color);
  padding: 40px;
`;

const SearchInput = styled.input`
  background-color: var(--secondary-color);
  border: 1px solid var(--border-color);
  color: var(--text-color);
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 0.9rem;
  margin-bottom: 8px;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const RankBadge = styled.div`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 0.8rem;
  font-weight: bold;
  background-color: ${(props) => {
    if (props.rank === 1) return "#f1c40f";
    if (props.rank === 2) return "#bdc3c7";
    if (props.rank === 3) return "#cd7f32";
    return "var(--border-color)";
  }};
  color: ${(props) => (props.rank <= 3 ? "#000" : "var(--text-muted-color)")};
`;

const TestResultsDialog = ({ test, onClose }) => {
  const { fetchTestResults } = useArena();
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = React.useRef();

  const loadResults = async (reset = false, searchVal = "") => {
    if (!test?._id) return;
    const currentPage = reset ? 1 : page;
    if (reset) {
      setLoading(true);
      setResults([]);
    } else {
      setLoadingMore(true);
    }

    const res = await fetchTestResults(test._id, {
      page: currentPage,
      limit: 30,
      search: searchVal,
    });

    if (!res) {
      setLoading(false);
      setLoadingMore(false);
      return;
    }

    // Handle both old (array) and new (paginated object) response formats
    const rawData = Array.isArray(res) ? res : res.data || [];
    const flattened = rawData.flatMap((h) =>
      (h.participants || []).map((p) => ({
        ...p,
        date: h.createdAt,
        mode: h.mode,
      })),
    );

    if (reset) {
      setResults(flattened);
    } else {
      setResults((prev) => [...prev, ...flattened]);
    }

    if (Array.isArray(res)) {
      setHasMore(false);
    } else {
      setHasMore(res.page < res.totalPages);
      setPage(currentPage + 1);
    }

    setLoading(false);
    setLoadingMore(false);
  };

  const prevSearchTerm = React.useRef("");

  useEffect(() => {
    // Initial load
    loadResults(true, searchTerm);
    prevSearchTerm.current = searchTerm;
  }, [test?._id]);

  useEffect(() => {
    // Skip if search term hasn't changed (prevents mount double-trigger)
    if (searchTerm === prevSearchTerm.current) return;

    const delayDebounce = setTimeout(() => {
      loadResults(true, searchTerm);
      prevSearchTerm.current = searchTerm;
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const lastElementRef = useCallback(
    (node) => {
      if (loading || loadingMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadResults(false, searchTerm);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, loadingMore, hasMore, page, searchTerm],
  );

  if (!test) return null;

  return (
    <Overlay onClick={onClose}>
      <Dialog onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>"{test.title}" natijalari</Title>
          <CloseBtn onClick={onClose}>
            <X size={20} />
          </CloseBtn>
        </Header>
        <Content>
          <SearchInput
            placeholder="Foydalanuvchi qidirish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {loading && results.length === 0 ? (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {[...Array(5)].map((_, i) => (
                <ResultCard key={i}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      flex: 1,
                    }}
                  >
                    <SkeletonCircle size="24px" />
                    <SkeletonCircle size="28px" />
                    <Skeleton height="16px" width="120px" mb="0" />
                  </div>
                  <Skeleton height="20px" width="40px" mb="0" />
                </ResultCard>
              ))}
            </div>
          ) : results.length > 0 ? (
            <>
              {results.map((res, idx) => (
                <ResultCard
                  key={idx}
                  ref={idx === results.length - 1 ? lastElementRef : null}
                >
                  <UserInfo>
                    <RankBadge rank={idx + 1}>{idx + 1}</RankBadge>
                    <User size={18} color="var(--text-muted-color)" />
                    <Nickname>{res.nickname}</Nickname>
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--text-muted-color)",
                        marginLeft: "4px",
                      }}
                    >
                      {dayjs(res.date).format("DD.MM.YYYY HH:mm")}
                    </span>
                  </UserInfo>
                  <Score>
                    <Trophy size={16} />
                    {res.score}
                  </Score>
                </ResultCard>
              ))}
              {loadingMore && (
                <div style={{ textAlign: "center", padding: "10px" }}>
                  <Skeleton height="20px" width="100%" mb="0" />
                </div>
              )}
            </>
          ) : (
            <EmptyState>
              {searchTerm ? "Natija topilmadi." : "Hozircha natijalar yo'q."}
            </EmptyState>
          )}
        </Content>
      </Dialog>
    </Overlay>
  );
};

export default TestResultsDialog;
