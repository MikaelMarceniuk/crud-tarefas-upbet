import CreateTaskDialog from './components/createTaskDialog'
import useSWR from 'swr'
import axiosClient from './lib/axios'
import TaskItem from './components/taskItem'
import UpdateTaskDialog from './components/updateTaskDialog'
import Task from './@types/Task'

function App() {
  const { data } = useSWR('tasks', async () => {
    const { data } = await axiosClient.get<Task[]>('/tasks')
    return data
  })

  return (
    <div className="max-w-96 h-dvh m-auto">
      <div className="flex items-center justify-between pt-8">
        <h1 className="text-center text-2xl font-semibold ">Minhas Tarefas</h1>
        <CreateTaskDialog />
      </div>

      <ul className="pt-8 space-y-4">
        {data?.map((t) => (
          <TaskItem
            key={t.id}
            task={t}
          />
        ))}
      </ul>
      <UpdateTaskDialog />
    </div>
  )
}

export default App
