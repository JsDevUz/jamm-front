import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { Search, Filter, Star, Clock, User, ChevronDown } from "lucide-react";
import { useCourses } from "../contexts/CoursesContext";

const DashboardContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: var(--background-color);
  height: 100vh;
  overflow-y: auto;
`;

const Header = styled.div`
  padding: 32px;
  background-color: var(--tertiary-color);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: var(--text-color);
  margin: 0;
`;

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 14px 20px 14px 48px;
  border-radius: 8px;
  border: none;
  background-color: var(--background-color);
  color: var(--text-color);
  font-size: 16px;
  transition: box-shadow 0.2s;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--primary-color);
  }

  &::placeholder {
    color: var(--text-muted-color);
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted-color);
`;

const FiltersContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  width: 100%;
  max-width: 800px;
`;

const FilterChip = styled.button`
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid
    ${(props) =>
      props.active ? "var(--primary-color)" : "var(--border-color)"};
  background-color: ${(props) =>
    props.active ? "var(--primary-color)" : "transparent"};
  color: ${(props) => (props.active ? "white" : "var(--text-color)")};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.active ? "var(--primary-color)" : "var(--hover-color)"};
  }
`;

const SortDropdown = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-muted-color);
  font-size: 14px;
  cursor: pointer;
`;

const ContentArea = styled.div`
  padding: 32px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`;

const CourseCard = styled.div`
  background-color: var(--tertiary-color);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--border-color);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    border-color: var(--primary-color);
  }
`;

const CardImage = styled.div`
  height: 160px;
  background: ${(props) => props.gradient || "var(--primary-color)"};
  position: relative;
`;

const CategoryBadge = styled.span`
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  backdrop-filter: blur(4px);
`;

const CardContent = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
  margin: 0 0 8px 0;
  line-height: 1.4;
`;

const CardAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 13px;
  color: var(--text-muted-color);
`;

const CardFooter = styled.div`
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
  border-top: 1px solid var(--border-color);
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #fbbf24;
  font-weight: 600;
  font-size: 13px;
`;

const Price = styled.div`
  font-weight: 700;
  color: ${(props) =>
    props.free ? "var(--success-color)" : "var(--text-color)"};
  font-size: 14px;
`;

