import React, { useEffect, useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import { useArena } from "../../../contexts/ArenaContext";
import {
  Plus,
  Play,
  Link2,
  BarChart3,
  Trash2,
  Pencil,
  MoreHorizontal,
} from "lucide-react";
import useAuthStore from "../../../store/authStore";
import CreateTestDialog from "./CreateTestDialog";
import SoloTestPlayer from "./SoloTestPlayer";
import TestResultsDialog from "./TestResultsDialog";
import ShareLinksDialog from "./ShareLinksDialog";
import PremiumUpgradeModal from "../../../app/components/PremiumUpgradeModal";
import {
  createTestShareLink,
  deleteTestShareLink,
  fetchSharedTestByCode,
  fetchTestById,
  fetchTestShareLinks,
} from "../../../api/arenaApi";
import { useNavigate } from "react-router-dom";
import ArenaHeader from "./ArenaHeader";
import InfiniteScroll from "react-infinite-scroll-component";
import { SidebarIconButton as ButtonWrapper } from "../../../shared/ui/buttons/IconButton";
import ConfirmDialog from "../../../shared/ui/dialogs/ConfirmDialog";
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
  position: relative;
  z-index: ${(props) => (props.$raised ? 12 : 1)};
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 18px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  cursor: pointer;
  transition:
    border-color 0.18s ease,
    transform 0.18s ease,
    background-color 0.18s ease;

  &:hover {
    border-color: var(--text-muted-color);
    transform: translateY(-2px);
  }
`;

const CardTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
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
  font-size: 13px;
  color: var(--text-muted-color);
`;

const CardHint = styled.div`
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text-muted-color);
  font-size: 12px;
  font-weight: 700;
`;

const MenuWrap = styled.div`
  position: relative;
  flex-shrink: 0;
`;

const MenuButton = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-muted-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    color: var(--text-color);
  }
`;

const MenuDropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 180px;
  padding: 8px;
  border-radius: 14px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.24);
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const MenuItem = styled.button`
  min-height: 38px;
  padding: 0 12px;
  border: none;
  border-radius: 10px;
  background: ${(props) =>
    props.$danger ? "rgba(239, 68, 68, 0.08)" : "transparent"};
  color: ${(props) => (props.$danger ? "#ef4444" : "var(--text-color)")};
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: ${(props) =>
      props.$danger ? "rgba(239, 68, 68, 0.12)" : "var(--tertiary-color)"};
  }
