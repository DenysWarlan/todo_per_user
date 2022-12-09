export interface Todo extends TodoData {
  id: number | null;
}
export interface ResponseNewTodo {
  id: number;
  todo: Todo;
}

export interface TodoData {
  userId: number;
  title: string | null;
  completed: boolean;
}
