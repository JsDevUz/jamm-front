import React from "react";
import { useParams } from "react-router-dom";
import JammLayout from "../../components/JammLayout";

export default function AppWrapper({ forcedNav }) {
  const { nav, chatId, resourceId, lessonId } = useParams();

  return (
    <JammLayout
      initialNav={forcedNav || nav || "feed"}
      initialResourceId={chatId || resourceId || "0"}
      initialLesson={lessonId}
    />
  );
}
