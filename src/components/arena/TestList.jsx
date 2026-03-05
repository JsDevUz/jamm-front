import React, { useEffect, useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import { useArena } from "../../contexts/ArenaContext";
import { Plus, Play, Link2, Copy, ArrowLeft } from "lucide-react";
import useAuthStore from "../../store/authStore";
import CreateTestDialog from "./CreateTestDialog";
import SoloTestPlayer from "./SoloTestPlayer";
import TestResultsDialog from "./TestResultsDialog";
import PremiumUpgradeModal from "../PremiumUpgradeModal";
import { fetchTestById } from "../../api/arenaApi";
import { useNavigate } from "react-router-dom";
import ArenaHeader from "./ArenaHeader";
import { PlusBtn } from "../ProfilePage";
import InfiniteScroll from "react-infinite-scroll-component";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    z-index: 9999;
    background-color: var(--background-color);
    animation: slideInFromRight 0.3s ease-out;
    padding: 20px;
    overflow-y: auto;
  }

  @keyframes slideInFromRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

const CreateBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 8px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    filter: brightness(1.1);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const Card = styled.div`
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  margin: 0;
  color: var(--text-color);
`;

const CardDesc = styled.p`
  font-size: 14px;
  color: var(--text-muted-color);
  margin: 0;
  line-height: 1.4;
`;

const Meta = styled.div`
  font-size: 12px;
  color: var(--text-muted-color);
`;

const PlayBtn = styled.button`
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  background-color: var(--secondary-color);
  border: 1px solid var(--border-color);
  color: var(--text-color);
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
  }
`;

const TestList = ({ initialTestId, onBack }) => {
  const {
    tests,
    myTests,
    myTestsPage,
    myTestsHasMore,
    fetchMyTests,
    createBattle,
  } = useArena();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [activeSoloTest, setActiveSoloTest] = useState(null);
  const [selectedTestForResults, setSelectedTestForResults] = useState(null);

  const hasFetched = React.useRef(false);
  useEffect(() => {
    if (!hasFetched.current) {
      fetchMyTests();
      hasFetched.current = true;
    }
  }, [fetchMyTests]);

  useEffect(() => {
    if (initialTestId && !activeSoloTest) {
      // Check in existing lists first
      const allTests = [...tests, ...myTests];
      const target = allTests.find(
        (t) => t._id === initialTestId || t.urlSlug === initialTestId,
      );

      if (target) {
        setActiveSoloTest(target);
      } else {
        if (initialTestId == "0") return;
        // Not found in lists (e.g. guest or not owner) — fetch directly
        fetchTestById(initialTestId)
          .then((data) => {
            if (data) setActiveSoloTest(data);
          })
          .catch((err) => {
            console.error("Failed to fetch test by ID:", err);
            toast.error("Test topilmadi yoki unga ruxsat yo'q.");
          });
      }
    }
  }, [initialTestId, tests, myTests, activeSoloTest]);

  const handleCopyLink = (testId) => {
    const url = `${window.location.origin}/arena/quiz/${testId}`;
    navigator.clipboard.writeText(url);
    toast.success("Test havolasi nusxalandi!");
  };

  if (activeSoloTest) {
    return (
      <SoloTestPlayer
        test={activeSoloTest}
        onClose={() => {
          (setActiveSoloTest(null), navigate("/arena"));
        }}
      />
    );
  }

  const isPremium = user?.premiumStatus === "premium";
  const limit = isPremium ? 10 : 3;
  const currentCount = myTests.length;

  const handleCreateClick = () => {
    if (currentCount >= limit) {
      if (!isPremium) {
        setIsUpgradeModalOpen(true);
      } else {
        toast.error("Siz maksimal limitga yetgansiz (10/10).");
      }
      return;
    }
    setIsCreateOpen(true);
  };

  return (
    <Container>
      <ArenaHeader
        title="Testlar"
        count={currentCount}
        onBack={() => onBack && onBack()}
        rightContent={
          <PlusBtn onClick={handleCreateClick}>
            <Plus size={18} />
          </PlusBtn>
        }
        // action={{
        //   icon: <Plus size={18} />,
        //   onClick: handleCreateClick,
        //   disabled: currentCount >= 10,
        // }}
      />

      <InfiniteScroll
        dataLength={myTests.length}
        next={() => fetchMyTests(myTestsPage + 1)}
        hasMore={myTestsHasMore}
        loader={
          <div
            style={{
              textAlign: "center",
              padding: "10px",
              color: "var(--text-muted-color)",
              fontSize: "12px",
              gridColumn: "1 / -1",
            }}
          >
            Yuklanmoqda...
          </div>
        }
        endMessage={
          myTests.length > 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "10px",
                color: "var(--text-muted-color)",
                fontSize: "12px",
                gridColumn: "1 / -1",
              }}
            >
              Barcha testlar ko'rsatildi.
            </div>
          ) : null
        }
        scrollableTarget={null}
        style={{ overflow: "visible" }}
      >
        <Grid id="arenaTestsList">
          {myTests.map((test) => (
            <Card key={test._id}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <CardTitle>{test.title}</CardTitle>
                <button
                  onClick={() => handleCopyLink(test._id)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--text-muted-color)",
                    cursor: "pointer",
                  }}
                  title="Havolani nusxalash"
                >
                  <Link2 size={16} />
                </button>
              </div>
              <CardDesc>{test.description || "Tavsif yo'q"}</CardDesc>
              <Meta>Savollar soni: {test.questions?.length || 0}</Meta>
              <Meta>
                Tuzuvchi: {test.createdBy?.nickname || test.createdBy?.username}
              </Meta>
              <div style={{ display: "flex", gap: "8px", marginTop: "auto" }}>
                <PlayBtn
                  style={{ flex: 1, backgroundColor: "var(--bg-color)" }}
                  onClick={() => setActiveSoloTest(test)}
                >
                  Boshlash
                </PlayBtn>
                <PlayBtn
                  style={{
                    flex: 1,
                    backgroundColor: "var(--primary-color)",
                    color: "white",
                    borderColor: "var(--primary-color)",
                  }}
                  onClick={() => setSelectedTestForResults(test)}
                >
                  Natijalar
                </PlayBtn>
              </div>
            </Card>
          ))}
          {myTests.length === 0 && (
            <CardDesc style={{ gridColumn: "1 / -1" }}>
              Hozircha hech qanday test yaratilmagan.
            </CardDesc>
          )}
        </Grid>
      </InfiniteScroll>

      <CreateTestDialog
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />

      {selectedTestForResults && (
        <TestResultsDialog
          test={selectedTestForResults}
          onClose={() => setSelectedTestForResults(null)}
        />
      )}

      <PremiumUpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        onUpgrade={() => {
          setIsUpgradeModalOpen(false);
          // Redirect to premium page or handle upgrade
          window.location.href = "/premium";
        }}
      />
    </Container>
  );
};

export default TestList;
