import './App.css'
import { Typography, Container, Link } from '@mui/material'
import { JavascriptLogo } from './components/JavascriptLogo'
import { Start } from './components/Start'
import { useStore } from './store'
import { Game } from './components/Game'

function App () {
  const questions = useStore(state => state.questions)

  return (
    <>
    <Container maxWidth="sm">
        <Typography variant="h2" component="h1" alignItems="center" gap='10px' justifyContent='center' marginBottom={2.5} sx={{ userSelect: 'none' }}><JavascriptLogo /> Quiz</Typography>
        {questions.length === 0 && <Start />}
        {questions.length > 0 && <Game />}
        <Typography marginTop={5}>Developed with ❤️ by <Link color='#f7df1e' href="https://github.com/impoldev">Pablo Ollé</Link> in 2024</Typography>
    </Container>
    </>
  )
}

export default App
