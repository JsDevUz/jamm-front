import React, { useEffect, useMemo, useState } from "react";
import { useArena } from "../../contexts/ArenaContext";
import ArenaResultsPane from "./ArenaResultsPane";

const extractGroupName = (nickname = "") => {
  const match = String(nickname).match(/\(([^()]+)\)\s*$/);
  return match ? match[1].trim() : "";
};

const stripGroupSuffix = (nickname = "") =>
  String(nickname).replace(/\s*\([^()]+\)\s*$/, "").trim();

const TestResultsDialog = ({ test, onClose }) => {
  const { fetchTestResults } = useArena();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadResults = async () => {
      if (!test?._id) return;
      setLoading(true);
      try {
        const response = await fetchTestResults(test._id, {
          page: 1,
          limit: 500,
        });
        if (!isMounted) return;

        const histories = Array.isArray(response) ? response : response?.data || [];
        const flattened = histories
          .flatMap((history) =>
            (history.participants || []).map((participant, participantIndex) => ({
              id: `${history._id || history.createdAt}-${participant.userId || participantIndex}`,
              participantName:
                stripGroupSuffix(participant.nickname) || "Foydalanuvchi",
              groupName: extractGroupName(participant.nickname),
              createdAt: history.createdAt,
              score: Number(participant.score || 0),
              total: Number(
                participant.total ||
                  participant.results?.length ||
                  test.questions?.length ||
                  0,
              ),
              accuracy:
                Number(
                  participant.total ||
                    participant.results?.length ||
                    test.questions?.length ||
                    0,
                ) > 0
                  ? Math.round(
                      (Number(participant.score || 0) /
                        Number(
                          participant.total ||
                            participant.results?.length ||
                            test.questions?.length ||
                            0,
                        )) *
                        100,
                    )
                  : 0,
              breakdowns: (participant.results || []).map((item) => {
                const question = test.questions?.[item.questionIndex];
                const selectedIndex = Array.isArray(participant.answers)
                  ? participant.answers[item.questionIndex]
                  : -1;

                return {
                  questionIndex: item.questionIndex,
                  prompt: question?.questionText || `Savol #${item.questionIndex + 1}`,
                  isCorrect: Boolean(item.correct),
                  selectedText:
                    selectedIndex >= 0
                      ? question?.options?.[selectedIndex]
                      : "Javob berilmagan",
                  correctText:
                    item.correctOptionIndex >= 0
                      ? question?.options?.[item.correctOptionIndex]
                      : "Ma'lumot yo'q",
                };
              }),
            })),
          )
          .sort(
            (a, b) =>
              new Date(b.createdAt || 0).getTime() -
              new Date(a.createdAt || 0).getTime(),
          );

        setResults(flattened);
      } catch (error) {
        console.error("Failed to load test results", error);
        if (isMounted) {
          setResults([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadResults();

    return () => {
      isMounted = false;
    };
  }, [fetchTestResults, test]);

  const subtitle = useMemo(
    () =>
      `"${test?.title || "Test"}" bo'yicha ishlagan foydalanuvchilar, ularning natijasi va har bir savoldagi breakdown.`,
    [test],
  );

  if (!test) return null;

  return (
    <ArenaResultsPane
      title="Test natijalari"
      subtitle={subtitle}
      searchPlaceholder="Talaba yoki guruh qidirish..."
      loading={loading}
      results={results}
      onClose={onClose}
    />
  );
};

export default TestResultsDialog;
