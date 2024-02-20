import { Button, Stack } from '@mui/material'
import { useStore } from '../store'

interface Props {
  correct: number
  incorrect: number
}

export function Footer ({ correct, incorrect }: Props) {
  const reset = useStore(state => state.reset)
  return (
        <>
          <Stack sx={{ margin: '15px 15px 15px 15px' }}>
              🟢 Correct: {correct} • 🔴 Incorrect: {incorrect}
          </Stack>
          <Button variant='outlined' color='ochre' size='large' onClick={() => { reset() }}>Restart</Button>
        </>
  )
}
