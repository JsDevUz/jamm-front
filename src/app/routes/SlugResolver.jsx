import React, { Suspense, lazy } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useChats } from "../../contexts/ChatsContext";
import {
  SystemInlineLoadingScreen,
  SystemLoadingScreen,
} from "../components/SystemStateScreen";
const AppWrapper = lazy(() => import("./AppWrapper"));

const knownRoutes = [
  "feed",
  "articles",
  "chats",
  "users",
  "groups",
  "courses",
  "my-courses",
  "arena",
  "profile",
  "admin",
  "login",
  "register",
  "join",
];

export default function SlugResolver() {
  const { nav, chatId } = useParams();
  const navigate = useNavigate();
  const { resolveChatSlug } = useChats();
  const [isResolving, setIsResolving] = React.useState(false);

  React.useEffect(() => {
    let slugToResolve;

    if (!nav && chatId) {
      slugToResolve = chatId;
    } else if (nav?.startsWith("+")) {
      navigate(`/my-courses/${nav}`, { replace: true });
      return;
    } else if (nav?.startsWith(":")) {
      navigate(`/articles/${nav}`, { replace: true });
      return;
    } else if (nav?.startsWith("-")) {
      slugToResolve = nav;
    } else if (nav && !knownRoutes.includes(nav) && nav !== "a") {
      slugToResolve = nav;
    } else {
      return;
    }

    setIsResolving(true);

    resolveChatSlug(slugToResolve)
      .then((response) => {
        if (response?.jammId) {
          const target =
            response.type === "group" || response.isGroup
              ? `/groups/${response.jammId}`
              : `/users/${response.jammId}`;
          navigate(target, { replace: true });
          return;
        }

        navigate("/chats", { replace: true });
        setIsResolving(false);
      })
      .catch(() => {
        navigate("/chats", { replace: true });
        setIsResolving(false);
      });
  }, [chatId, nav, navigate, resolveChatSlug]);

  if (isResolving) {
    return <SystemLoadingScreen />;
  }

  return (
    <Suspense fallback={<SystemInlineLoadingScreen />}>
      <AppWrapper />
    </Suspense>
  );
}
