import React, { useEffect } from "react";
import styled from "styled-components";
import { useArena } from "../../../contexts/ArenaContext";
import { Clock, Trophy, Users } from "lucide-react";
import dayjs from "dayjs";

const HistoryContainer = styled.div`
  margin-top: 40px;
  background: var(--surface-secondary-color, #2f3136);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

const HistoryTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.5rem;
  margin-bottom: 24px;
  color: var(--text-color);
  font-weight: 700;
  letter-spacing: -0.02em;
`;

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const HistoryCard = styled.div`
  background: var(--surface-color, #36393f);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  overflow: hidden;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    border-color: var(--primary-color);
    transform: translateY(-2px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid var(--border-color);
`;

const TestInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ModeBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  background: ${(props) => props.color || "var(--primary-color)"};
  color: white;
`;

const TestTitle = styled.span`
  font-weight: 600;
  color: var(--text-color);
  font-size: 1.1rem;
`;

const TimeStamp = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: var(--text-muted-color);
`;

const LeaderboardTable = styled.div`
  padding: 12px 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const PlayerRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border-radius: 8px;
  background: ${(props) =>
    props.isWinner
      ? "linear-gradient(90deg, rgba(46, 204, 113, 0.15), transparent)"
      : "transparent"};
  border-left: ${(props) =>
    props.isWinner ? "4px solid #2ecc71" : "4px solid transparent"};
`;

const PlayerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const RankCircle = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 700;
  background: ${(props) =>
    props.rank === 1
      ? "#f1c40f"
      : props.rank === 2
        ? "#bdc3c7"
        : props.rank === 3
          ? "#e67e22"
          : "var(--border-color)"};
  color: ${(props) => (props.rank <= 3 ? "#000" : "var(--text-muted-color)")};
`;

const PlayerNameText = styled.span`
  font-weight: ${(props) => (props.isWinner ? "600" : "500")};
  color: ${(props) => (props.isWinner ? "#2ecc71" : "var(--text-color)")};
`;

const ScoreBadge = styled.div`
  font-family: "JetBrains Mono", monospace;
  font-weight: 800;
  font-size: 1.1rem;
  color: ${(props) => (props.isWinner ? "#2ecc71" : "var(--text-color)")};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 40px;
  color: var(--text-muted-color);
  background: var(--surface-color);
  border: 2px dashed var(--border-color);
  border-radius: 16px;

  svg {
    margin-bottom: 20px;
    opacity: 0.3;
  }

  h3 {
    color: var(--text-color);
    margin-bottom: 8px;
  }
`;

const BattleHistoryList = () => {
  const { battleHistory, fetchBattleHistory } = useArena();

  const hasFetched = React.useRef(false);
  useEffect(() => {
    if (!hasFetched.current) {
      fetchBattleHistory();
      hasFetched.current = true;
    }
  }, [fetchBattleHistory]);

  const getModeInfo = (history) => {
    if (history.mode === "solo" || history.participants.length === 1) {
      return { label: "Solo", color: "#3498db", icon: <Users size={14} /> };
    }
    if (history.mode === "team") {
      return {
        label: "Jamoaviy",
        color: "#e74c3c",
        icon: <Trophy size={14} />,
      };
    }
    return { label: "Duel", color: "#9b59b6", icon: <Users size={14} /> };
  };

  return (
    <HistoryContainer>
      <HistoryTitle>
        <Trophy size={28} color="#f1c40f" /> O'ynalgan Bellashuvlar Tarixi
      </HistoryTitle>

      {!battleHistory || battleHistory.length === 0 ? (
        <EmptyState>
          <Trophy size={64} />
          <h3>Hali g'alabalar yo'q</h3>
          <p>Bellashuvlarda qatnashing va o'z tarixingizni yarating!</p>
        </EmptyState>
      ) : (
        <HistoryList>
          {battleHistory.map((history) => {
            const sortedParticipants = [...history.participants].sort(
              (a, b) => b.score - a.score,
            );
            const testTitle = history.testId?.title || "Noma'lum Test";
            const mode = getModeInfo(history);

            return (
              <HistoryCard key={history._id}>
                <CardHeader>
                  <TestInfo>
                    <ModeBadge color={mode.color}>
                      {mode.icon} {mode.label}
                    </ModeBadge>
                    <TestTitle>{testTitle}</TestTitle>
                  </TestInfo>
                  <TimeStamp>
                    <Clock size={14} />
                    {dayjs(history.createdAt).format("DD MMM, YYYY • HH:mm")}
                  </TimeStamp>
                </CardHeader>
                <LeaderboardTable>
                  {sortedParticipants.map((p, index) => {
                    const isWinner = index === 0 && p.score > 0;
                    return (
                      <PlayerRow key={p.userId || index} isWinner={isWinner}>
                        <PlayerInfo>
                          <RankCircle rank={index + 1}>{index + 1}</RankCircle>
                          <PlayerNameText isWinner={isWinner}>
                            {p.nickname}
                          </PlayerNameText>
                        </PlayerInfo>
                        <ScoreBadge isWinner={isWinner}>
                          {p.score}{" "}
                          <span style={{ fontSize: "0.8rem", opacity: 0.7 }}>
                            PT
                          </span>
                        </ScoreBadge>
                      </PlayerRow>
                    );
                  })}
                </LeaderboardTable>
              </HistoryCard>
            );
          })}
        </HistoryList>
      )}
    </HistoryContainer>
  );
};

export default BattleHistoryList;
