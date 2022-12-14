import { HandPalm, Play } from 'phosphor-react'
// import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountDownButton,
  StopCountDownButton,
  TaskInput,
} from './styles'
import { useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'
 
const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a Tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O Intervalo precisa ser de no maximo 60 minutos.'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

// Controlled / uncontrolled

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export function Home() {

  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null >(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { register, handleSubmit, watch } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let interval: number

    if(activeCycle) {
      interval = setInterval(() => {

        const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate) 

        if(secondsDifference >= totalSeconds) {
          setCycles(cycles.map(cycle => {
            if (cycle.id === activeCycleId){
              return {...cycle, interruptedDate: new Date()}
            } else {
              return cycle
            }
          }))

          setAmountSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setAmountSecondsPassed(secondsDifference)
        }

      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  },[activeCycle, totalSeconds])

  function handleCreateNewCycle(data: any) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }

    setCycles((state) => [...cycles, newCycle])
    setActiveCycleId(newCycle.id)
    setAmountSecondsPassed(0)

  }

  function handleInterruptCycle() {
    setActiveCycleId(null)
    setCycles(cycles.map(cycle => {
      if (cycle.id === activeCycleId){
        return {...cycle, interruptedDate: new Date()}
      } else {
        return cycle
      }
    }))
  }

  
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  const task = watch('task')
  const isSubmitDisabled = !task

  useEffect(() => {
    if(activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  },[minutes, seconds, activeCycle])

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestions"
            id="task"
            type="text"
            disabled={!!activeCycle}
            {...register('task')}
          />
          <datalist id="task-suggestions">
            <option value="projeto 11" />
            <option value="projeto 2" />
            <option value="projeto 3" />
            <option value="projeto 4" />
          </datalist>
          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            placeholder="00"
            id="minutesAmount"
            type="number"
            step={1}
            disabled={!!activeCycle}
            {...register('minutesAmount', { valueAsNumber: true })}
          />
          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        {activeCycle ? (    
          <StopCountDownButton onClick={handleInterruptCycle} type="button">
            <HandPalm />
          </StopCountDownButton> 
          ): 
          <StartCountDownButton disabled={isSubmitDisabled} type="submit">
            <Play />
          </StartCountDownButton>
        }

      </form>
    </HomeContainer>
  )
}
