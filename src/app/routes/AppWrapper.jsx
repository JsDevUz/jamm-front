import React, { Suspense, lazy } from "react";
import { useParams } from "react-router-dom";
import { SystemInlineLoadingScreen } from "../components/SystemStateScreen";

const JammLayout = lazy(() => import("../../components/JammLayout"));

export default function AppWrapper({ forcedNav }) {
  const { nav, chatId, resourceId, lessonId } = useParams();

  return (
    <Suspense fallback={<SystemInlineLoadingScreen />}>
      <JammLayout
        initialNav={forcedNav || nav || "feed"}
        initialResourceId={chatId || resourceId || "0"}
        initialLesson={lessonId}
      />
    </Suspense>
  );
}
