import React, { useMemo, useState } from "react";
import styled from "styled-components";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Download,
  Search,
} from "lucide-react";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.28);
  z-index: 10000;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 768px) {
    background: var(--background-color);
  }
`;

const Pane = styled.aside`
  width: min(680px, 100vw);
  height: 100vh;
  border-left: 1px solid var(--border-color);
  background: var(--background-color);
  display: flex;
  flex-direction: column;
  animation: slideInResultsPane 0.22s ease-out;

  @keyframes slideInResultsPane {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    border-left: none;
  }
`;

const Header = styled.div`
  padding: 14px 14px 12px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const HeaderTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
`;

const HeaderInfo = styled.div`
  min-width: 0;
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--text-muted-color);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
`;

const Title = styled.h2`
  margin: 4px 0 0;
  color: var(--text-color);
  font-size: 20px;
  line-height: 1.2;
`;

const Subtitle = styled.p`
  margin: 4px 0 0;
  color: var(--text-muted-color);
  font-size: 12px;
  line-height: 1.45;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;

const ActionButton = styled.button`
  min-height: 34px;
  padding: 0 10px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-color);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
`;

const Controls = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 180px;
  gap: 8px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SearchWrap = styled.label`
  min-height: 38px;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background: var(--secondary-color);
  padding: 0 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-muted-color);
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 0;
  border: none;
  background: transparent;
  color: var(--text-color);
  font-size: 13px;
  outline: none;
`;

const FilterSelect = styled.select`
  min-height: 38px;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background: var(--secondary-color);
  color: var(--text-color);
  padding: 0 10px;
  font-size: 13px;
  outline: none;
`;

const Content = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 12px 14px 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const DashboardCard = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--tertiary-color);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const DashboardLabel = styled.div`
  color: var(--text-muted-color);
  font-size: 11px;
  font-weight: 700;
`;

const DashboardValue = styled.div`
  color: var(--text-color);
  font-size: 20px;
  font-weight: 800;
  line-height: 1.1;
`;

const DashboardMeta = styled.div`
  color: var(--text-muted-color);
  font-size: 11px;
  line-height: 1.4;
`;

const SectionTitle = styled.h3`
  margin: 0;
  color: var(--text-color);
  font-size: 13px;
  font-weight: 800;
`;

const TableWrap = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--tertiary-color);
  overflow: hidden;
`;

const TableScroller = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 620px;
`;

const Th = styled.th`
  padding: 10px 12px;
  border-bottom: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-muted-color);
  font-size: 11px;
  font-weight: 800;
  text-align: left;
  white-space: nowrap;
`;

const Td = styled.td`
  padding: 10px 12px;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-color);
  font-size: 13px;
  vertical-align: top;
`;

const DataRow = styled.tr`
  cursor: pointer;

  &:hover td {
    background: rgba(148, 163, 184, 0.04);
  }
`;

const NameCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Name = styled.div`
  font-weight: 700;
  color: var(--text-color);
`;

const Subtext = styled.div`
  color: var(--text-muted-color);
  font-size: 11px;
  line-height: 1.4;
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 22px;
  padding: 0 8px;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-color);
  font-size: 11px;
  font-weight: 700;
`;

const Percent = styled.span`
  color: ${(props) =>
    props.$value >= 80
      ? "#22c55e"
      : props.$value >= 50
        ? "var(--text-color)"
        : "#ef4444"};
  font-weight: 800;
`;

const ExpandButton = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-muted-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const DetailCell = styled.td`
  padding: 10px 12px 12px;
  background: rgba(148, 163, 184, 0.04);
  border-bottom: 1px solid var(--border-color);
`;

const BreakdownList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BreakdownItem = styled.div`
  border: 1px solid
    ${(props) =>
      props.$correct
        ? "rgba(34, 197, 94, 0.22)"
        : "rgba(239, 68, 68, 0.22)"};
  border-radius: 10px;
  background: ${(props) =>
    props.$correct ? "rgba(34, 197, 94, 0.05)" : "rgba(239, 68, 68, 0.05)"};
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const BreakdownTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
`;

