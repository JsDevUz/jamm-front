import React, { createContext, useContext } from "react";

const CoursePlayerContext = createContext(null);

export const CoursePlayerProvider = ({ value, children }) => (
  <CoursePlayerContext.Provider value={value}>
    {children}
  </CoursePlayerContext.Provider>
);

export const useCoursePlayerContext = () => {
  const context = useContext(CoursePlayerContext);

  if (!context) {
    throw new Error("useCoursePlayerContext must be used inside CoursePlayerProvider");
  }

  return context;
};

