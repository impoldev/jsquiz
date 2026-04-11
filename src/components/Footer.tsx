import { Button, Stack, Typography } from "@mui/material";
import { useStore } from "../store";

interface Props {
  correct: number;
  incorrect: number;
}

export function Footer({ correct, incorrect }: Props) {
  const reset = useStore((state) => state.reset);

  return (
    <Stack spacing={2} sx={{ m: 2 }}>
      <Typography>
        🟢 Correct: {correct} • 🔴 Incorrect: {incorrect}
      </Typography>

      <Button
        variant="outlined"
        color="ochre"
        size="large"
        onClick={reset}
      >
        Restart
      </Button>
    </Stack>
  );
}