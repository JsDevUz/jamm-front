function getEntityId(value) {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value._id || value.id || value.userId || "";
}

export function getCourseMemberStatus(course, userId) {
  if (!course || !userId) return "none";

  if (String(getEntityId(course.createdBy)) === String(userId)) {
    return "owner";
  }

  const member = Array.isArray(course.members)
    ? course.members.find(
        (item) =>
          String(getEntityId(item?.userId || item)) === String(userId),
      )
    : null;

  return member?.status || "none";
}

export function getCourseNavigationPath(course, userId, lessonSlug = "") {
  const courseSlug = course?.urlSlug || course?._id || course?.id;
  if (!courseSlug) return "/courses";

  const memberStatus = getCourseMemberStatus(course, userId);
  const canOpenWorkspace =
    memberStatus === "owner" || memberStatus === "approved";
  const basePath = canOpenWorkspace
    ? `/my-courses/${courseSlug}`
    : `/courses/${courseSlug}`;

  if (lessonSlug && canOpenWorkspace) {
    return `${basePath}/${lessonSlug}`;
  }

  return basePath;
}
