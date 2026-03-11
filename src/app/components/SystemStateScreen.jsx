import React from "react";
import {
  Card,
  CenteredMessage,
  Description,
  LoadingCard,
  LoadingContent,
  LoadingHint,
  LoadingSpinner,
  LoadingTitle,
  Screen,
  Title,
} from "./SystemStateScreen.styles";

export function SystemStateScreen({ title, description }) {
  return (
    <Screen>
      <Card>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Card>
    </Screen>
  );
}

export function SystemLoadingScreen({ message = "Yuklanmoqda..." }) {
  return (
    <CenteredMessage>
      <LoadingCard>
        <LoadingSpinner />
        <LoadingContent>
          <LoadingTitle>{message}</LoadingTitle>
          <LoadingHint>Tizim tayyorlanmoqda</LoadingHint>
        </LoadingContent>
      </LoadingCard>
    </CenteredMessage>
  );
}
