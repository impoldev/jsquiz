import { ArrowBackIosNewRounded, ArrowForwardIosRounded } from '@mui/icons-material'
import { useStore } from '../store'
import { Box, IconButton, Stack } from '@mui/material'

export function Arrows () {
  const goPreviousQuestion = useStore(state => state.goPreviousQuestion)
  const goNextQuestion = useStore(state => state.goNextQuestion)
  const initialQuestion = useStore(state => state.initialQuestion)
  const questions = useStore(state => state.questions)

  const currentQuestion = questions[initialQuestion]

  const resultsVisible = useStore(state => state.resultsVisible)
  return (
          <Stack direction='row' sx={{ justifyContent: 'center', margin: '-9px 0 20px 0', alignItems: 'center' }}>
          <IconButton onClick={() => { goPreviousQuestion() }} sx={{ marginRight: '10px' }} disabled={initialQuestion === 0 || !resultsVisible}>
              <ArrowBackIosNewRounded />
          </IconButton>

          <Box sx={{ userSelect: 'none' }}>
              {initialQuestion + 1} / {questions.length}
          </Box>

          <IconButton onClick={() => { goNextQuestion() }} sx={{ marginLeft: '10px' }} disabled={initialQuestion === 9 || currentQuestion.selectedAnswer == null}>
              <ArrowForwardIosRounded />
          </IconButton>
      </Stack>
  )
}
