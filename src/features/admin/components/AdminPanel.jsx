import React from "react";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import {
  createAdminPromocode,
  fetchAdminCourses,
  fetchAdminGroups,
  fetchAdminPromocodes,
  fetchAdminUsers,
  updateAdminUserInstructor,
} from "../../../api/adminApi";
import useAuthStore from "../../../store/authStore";
import {
  ActionButton,
  Description,
  EmptyState,
  Field,
  FieldInput,
  FilterSelect,
  FooterBar,
  FooterMeta,
  FormGrid,
  HeaderActions,
  HeaderTitle,
  MetaBadge,
  ModalBody,
  ModalCard,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Pager,
  PanelHeader,
  PanelShell,
  SearchInput,
  StyledTable,
  TableScroller,
  TabButton,
  TabRow,
  Title,
} from "./AdminPanel.styles";

const tabs = [
  { id: "users", label: "Users" },
  { id: "groups", label: "Groups" },
  { id: "courses", label: "Courses" },
  { id: "promocodes", label: "Promocodes" },
];

const initialPromoForm = {
  code: "",
  validFrom: "",
  validUntil: "",
  durationInDays: "365",
  maxUses: "",
};

const formatDate = (value) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString();
};

export default function AdminPanel() {
  const currentUser = useAuthStore((state) => state.user);
  const [activeTab, setActiveTab] = React.useState("users");
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [filterValue, setFilterValue] = React.useState("");
  const [data, setData] = React.useState({ items: [], total: 0, totalPages: 1 });
  const [loading, setLoading] = React.useState(false);
  const [updatingUserId, setUpdatingUserId] = React.useState(null);
  const [promoOpen, setPromoOpen] = React.useState(false);
  const [promoForm, setPromoForm] = React.useState(initialPromoForm);

  if (currentUser?.officialBadgeKey !== "ceo") {
    return <Navigate to="/chats" replace />;
  }

  React.useEffect(() => {
    setPage(1);
  }, [activeTab, filterValue, search]);

  React.useEffect(() => {
    const timer = window.setTimeout(async () => {
      setLoading(true);
      try {
        const params = {
          page,
          limit: 20,
          q: search.trim() || undefined,
        };

        if (activeTab === "users" && filterValue) params.premiumStatus = filterValue;
        if (activeTab === "courses" && filterValue) params.accessType = filterValue;
        if (activeTab === "promocodes" && filterValue) params.isActive = filterValue;

        const response =
          activeTab === "users"
            ? await fetchAdminUsers(params)
            : activeTab === "groups"
              ? await fetchAdminGroups(params)
              : activeTab === "courses"
                ? await fetchAdminCourses(params)
                : await fetchAdminPromocodes(params);

        setData(response || { items: [], total: 0, totalPages: 1 });
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to load admin data");
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => window.clearTimeout(timer);
  }, [activeTab, page, search, filterValue]);

  const refreshPromocodes = async () => {
    const response = await fetchAdminPromocodes({ page: 1, limit: 20 });
    setData(response || { items: [], total: 0, totalPages: 1 });
  };

  const handleCreatePromo = async () => {
    try {
      await createAdminPromocode({
        ...promoForm,
        maxUses: promoForm.maxUses || null,
      });
      toast.success("Promocode created");
      setPromoOpen(false);
      setPromoForm(initialPromoForm);
      setActiveTab("promocodes");
      setPage(1);
      await refreshPromocodes();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create promocode");
    }
  };

  const handleMakeInstructor = async (user) => {
    const userId = user?._id;
    if (!userId || user.isInstructor) return;

    setUpdatingUserId(userId);
    try {
      const updatedUser = await updateAdminUserInstructor(userId, true);
      setData((prev) => ({
        ...prev,
        items: (prev.items || []).map((item) =>
          item._id === userId ? { ...item, ...updatedUser } : item,
        ),
      }));
      toast.success("User is now an instructor");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update user");
    } finally {
      setUpdatingUserId(null);
    }
  };

  const renderFilter = () => {
    if (activeTab === "users") {
      return (
        <FilterSelect value={filterValue} onChange={(e) => setFilterValue(e.target.value)}>
          <option value="">All premium</option>
          <option value="active">Active premium</option>
          <option value="expired">Expired premium</option>
          <option value="none">No premium</option>
        </FilterSelect>
      );
    }

    if (activeTab === "courses") {
      return (
        <FilterSelect value={filterValue} onChange={(e) => setFilterValue(e.target.value)}>
          <option value="">All access</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
          <option value="free_open">Free open</option>
        </FilterSelect>
      );
    }

    if (activeTab === "promocodes") {
      return (
        <FilterSelect value={filterValue} onChange={(e) => setFilterValue(e.target.value)}>
          <option value="">All status</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </FilterSelect>
      );
    }

    return null;
  };

  const renderRows = () => {
    if (!data.items?.length) {
      return <EmptyState>No data found</EmptyState>;
    }

    if (activeTab === "users") {
      return (
        <StyledTable>
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Premium</th>
              <th>Instructor</th>
              <th>Blocked</th>
              <th>Badge</th>
              <th>Created</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item) => (
              <tr key={item._id}>
                <td>{item.nickname || item.username || "—"}</td>
                <td>{item.email || "—"}</td>
                <td>
                  <MetaBadge $tone={item.premiumStatus === "active" ? "success" : "default"}>
                    {item.premiumStatus || "none"}
                  </MetaBadge>
                </td>
                <td>
                  <MetaBadge $tone={item.isInstructor ? "success" : "default"}>
                    {item.isInstructor ? "Instructor" : "User"}
                  </MetaBadge>
                </td>
                <td>
                  <MetaBadge $tone={item.isBlocked ? "danger" : "success"}>
                    {item.isBlocked ? "Blocked" : "Open"}
                  </MetaBadge>
                </td>
                <td>{item.officialBadgeLabel || "—"}</td>
                <td>{formatDate(item.createdAt)}</td>
                <td>
                  <ActionButton
                    onClick={() => handleMakeInstructor(item)}
                    disabled={item.isInstructor || updatingUserId === item._id}
                  >
                    {item.isInstructor
                      ? "Done"
                      : updatingUserId === item._id
                        ? "Saving..."
                        : "Make instructor"}
                  </ActionButton>
                </td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      );
    }

    if (activeTab === "groups") {
      return (
        <StyledTable>
          <thead>
            <tr>
              <th>Group</th>
              <th>Description</th>
              <th>Members</th>
              <th>Created</th>
              <th>Activity</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item) => (
              <tr key={item._id}>
                <td>{item.name || "Untitled group"}</td>
                <td>{item.description || "—"}</td>
                <td>{item.membersCount || 0}</td>
                <td>{formatDate(item.createdAt)}</td>
                <td>{formatDate(item.lastMessageAt)}</td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      );
    }

    if (activeTab === "courses") {
      return (
        <StyledTable>
          <thead>
            <tr>
              <th>Course</th>
              <th>Slug</th>
              <th>Access</th>
              <th>Created</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item) => (
              <tr key={item._id}>
                <td>{item.title || "Untitled course"}</td>
                <td>{item.urlSlug || "—"}</td>
                <td>{item.accessType || "—"}</td>
                <td>{formatDate(item.createdAt)}</td>
                <td>{formatDate(item.updatedAt)}</td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      );
    }

    return (
      <StyledTable>
        <thead>
          <tr>
            <th>Code</th>
            <th>Duration</th>
            <th>Status</th>
            <th>Uses</th>
            <th>Valid from</th>
            <th>Valid until</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item) => (
            <tr key={item._id}>
              <td>{item.displayCode || "—"}</td>
              <td>{item.durationInDays ? `${item.durationInDays} days` : "30 days"}</td>
              <td>
                <MetaBadge $tone={item.isActive ? "success" : "danger"}>
                  {item.isActive ? "Active" : "Inactive"}
                </MetaBadge>
              </td>
              <td>
                {item.usedCount || 0}
                {item.maxUses ? ` / ${item.maxUses}` : ""}
              </td>
              <td>{formatDate(item.validFrom)}</td>
              <td>{formatDate(item.validUntil)}</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    );
  };

  return (
    <PanelShell>
      <PanelHeader>
        <HeaderTitle>
          <Title>CEO Admin Panel</Title>
          <Description>Users, groups, courses and promocodes overview</Description>
        </HeaderTitle>
        <HeaderActions>
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users, email, groups, courses..."
            aria-label="Search admin data"
          />
          {renderFilter()}
          {activeTab === "promocodes" ? (
            <ActionButton $variant="primary" onClick={() => setPromoOpen(true)}>
              New promocode
            </ActionButton>
          ) : null}
        </HeaderActions>
      </PanelHeader>

      <TabRow>
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            $active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </TabButton>
        ))}
      </TabRow>

      <TableScroller>{loading ? <EmptyState>Loading...</EmptyState> : renderRows()}</TableScroller>

      <FooterBar>
        <FooterMeta>
          {data.total || 0} total • page {page} / {data.totalPages || 1}
        </FooterMeta>
        <Pager>
          <ActionButton onClick={() => setPage((prev) => Math.max(1, prev - 1))}>
            Prev
          </ActionButton>
          <ActionButton
            onClick={() => setPage((prev) => Math.min(data.totalPages || 1, prev + 1))}
          >
            Next
          </ActionButton>
        </Pager>
      </FooterBar>

      {promoOpen ? (
        <ModalOverlay onClick={() => setPromoOpen(false)}>
          <ModalCard onClick={(event) => event.stopPropagation()}>
            <ModalHeader>
              <Title style={{ fontSize: 17 }}>Create promocode</Title>
            </ModalHeader>
            <ModalBody>
              <FormGrid>
                <Field>
                  Code
                  <FieldInput
                    value={promoForm.code}
                    onChange={(e) =>
                      setPromoForm((prev) => ({ ...prev, code: e.target.value }))
                    }
                    placeholder="JAMM2026"
                  />
                </Field>
                <Field>
                  Duration
                  <FieldInput
                    as="select"
                    value={promoForm.durationInDays}
                    onChange={(e) =>
                      setPromoForm((prev) => ({
                        ...prev,
                        durationInDays: e.target.value,
                      }))
                    }
                  >
                    <option value="30">1 month</option>
                    <option value="90">3 months</option>
                    <option value="180">6 months</option>
                    <option value="365">1 year</option>
                  </FieldInput>
                </Field>
                <Field>
                  Max uses
                  <FieldInput
                    type="number"
                    value={promoForm.maxUses}
                    onChange={(e) =>
                      setPromoForm((prev) => ({ ...prev, maxUses: e.target.value }))
                    }
                    placeholder="Optional"
                  />
                </Field>
                <Field>
                  Valid from
                  <FieldInput
                    type="datetime-local"
                    value={promoForm.validFrom}
                    onChange={(e) =>
                      setPromoForm((prev) => ({ ...prev, validFrom: e.target.value }))
                    }
                  />
                </Field>
                <Field>
                  Valid until
                  <FieldInput
                    type="datetime-local"
                    value={promoForm.validUntil}
                    onChange={(e) =>
                      setPromoForm((prev) => ({ ...prev, validUntil: e.target.value }))
                    }
                  />
                </Field>
              </FormGrid>
            </ModalBody>
            <ModalFooter>
              <ActionButton onClick={() => setPromoOpen(false)}>Cancel</ActionButton>
              <ActionButton $variant="primary" onClick={handleCreatePromo}>
                Create
              </ActionButton>
            </ModalFooter>
          </ModalCard>
        </ModalOverlay>
      ) : null}
    </PanelShell>
  );
}
