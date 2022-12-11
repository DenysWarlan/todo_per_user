export interface Task extends TaskData {
  id: number | null;
}
export interface ResponseNewTask {
  id: number;
  task: Task;
}

export interface TaskData {
  userId: number;
  title: string | null;
  completed: boolean;
}
