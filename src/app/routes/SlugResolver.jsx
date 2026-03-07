import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useChats } from "../../contexts/ChatsContext";
import { SystemLoadingScreen } from "../components/SystemStateScreen";
import AppWrapper from "./AppWrapper";

const knownRoutes = [
  "home",
  "feed",
  "blogs",
  "chats",
  "users",
  "groups",
  "courses",
  "arena",
  "meets",
  "profile",
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

        navigate("/home", { replace: true });
        setIsResolving(false);
      })
      .catch(() => {
        navigate("/home", { replace: true });
        setIsResolving(false);
      });
  }, [chatId, nav, navigate, resolveChatSlug]);

  if (isResolving) {
    return <SystemLoadingScreen />;
  }

  return <AppWrapper />;
}
