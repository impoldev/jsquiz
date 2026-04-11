import {
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { useStore } from "../store";
import { CSSProperties, useMemo } from "react";

import SyntaxHighlighter from "react-syntax-highlighter";
import { agate } from "react-syntax-highlighter/dist/esm/styles/hljs";

export function Question() {
  const isDesktop = useMediaQuery("(min-width:500px)");

  const questions = useStore((state) => state.questions);
  const initialQuestion = useStore((state) => state.initialQuestion);

  const evaluateAnswer = useStore((state) => state.evaluateAnswer);
  const handleTouchStart = useStore((state) => state.handleTouchStart);
  const handleTouchMove = useStore((state) => state.handleTouchMove);
  const handleTouchEnd = useStore((state) => state.handleTouchEnd);

  const currentQuestion = useMemo(
    () => questions[initialQuestion],
    [questions, initialQuestion]
  );

  function getBackgroundColor(index: number) {
    const { correctAnswer, selectedAnswer } = currentQuestion;

    if (selectedAnswer == null) return "transparent";
    if (index === correctAnswer) return "green";
    if (index === selectedAnswer && index !== correctAnswer) return "red";

    return "transparent";
  }

  const codeStyle: CSSProperties = useMemo(
    () => ({
      padding: "15px",
      userSelect: "none",
      display: "flex",
      justifyContent: isDesktop ? "center" : "flex-start",
      textAlign: "left" as const,
    }),
    [isDesktop]
  );

  return (
    <Card sx={{ p: 2, maxWidth: "100%" }}>
      <Typography variant="h6" component="h3" sx={{ userSelect: "none" }}>
        {currentQuestion.question}
      </Typography>

      <SyntaxHighlighter language="javascript" style={agate} customStyle={codeStyle}>
        {currentQuestion.code}
      </SyntaxHighlighter>

      <List disablePadding sx={{ bgcolor: "#333" }}>
        {currentQuestion.answers.map((ans, index) => (
          <ListItem key={index} divider disablePadding>
            <ListItemButton
              disabled={currentQuestion.selectedAnswer != null}
              onClick={() => evaluateAnswer(currentQuestion.id, index)}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={() => handleTouchEnd(currentQuestion.id, index)}
              sx={{ backgroundColor: getBackgroundColor(index) }}
            >
              <ListItemText sx={{ textAlign: "center" }}>
                {ans}
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}