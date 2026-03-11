import React, { Suspense, lazy } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useChats } from "../../contexts/ChatsContext";
const AppWrapper = lazy(() => import("./AppWrapper"));

const knownRoutes = [
  "feed",
  "blogs",
  "chats",
  "users",
  "groups",
  "courses",
  "arena",
  "meets",
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
      navigate(`/courses/${nav}`, { replace: true });
      return;
    } else if (nav?.startsWith(":")) {
      navigate(`/blogs/${nav}`, { replace: true });
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
    return null;
  }

  return (
    <Suspense fallback={null}>
      <AppWrapper />
    </Suspense>
  );
}