const BreakdownPrompt = styled.div`
  color: var(--text-color);
  font-size: 12px;
  font-weight: 700;
  line-height: 1.45;
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 22px;
  padding: 0 8px;
  border-radius: 999px;
  background: ${(props) =>
    props.$correct ? "rgba(34, 197, 94, 0.12)" : "rgba(239, 68, 68, 0.12)"};
  color: ${(props) => (props.$correct ? "#22c55e" : "#ef4444")};
  font-size: 11px;
  font-weight: 700;
`;

const BreakdownText = styled.div`
  color: var(--text-muted-color);
  font-size: 12px;
  line-height: 1.5;

  strong {
    color: var(--text-color);
  }
`;

const TokenLine = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const TokenChip = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: 0 8px;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  background: ${(props) => props.$bg || "var(--secondary-color)"};
  color: var(--text-color);
  font-size: 11px;
  font-weight: 700;
`;

const MistakeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const MistakeItem = styled.div`
  border-radius: 8px;
  border: 1px solid rgba(239, 68, 68, 0.2);
  background: rgba(239, 68, 68, 0.08);
  padding: 8px 10px;
  color: var(--text-color);
  font-size: 12px;
  line-height: 1.45;
`;

const EmptyState = styled.div`
  border: 1px dashed var(--border-color);
  border-radius: 12px;
  background: var(--tertiary-color);
  padding: 24px 14px;
  text-align: center;
  color: var(--text-muted-color);
  font-size: 13px;
`;

const LoadingCard = styled.div`
  height: 42px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--tertiary-color);
  opacity: 0.7;
`;

const getQuestionKey = (entry, index) => {
  if (entry?.questionIndex !== undefined && entry?.questionIndex !== null) {
    return String(entry.questionIndex);
  }
  if (entry?.prompt) return `prompt:${entry.prompt}`;
  return `q:${index}`;
};

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const formatPrintableDate = (value) => {
  if (!value) return "";
  try {
    return new Date(value).toLocaleString("uz-UZ");
  } catch {
    return "";
  }
};

const buildAnalytics = (results) => {
  const submittedCount = results.length;
  const mastery = submittedCount
    ? Math.round(
        results.reduce((sum, item) => sum + Number(item.accuracy || 0), 0) /
          submittedCount,
      )
    : 0;

  const questionMap = new Map();
  results.forEach((result) => {
    (result.breakdowns || []).forEach((entry, index) => {
      const key = getQuestionKey(entry, index);
      const current = questionMap.get(key) || {
        prompt: entry.prompt || `Savol #${index + 1}`,
        correct: 0,
        total: 0,
      };
      current.total += 1;
      if (entry.isCorrect) current.correct += 1;
      questionMap.set(key, current);
    });
  });

  const ranked = Array.from(questionMap.values())
    .map((item) => ({
      ...item,
      rate: item.total ? Math.round((item.correct / item.total) * 100) : 0,
    }))
    .sort((a, b) => b.rate - a.rate);

  return {
    submittedCount,
    mastery,
    easiest: ranked[0] || null,
    hardest: ranked[ranked.length - 1] || null,
  };
};