`;

const TestList = ({ initialTestId, onBack }) => {
  const {
    tests,
    myTests,
    myTestsPage,
    myTestsHasMore,
    fetchMyTests,
    deleteTest,
  } = useArena();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [activeSoloTest, setActiveSoloTest] = useState(null);
  const [selectedTestForResults, setSelectedTestForResults] = useState(null);
  const [editingTest, setEditingTest] = useState(null);
  const [testToDelete, setTestToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [shareTest, setShareTest] = useState(null);
  const [shareMode, setShareMode] = useState("persist");
  const [shareGroupName, setShareGroupName] = useState("");
  const [shareShowResults, setShareShowResults] = useState(true);
  const [shareTimeLimit, setShareTimeLimit] = useState(0);
  const [isCopyingLink, setIsCopyingLink] = useState(false);
  const [shareLinks, setShareLinks] = useState([]);
  const [loadingShareLinks, setLoadingShareLinks] = useState(false);
  const [deletingShareLinkId, setDeletingShareLinkId] = useState(null);
  const [activeShareShortCode, setActiveShareShortCode] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);

  const hasFetched = React.useRef(false);
  useEffect(() => {
    if (!hasFetched.current) {
      fetchMyTests();
      hasFetched.current = true;
    }
  }, [fetchMyTests]);

  useEffect(() => {
    if (!openMenuId) return undefined;
    const handleOutsideClick = () => setOpenMenuId(null);
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [openMenuId]);

  useEffect(() => {
    if (initialTestId && !activeSoloTest) {
      // Check in existing lists first
      const allTests = [...tests, ...myTests];
      const target = allTests.find(
        (t) => t._id === initialTestId || t.urlSlug === initialTestId,
      );

      if (target) {
        setActiveShareShortCode(null);
        setActiveSoloTest(target);
      } else {
        if (initialTestId == "0") return;
        // Not found in lists (e.g. guest or not owner) — fetch directly
        fetchTestById(initialTestId)
          .then((data) => {
            if (data) {
              setActiveShareShortCode(null);
              setActiveSoloTest(data);
            }
          })
          .catch((err) => {
            fetchSharedTestByCode(initialTestId)
              .then((data) => {
                if (data?.test) {
                  setActiveSoloTest(data.test);
                  setActiveShareShortCode(data?.shareLink?.shortCode || initialTestId);
                }
              })
              .catch((sharedError) => {
                console.error("Failed to fetch test by ID:", err || sharedError);
                toast.error("Test topilmadi yoki unga ruxsat yo'q.");
              });
          });
      }
    }
  }, [initialTestId, tests, myTests, activeSoloTest]);

  useEffect(() => {
    if (!shareTest?._id) {
      setShareLinks([]);
      return;
    }

    setLoadingShareLinks(true);
    fetchTestShareLinks(shareTest._id)
      .then((data) => setShareLinks(Array.isArray(data) ? data : []))
      .catch(() => setShareLinks([]))
      .finally(() => setLoadingShareLinks(false));
  }, [shareTest]);

  const handleCopyLink = async () => {
    if (!shareTest) return;
    setIsCopyingLink(true);
    try {
      const response = await createTestShareLink(shareTest._id, {
        persistResults: shareMode !== "ephemeral",
        groupName: shareMode === "persist" ? shareGroupName.trim() : "",
        showResults: shareShowResults,
        timeLimit: Number(shareTimeLimit) || 0,
      });
      const url = `${window.location.origin}/arena/quiz-link/${response.shortCode}`;
      await navigator.clipboard.writeText(url);
      setShareLinks((prev) => [response, ...prev]);
      toast.success("Qisqa test havolasi nusxalandi!");
      setShareGroupName("");
      setShareMode("persist");
      setShareShowResults(true);
      setShareTimeLimit(0);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Test havolasini yaratishda xatolik yuz berdi.",
      );
    } finally {
      setIsCopyingLink(false);
    }
  };

  const handleCopyExistingLink = async (shortCode) => {
    const url = `${window.location.origin}/arena/quiz-link/${shortCode}`;
    await navigator.clipboard.writeText(url);
    toast.success("Test havolasi nusxalandi!");
  };

  const handleDeleteShareLink = async (shareLinkId) => {
    if (!shareTest?._id) return;
    setDeletingShareLinkId(shareLinkId);
    try {
      await deleteTestShareLink(shareTest._id, shareLinkId);
      setShareLinks((prev) => prev.filter((item) => item._id !== shareLinkId));
      toast.success("Havola o'chirildi.");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Havolani o'chirishda xatolik yuz berdi.",
      );
    } finally {
      setDeletingShareLinkId(null);
    }
  };

  const handleDeleteTest = async () => {
    if (!testToDelete || isDeleting) return;

    setIsDeleting(true);
    try {
      await deleteTest(testToDelete._id);
      if (selectedTestForResults?._id === testToDelete._id) {
        setSelectedTestForResults(null);
      }
      if (activeSoloTest?._id === testToDelete._id) {
        setActiveSoloTest(null);
      }
      toast.success("Test va unga tegishli natijalar o'chirildi.");
      setTestToDelete(null);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Testni o'chirishda xatolik yuz berdi.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  if (activeSoloTest) {
    return (
      <SoloTestPlayer
        test={activeSoloTest}
        shareShortCode={activeShareShortCode}
        onClose={() => {
          setActiveSoloTest(null);
          setActiveShareShortCode(null);
          navigate("/arena");
        }}
      />
    );
  }

  const isPremium =
    user?.premiumStatus === "premium" || user?.premiumStatus === "active";
  const limit = isPremium ? 10 : 4;
  const shareLimit = isPremium ? 4 : 2;
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
          <ButtonWrapper onClick={handleCreateClick}>
            <Plus size={18} />
          </ButtonWrapper>
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
            <Card
              key={test._id}
              $raised={openMenuId === test._id}
              onClick={() => {
                setOpenMenuId(null);
                setActiveShareShortCode(null);
                setActiveSoloTest(test);
              }}
            >
              <CardTop>
                <CardTitle>{test.title}</CardTitle>
                <MenuWrap
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                >
                  <MenuButton
                    onClick={() =>
                      setOpenMenuId((prev) => (prev === test._id ? null : test._id))
                    }
                  >
                    <MoreHorizontal size={16} />
                  </MenuButton>
                  {openMenuId === test._id && (
                    <MenuDropdown onClick={(event) => event.stopPropagation()}>
                      <MenuItem
                        onClick={() => {
                          setSelectedTestForResults(test);
                          setOpenMenuId(null);
                        }}
                      >
                        <BarChart3 size={14} />
                        Natijalar
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setShareTest(test);
                          setShareMode("persist");
                          setShareGroupName("");
                          setShareShowResults(true);
                          setShareTimeLimit(0);
                          setOpenMenuId(null);
                        }}
                      >
                        <Link2 size={14} />
                        Havola yaratish
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setEditingTest(test);
                          setOpenMenuId(null);
                        }}
                      >
                        <Pencil size={14} />
                        Tahrirlash
                      </MenuItem>
                      <MenuItem
                        $danger
                        onClick={() => {
                          setTestToDelete(test);
                          setOpenMenuId(null);
                        }}
                      >
                        <Trash2 size={14} />
                        O'chirish
                      </MenuItem>
                    </MenuDropdown>
                  )}
                </MenuWrap>
              </CardTop>
              <CardDesc>{test.description || "Tavsif yo'q"}</CardDesc>
              <Meta>Savollar soni: {test.questions?.length || 0}</Meta>
              <Meta>
                Tuzuvchi: {test.createdBy?.nickname || test.createdBy?.username}
              </Meta>
              <CardHint>
                <Play size={14} />
                Boshlash uchun kartani bosing
              </CardHint>
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
        isOpen={isCreateOpen || Boolean(editingTest)}
        onClose={() => {
          setIsCreateOpen(false);
          setEditingTest(null);
        }}
        initialTest={editingTest}
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

      <ShareLinksDialog
        isOpen={Boolean(shareTest)}
        onClose={() => {
          setShareTest(null);
          setShareGroupName("");
          setShareMode("persist");
          setShareShowResults(true);
          setShareTimeLimit(0);
        }}
        title="Test havolasini yaratish"
        itemTitle={shareTest?.title || ""}
        limit={shareLimit}
        currentCount={shareLinks.length}
        mode={shareMode}
        onModeChange={setShareMode}
        groupName={shareGroupName}
        onGroupNameChange={setShareGroupName}
        showResults={shareShowResults}
        onShowResultsChange={setShareShowResults}
        timeLimit={shareTimeLimit}
        onTimeLimitChange={setShareTimeLimit}
        onCreate={handleCopyLink}
        isCreating={isCopyingLink}
        links={shareLinks}
        loadingLinks={loadingShareLinks}
        onCopyLink={handleCopyExistingLink}
        onDeleteLink={handleDeleteShareLink}
        deletingLinkId={deletingShareLinkId}
        linkPrefix="/arena/quiz-link/"
      />

      <ConfirmDialog
        isOpen={Boolean(testToDelete)}
        onClose={() => {
          if (!isDeleting) setTestToDelete(null);
        }}
        title="Testni o'chirish"
        description={`${
          testToDelete?.title || "Bu test"
        } o'chirilsa, unga tegishli barcha natijalar ham o'chadi. Bu amalni bekor qilib bo'lmaydi.`}
        confirmText={isDeleting ? "O'chirilmoqda..." : "O'chirish"}
        cancelText="Bekor qilish"
        onConfirm={handleDeleteTest}
        isDanger
      />
    </Container>
  );
};

export default TestList;