const CoursesDashboard = ({ onNavigateToCourse }) => {
  const { courses } = useCourses();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular"); // popular, newest, price_asc, price_desc

  const categories = [
    { id: "all", label: "Barchasi" },
    { id: "IT", label: "IT & Dasturlash" },
    { id: "SMM", label: "SMM & Marketing" },
    { id: "Til o'rganish", label: "Til o'rganish" },
    { id: "Mobile", label: "Mobil dasturlash" },
    { id: "Dizayn", label: "Dizayn" },
  ];

  const filteredCourses = useMemo(() => {
    let result = [...courses];

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter((course) => course.category === selectedCategory);
    }

    // Filter by search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (course) =>
          course.name.toLowerCase().includes(q) ||
          course.description.toLowerCase().includes(q),
      );
    }

    // Sort
    if (sortBy === "popular") {
      result.sort((a, b) => b.rating - a.rating); // Sort by rating
    } else if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "price_asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price_desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [courses, searchQuery, selectedCategory, sortBy]);

  const formatPrice = (price) => {
    if (price === 0) return "Bepul";
    return new Intl.NumberFormat("uz-UZ").format(price) + " UZS";
  };

  const isDefaultView =
    !searchQuery && selectedCategory === "all" && sortBy === "popular";

  const CourseSection = ({ title, courses }) => {
    if (!courses || courses.length === 0) return null;
    return (
      <div style={{ marginBottom: 40 }}>
        <SectionTitle>{title}</SectionTitle>
        <Grid>
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              onClick={() => onNavigateToCourse(course.id)}
            >
              <CardImage gradient={course.gradient}>
                <CategoryBadge>{course.category || "General"}</CategoryBadge>
              </CardImage>
              <CardContent>
                <CardTitle>{course.name}</CardTitle>
                <CardAuthor>
                  <User size={14} />
                  {course.createdBy === "user-1"
                    ? "Sardor Alimov"
                    : course.createdBy === "user-2"
                      ? "Jasur Karimov"
                      : "Malika Rahimova"}
                </CardAuthor>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--text-muted-color)",
                    margin: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {course.description}
                </p>
                <CardFooter>
                  <Rating>
                    <Star size={14} fill="#fbbf24" stroke="#fbbf24" />
                    {course.rating || 4.5}
                  </Rating>
                  <Price free={course.price === 0}>
                    {formatPrice(course.price || 0)}
                  </Price>
                </CardFooter>
              </CardContent>
            </CourseCard>
          ))}
        </Grid>
      </div>
    );
  };

  return (
    <DashboardContainer>
      <Header>
        <Title>Kurslar Dashboardi</Title>
        <SearchWrapper>
          <SearchIcon size={20} />
          <SearchInput
            placeholder="Kurslarni qidiring..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchWrapper>
        <FiltersContainer>
          {categories.map((cat) => (
            <FilterChip
              key={cat.id}
              active={selectedCategory === cat.id}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </FilterChip>
          ))}
        </FiltersContainer>
      </Header>

      <ContentArea>
        {isDefaultView ? (
          <>
            <CourseSection
              title="Top Kurslar 🔥"
              courses={[...courses]
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 3)}
            />
            <CourseSection
              title="Yangi qo'shilganlar 🆕"
              courses={[...courses]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 3)}
            />
            <CourseSection
              title="Arzon kurslar 🏷️"
              courses={[...courses]
                .sort((a, b) => a.price - b.price)
                .slice(0, 3)}
            />
            <CourseSection
              title="IT & Dasturlash 💻"
              courses={courses.filter((c) => c.category === "IT")}
            />
            <CourseSection
              title="SMM & Marketing 📱"
              courses={courses.filter((c) => c.category === "SMM")}
            />
            <CourseSection
              title="Til o'rganish 🌍"
              courses={courses.filter((c) => c.category === "Til o'rganish")}
            />
            <CourseSection
              title="Mobil Dasturlash 📱"
              courses={courses.filter((c) => c.category === "Mobile")}
            />
          </>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <SectionTitle>
                {selectedCategory === "all"
                  ? "Qidiruv natijalari"
                  : categories.find((c) => c.id === selectedCategory)?.label}
              </SectionTitle>
              <select
                style={{
                  background: "var(--tertiary-color)",
                  color: "var(--text-color)",
                  border: "1px solid var(--border-color)",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  outline: "none",
                }}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popular">Ommabop</option>
                <option value="newest">Yangi qo'shilgan</option>
                <option value="price_asc">Arzonroq</option>
                <option value="price_desc">Qimmatroq</option>
              </select>
            </div>

            {filteredCourses.length > 0 ? (
              <Grid>
                {filteredCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    onClick={() => onNavigateToCourse(course.id)}
                  >
                    <CardImage gradient={course.gradient}>
                      <CategoryBadge>
                        {course.category || "General"}
                      </CategoryBadge>
                    </CardImage>
                    <CardContent>
                      <CardTitle>{course.name}</CardTitle>
                      <CardAuthor>
                        <User size={14} />
                        {course.createdBy === "user-1"
                          ? "Sardor Alimov"
                          : course.createdBy === "user-2"
                            ? "Jasur Karimov"
                            : "Malika Rahimova"}
                      </CardAuthor>
                      <p
                        style={{
                          fontSize: 13,
                          color: "var(--text-muted-color)",
                          margin: 0,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {course.description}
                      </p>
                      <CardFooter>
                        <Rating>
                          <Star size={14} fill="#fbbf24" stroke="#fbbf24" />
                          {course.rating || 4.5}
                        </Rating>
                        <Price free={course.price === 0}>
                          {formatPrice(course.price || 0)}
                        </Price>
                      </CardFooter>
                    </CardContent>
                  </CourseCard>
                ))}
              </Grid>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px",
                  color: "var(--text-muted-color)",
                }}
              >
                Hech qanday kurs topilmadi
              </div>
            )}
          </>
        )}
      </ContentArea>
    </DashboardContainer>
  );
};

export default CoursesDashboard;