const exportResultsToPdf = ({ title, filteredResults, analytics }) => {
  const rows = filteredResults
    .map(
      (result) => `
        <tr>
          <td>${escapeHtml(result.participantName || "Foydalanuvchi")}</td>
          <td>${escapeHtml(result.groupName || "-")}</td>
          <td>${escapeHtml(formatPrintableDate(result.createdAt))}</td>
          <td>${result.score}</td>
          <td>${result.total}</td>
          <td>${result.accuracy}%</td>
        </tr>
      `,
    )
    .join("");

  const html = `
    <!doctype html>
    <html lang="uz">
      <head>
        <meta charset="utf-8" />
        <title>${escapeHtml(title)} - Hisobot</title>
        <style>
          * { box-sizing: border-box; }
          body { margin: 0; padding: 28px; font-family: Arial, sans-serif; color: #0f172a; }
          h1, p { margin: 0; }
          .head { margin-bottom: 18px; }
          .sub { margin-top: 6px; color: #475569; font-size: 13px; }
          .stats { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; margin-bottom: 16px; }
          .card { border: 1px solid #cbd5e1; border-radius: 12px; padding: 10px; background: #f8fafc; }
          .label { color: #475569; font-size: 11px; font-weight: 700; }
          .value { font-size: 22px; font-weight: 800; margin-top: 4px; }
          .meta { color: #475569; font-size: 11px; margin-top: 4px; line-height: 1.4; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #cbd5e1; padding: 8px 10px; font-size: 12px; text-align: left; }
          th { background: #f1f5f9; color: #475569; }
        </style>
      </head>
      <body>
        <div class="head">
          <h1>${escapeHtml(title)} natijalari</h1>
          <p class="sub">Filtrlangan hisobot</p>
        </div>
        <section class="stats">
          <div class="card"><div class="label">Topshirganlar</div><div class="value">${analytics.submittedCount}</div></div>
          <div class="card"><div class="label">O'zlashtirish</div><div class="value">${analytics.mastery}%</div></div>
          <div class="card"><div class="label">Eng oson savol</div><div class="meta">${escapeHtml(analytics.easiest?.prompt || "Hali ma'lumot yo'q")}</div><div class="value">${analytics.easiest?.rate ?? 0}%</div></div>
          <div class="card"><div class="label">Eng qiyin savol</div><div class="meta">${escapeHtml(analytics.hardest?.prompt || "Hali ma'lumot yo'q")}</div><div class="value">${analytics.hardest?.rate ?? 0}%</div></div>
        </section>
        <table>
          <thead>
            <tr>
              <th>Talaba</th>
              <th>Guruh</th>
              <th>Sana</th>
              <th>To'g'ri</th>
              <th>Jami</th>
              <th>Foiz</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </body>
    </html>
  `;

  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  iframe.setAttribute("aria-hidden", "true");

  const cleanup = () => {
    window.setTimeout(() => {
      iframe.remove();
    }, 1200);
  };

  iframe.onload = () => {
    const frameWindow = iframe.contentWindow;
    if (!frameWindow) {
      cleanup();
      return;
    }

    frameWindow.focus();
    frameWindow.print();
    cleanup();
  };

  iframe.srcdoc = html;
  document.body.appendChild(iframe);
};

