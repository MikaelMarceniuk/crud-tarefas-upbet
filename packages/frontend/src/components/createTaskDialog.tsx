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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import axiosClient from '@/lib/axios'
import { mutate } from 'swr'

const formSchema = z.object({
  name: z.string().min(3),
})

type FormType = z.infer<typeof formSchema>

const CreateTaskDialog: React.FC = () => {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  const handleOnSubmit = form.handleSubmit(async ({ name }) => {
    await axiosClient.post('/tasks', { name })
    form.setValue('name', '')
    mutate('tasks')
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar nova tarefa</DialogTitle>
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
            <Button className="w-full">Criar novo</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateTaskDialog
