import { Button, Typography } from '@mui/material'
import { useStore } from '../store'

export function Start () {
  const fetchQuestions = useStore(state => state.fetchQuestions)

  function handleClick () {
    fetchQuestions(10)
  }

  return (
    <>
      <Typography component="h2" variant='h5' sx={{ margin: '-5px 0 25px 0' }}>Test your JavaScript knowledge!</Typography>
      <Button variant='outlined' color='ochre' size='large' sx={{ width: '65vw', maxWidth: '340px' }} onClick={handleClick}>Start quiz</Button>
    </>
  )
}