const ArenaResultsPane = ({
  title,
  subtitle,
  searchPlaceholder = "Qidirish...",
  loading = false,
  results = [],
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [groupFilter, setGroupFilter] = useState("all");
  const [expandedRowId, setExpandedRowId] = useState(null);

  const groupOptions = useMemo(
    () =>
      Array.from(
        new Set(results.map((item) => item.groupName).filter(Boolean)),
      ).sort((a, b) => a.localeCompare(b)),
    [results],
  );

  const filteredResults = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return results.filter((result) => {
      const matchesSearch =
        !query ||
        String(result.participantName || "").toLowerCase().includes(query) ||
        String(result.groupName || "").toLowerCase().includes(query);
      const matchesGroup =
        groupFilter === "all" || String(result.groupName || "") === groupFilter;
      return matchesSearch && matchesGroup;
    });
  }, [groupFilter, results, searchTerm]);

  const analytics = useMemo(
    () => buildAnalytics(filteredResults),
    [filteredResults],
  );

  return (
    <Overlay onClick={onClose}>
      <Pane onClick={(event) => event.stopPropagation()}>
        <Header>
          <HeaderTop>
            <HeaderInfo>
              <BackButton onClick={onClose}>
                <ArrowLeft size={16} />
                Orqaga
              </BackButton>
              <Title>{title}</Title>
              <Subtitle>{subtitle}</Subtitle>
            </HeaderInfo>

            <HeaderActions>
              <ActionButton
                type="button"
                onClick={() =>
                  exportResultsToPdf({
                    title,
                    filteredResults,
                    analytics,
                  })
                }
              >
                <Download size={14} />
                PDF
              </ActionButton>
            </HeaderActions>
          </HeaderTop>

          <Controls>
            <SearchWrap>
              <Search size={14} />
              <SearchInput
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </SearchWrap>

            <FilterSelect
              value={groupFilter}
              onChange={(event) => setGroupFilter(event.target.value)}
            >
              <option value="all">Barcha guruhlar</option>
              {groupOptions.map((groupName) => (
                <option key={groupName} value={groupName}>
                  {groupName}
                </option>
              ))}
            </FilterSelect>
          </Controls>
        </Header>

        <Content>
          <DashboardGrid>
            <DashboardCard>
              <DashboardLabel>Topshirganlar</DashboardLabel>
              <DashboardValue>{analytics.submittedCount}</DashboardValue>
              <DashboardMeta>Filtrlangan ishlar soni</DashboardMeta>
            </DashboardCard>
            <DashboardCard>
              <DashboardLabel>O'zlashtirish</DashboardLabel>
              <DashboardValue>{analytics.mastery}%</DashboardValue>
              <DashboardMeta>O'rtacha natija</DashboardMeta>
            </DashboardCard>
            <DashboardCard>
              <DashboardLabel>Eng oson savol</DashboardLabel>
              <DashboardValue>{analytics.easiest?.rate ?? 0}%</DashboardValue>
              <DashboardMeta>
                {analytics.easiest?.prompt || "Hali ma'lumot yo'q"}
              </DashboardMeta>
            </DashboardCard>
            <DashboardCard>
              <DashboardLabel>Eng qiyin savol</DashboardLabel>
              <DashboardValue>{analytics.hardest?.rate ?? 0}%</DashboardValue>
              <DashboardMeta>
                {analytics.hardest?.prompt || "Hali ma'lumot yo'q"}
              </DashboardMeta>
            </DashboardCard>
          </DashboardGrid>

          <SectionTitle>Barcha natijalar</SectionTitle>

          {loading ? (
            <>
              {Array.from({ length: 5 }).map((_, index) => (
                <LoadingCard key={index} />
              ))}
            </>
          ) : filteredResults.length === 0 ? (
            <EmptyState>Filtr bo'yicha natija topilmadi.</EmptyState>
          ) : (
            <TableWrap>
              <TableScroller>
                <Table>
                  <thead>
                    <tr>
                      <Th>Talaba</Th>
                      <Th>Guruh</Th>
                      <Th>Sana</Th>
                      <Th>To'g'ri</Th>
                      <Th>Jami</Th>
                      <Th>Foiz</Th>
                      <Th />
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResults.map((result) => {
                      const isExpanded = expandedRowId === result.id;
                      return (
                        <React.Fragment key={result.id}>
                          <DataRow
                            onClick={() =>
                              setExpandedRowId((prev) =>
                                prev === result.id ? null : result.id,
                              )
                            }
                          >
                            <Td>
                              <NameCell>
                                <Name>{result.participantName}</Name>
                                <Subtext>
                                  {(result.breakdowns || []).length} ta savol
                                </Subtext>
                              </NameCell>
                            </Td>
                            <Td>
                              {result.groupName ? (
                                <Badge>{result.groupName}</Badge>
                              ) : (
                                <Subtext>-</Subtext>
                              )}
                            </Td>
                            <Td>
                              <Subtext>{formatPrintableDate(result.createdAt)}</Subtext>
                            </Td>
                            <Td>{result.score}</Td>
                            <Td>{result.total}</Td>
                            <Td>
                              <Percent $value={result.accuracy}>
                                {result.accuracy}%
                              </Percent>
                            </Td>
                            <Td>
                              <ExpandButton
                                type="button"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  setExpandedRowId((prev) =>
                                    prev === result.id ? null : result.id,
                                  );
                                }}
                              >
                                {isExpanded ? (
                                  <ChevronUp size={14} />
                                ) : (
                                  <ChevronDown size={14} />
                                )}
                              </ExpandButton>
                            </Td>
                          </DataRow>

                          {isExpanded ? (
                            <tr>
                              <DetailCell colSpan={7}>
                                <BreakdownList>
                                  {(result.breakdowns || []).map((entry, index) => (
                                    <BreakdownItem
                                      key={`${result.id}-${index}`}
                                      $correct={entry.isCorrect}
                                    >
                                      <BreakdownTop>
                                        <BreakdownPrompt>
                                          {index + 1}. {entry.prompt || "Savol"}
                                        </BreakdownPrompt>
                                        <StatusBadge $correct={entry.isCorrect}>
                                          {entry.isCorrect ? "To'g'ri" : "Xato"}
                                        </StatusBadge>
                                      </BreakdownTop>

                                      {Array.isArray(entry.selectedTokens) ? (
                                        <>
                                          <BreakdownText>Siz tuzgan gap</BreakdownText>
                                          <TokenLine>
                                            {(entry.selectedTokens || []).length ? (
                                              entry.selectedTokens.map(
                                                (token, tokenIndex) => (
                                                  <TokenChip
                                                    key={`${token}-${tokenIndex}`}
                                                    $bg="rgba(59, 130, 246, 0.12)"
                                                  >
                                                    {token}
                                                  </TokenChip>
                                                ),
                                              )
                                            ) : (
                                              <BreakdownText>
                                                <strong>Javob yuborilmagan</strong>
                                              </BreakdownText>
                                            )}
                                          </TokenLine>

                                          <BreakdownText>To'g'ri javob</BreakdownText>
                                          <TokenLine>
                                            {(entry.expectedTokens || []).map(
                                              (token, tokenIndex) => (
                                                <TokenChip
                                                  key={`${token}-${tokenIndex}`}
                                                  $bg="rgba(34, 197, 94, 0.14)"
                                                >
                                                  {token}
                                                </TokenChip>
                                              ),
                                            )}
                                          </TokenLine>

                                          {!entry.isCorrect &&
                                          (entry.mistakes || []).length > 0 ? (
                                            <MistakeList>
                                              {(entry.mistakes || []).map(
                                                (mistake, mistakeIndex) => (
                                                  <MistakeItem
                                                    key={`${index}-${mistakeIndex}`}
                                                  >
                                                    {mistake.position}-bo'lak: siz{" "}
                                                    <strong>
                                                      {mistake.actual || "hech narsa"}
                                                    </strong>{" "}
                                                    tanladingiz. To'g'risi{" "}
                                                    <strong>
                                                      {mistake.expected ||
                                                        "ortiqcha bo'lak"}
                                                    </strong>
                                                    .
                                                  </MistakeItem>
                                                ),
                                              )}
                                            </MistakeList>
                                          ) : null}
                                        </>
                                      ) : (
                                        <>
                                          <BreakdownText>
                                            Siz tanlagan javob:{" "}
                                            <strong>
                                              {entry.selectedText ||
                                                "Javob berilmagan"}
                                            </strong>
                                          </BreakdownText>
                                          <BreakdownText>
                                            To'g'ri javob:{" "}
                                            <strong>
                                              {entry.correctText || "Ma'lumot yo'q"}
                                            </strong>
                                          </BreakdownText>
                                        </>
                                      )}
                                    </BreakdownItem>
                                  ))}
                                </BreakdownList>
                              </DetailCell>
                            </tr>
                          ) : null}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </Table>
              </TableScroller>
            </TableWrap>
          )}
        </Content>
      </Pane>
    </Overlay>
  );
};

export default ArenaResultsPane;
