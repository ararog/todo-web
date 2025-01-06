import {create} from 'zustand';
import { TodoItem } from 'src/models/TodoItem';

export interface TodoState {
  accessToken?: string;
  isAuthenticated: boolean;
  todoId: number | null;
  todo?: TodoItem[];
  item?: TodoItem;
  setAccessToken: (token?: string) => void;
  setTodo: (items?: TodoItem[]) => void;
}

// define the store
export const useTodoStore = create<TodoState>(set => ({
  accessToken: undefined,
  isAuthenticated: false,
  todoId: null,
  todo: undefined,
  item: undefined,
  setAccessToken: token => {
    set({accessToken: token, isAuthenticated: token ? true : false });
  },
  setTodo: (items?: TodoItem[]) => {
    set({todo: items});
  },
}));
