import { useStore } from '../store'

import { Arrows } from './Arrows'
import { Question } from './Question'
import { Footer } from './Footer'
import { Button, Stack, Typography } from '@mui/material'
import confetti from 'canvas-confetti'

export function Game () {
  const questions = useStore(state => state.questions)
  const reset = useStore(state => state.reset)
  const resultsVisible = useStore(state => state.resultsVisible)
  const showResults = useStore(state => state.showResults)

  let correct = 0
  let incorrect = 0
  let unanswered = 0

  questions.forEach(question => {
    const { selectedAnswer, correctAnswer } = question
    if (selectedAnswer === correctAnswer) correct++
    if (selectedAnswer != null && selectedAnswer !== correctAnswer) incorrect++
    if (selectedAnswer == null) unanswered++
  })
  return (
    <>
        {
            !resultsVisible && unanswered !== 0 && (
                <>
                    <Arrows />
                    <Question />
                </>
            )
        }
        {
            resultsVisible && (
                <>
                <Arrows />
                <Question />
                <Footer
                correct={correct}
                incorrect={incorrect}
                />
            </>
            )
        }
        {
            !resultsVisible && unanswered === 0 && correct >= 7 &&
            (confetti(),
            <>
                <Typography variant='h5' component='h4' sx={{ marginBottom: '20px' }}>
                    Congratulations! You have achieved <strong style={{ color: '#0fd50f' }}>{correct / (correct + incorrect) * 100}%</strong> correct answers.
                </Typography>
                <Stack direction='row' sx= {{ justifyContent: 'center', gap: '2' }}>
                    <Button variant='outlined' color='ochre' size='large' onClick={() => { reset() }}>Restart</Button>
                    <Button variant='outlined' color='ochre' size='large' onClick={() => { showResults() }}>See results</Button>
                </Stack>
            </>)
        }
        {
            !resultsVisible && unanswered === 0 && correct < 7 &&
            <>
                <Typography variant='h5' component='h5' sx={{ marginBottom: '20px' }}>
                    You have only gotten <strong style={{ color: 'red' }}>{correct / (correct + incorrect) * 100}%</strong> correct answers. Do you want to try again?
                </Typography>
                <Stack direction='row' sx={{ justifyContent: 'center', gap: 2 }}>
                    <Button variant='outlined' color='ochre' size='large' onClick={() => { reset() }}>Restart</Button>
                    <Button variant='outlined' color='ochre' size='large' onClick={() => { showResults() }}>See results</Button>
                </Stack>
            </>
        }
    </>
  )
}
