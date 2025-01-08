import {create} from 'zustand';
import { TodoItem } from 'src/models/TodoItem';

export interface TodoState {
  accessToken?: string;
  isAuthenticated: boolean;
  todoId: number | null;
  todo?: TodoItem[];
  item?: TodoItem;
  setAuthenticated: (flag: boolean) => void;
  setTodo: (items?: TodoItem[]) => void;
}

// define the store
export const useTodoStore = create<TodoState>(set => ({
  accessToken: undefined,
  isAuthenticated: false,
  todoId: null,
  todo: undefined,
  item: undefined,
  setAuthenticated: (flag: boolean) => {
    set({isAuthenticated: flag });
  },
  setTodo: (items?: TodoItem[]) => {
    set({todo: items});
  },
}));
