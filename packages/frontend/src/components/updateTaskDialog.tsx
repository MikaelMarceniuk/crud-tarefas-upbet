import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import { Button } from './ui/button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { useSearchParams } from 'react-router-dom'
import useSWR, { mutate } from 'swr'
import axiosClient from '@/lib/axios'
import Task from '@/@types/Task'
import { useEffect } from 'react'

const formSchema = z.object({
  name: z.string().min(3),
})

type FormType = z.infer<typeof formSchema>

const UpdateTaskDialog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  const closeModal = () => {
    const newUrl = new URLSearchParams(searchParams.toString())
    newUrl.delete('task_id')

    setSearchParams(newUrl.toString())
  }

  const handleOnOpen = (isOpen: boolean) => {
    if (!isOpen) {
      closeModal()
    }
  }

  const taskId = searchParams.get('task_id')
  const isOpen = Boolean(taskId)

  const { data } = useSWR(isOpen ? ['task', taskId] : null, async () => {
    const { data } = await axiosClient.get<Task>(`/tasks/${taskId}`)
    return data
  })

  const handleOnSubmit = form.handleSubmit(async ({ name }) => {
    await axiosClient.patch(`/tasks/${taskId}`, { name })
    mutate('tasks')
    closeModal()
  })

  useEffect(() => {
    if (data) {
      form.setValue('name', data.name)
      return
    }

    form.setValue('name', '')
  }, [data])

  return (
    <Dialog
      open={isOpen}
      onOpenChange={handleOnOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Atualizar tarefa</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={handleOnSubmit}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full">Atualizar</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateTaskDialog
