import { Task } from '@app/users/models/task';

export const TASK_MOCK: Task = {
  userId: 1,
  id: 1,
  title: 'delectus aut autem',
  completed: false,
};
export const NEW_TASK_MOCK: Task = {
  userId: 1,
  id: 0,
  title: 'New Task',
  completed: false,
};

export const TASKS_MOCK: Task[] = [TASK_MOCK];
