import { Card, List, ListItem, ListItemButton, ListItemText, Typography, useMediaQuery } from '@mui/material'
import { useStore } from '../store'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { agate } from 'react-syntax-highlighter/dist/esm/styles/hljs'

export function Question () {
  const isDesktop = useMediaQuery('(min-width:500px)')
  const questions = useStore(state => state.questions)
  const initialQuestion = useStore(state => state.initialQuestion)
  const currentQuestion = questions[initialQuestion]

  const evaluateAnswer = useStore(state => state.evaluateAnswer)
  const handleTouchStart = useStore(state => state.handleTouchStart)
  const handleTouchMove = useStore(state => state.handleTouchMove)
  const handleTouchEnd = useStore(state => state.handleTouchEnd)

  function getBackgroundColor (index: number) {
    const { correctAnswer, selectedAnswer } = currentQuestion
    if (selectedAnswer == null) return 'transparent'

    if (index === correctAnswer) return 'green'
    if (index !== correctAnswer && index === selectedAnswer) return 'red'
    if (index !== correctAnswer && index !== selectedAnswer) return 'transparent'
  }

  return (
          <Card sx={{ padding: 2, maxWidth: '100%' }}>
          <Typography variant="h6" component="h3" sx={{ userSelect: 'none' }}>
              {currentQuestion.question}
          </Typography>
          <SyntaxHighlighter customStyle={isDesktop ? { padding: '15px', userSelect: 'none', display: 'flex', justifyContent: 'center', textAlign: 'left' } : { padding: '15px', userSelect: 'none', display: 'flex', textAlign: 'left' }} language="javascript" style={agate}>
              {currentQuestion.code}
          </SyntaxHighlighter>
          {currentQuestion.answers.map((ans, index) =>
              <List key={index} disablePadding sx={{ bgcolor: '#333' }}>
                  <ListItem divider disablePadding >
                      <ListItemButton
                      disabled={currentQuestion.selectedAnswer != null}
                      onClick={() => { evaluateAnswer(currentQuestion.id, index) }}
                      onTouchStart={() => { handleTouchStart() }}
                      onTouchMove={() => { handleTouchMove() }}
                      onTouchEnd={() => { handleTouchEnd(currentQuestion.id, index) }}
                      sx={{ backgroundColor: getBackgroundColor(index) }}>
                          <ListItemText sx={{ textAlign: 'center' }}>{ans}</ListItemText>
                      </ListItemButton>
                  </ListItem>
              </List>
          )}
      </Card>
  )
}
