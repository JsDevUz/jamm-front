import React from "react";
import {
  Card,
  CenteredMessage,
  Description,
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
  return <CenteredMessage>{message}</CenteredMessage>;
}
