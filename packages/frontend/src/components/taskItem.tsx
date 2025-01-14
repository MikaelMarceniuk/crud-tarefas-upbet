import { EllipsisVertical } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useSearchParams } from 'react-router-dom'
import axiosClient from '@/lib/axios'
import { cn } from '@/lib/utils'
import Task from '@/@types/Task'
import { mutate } from 'swr'

type TaskItemProps = {
  task: Task
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const handleOnUpdate = () => {
    const newUrl = new URLSearchParams(searchParams.toString())
    newUrl.set('task_id', task.id)

    setSearchParams(newUrl.toString())
  }

  const handleOnDelete = async () => {
    await axiosClient.delete(`/tasks/${task.id}`)
    mutate('tasks')
  }

  const handleOnCheck = async () => {
    await axiosClient.put(`/tasks/${task.id}`)
    mutate('tasks')
  }

  return (
    <div className="border rounded p-4 flex">
      <span className={cn('flex-1', task.isDone ? 'line-through' : '')}>
        {task.name}
      </span>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {!task.isDone && (
            <DropdownMenuItem onClick={handleOnUpdate}>
              Atualizar
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={handleOnDelete}>Deletar</DropdownMenuItem>
          {!task.isDone && (
            <DropdownMenuItem onClick={handleOnCheck}>
              Marcar como feito
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default TaskItem
