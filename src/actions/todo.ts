'use server'

import { TodoItemState } from 'src/types/TodoItemState';
import { api } from '../helpers/api'; 
 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createItem(prevState: TodoItemState,formData: FormData) {
  const response = await api.post<any>('/todo', 
    { 
      description: formData.get('description')
    }
  );

  // Handle response if necessary
  if(response.status === 200) {
    return { created: true }
  }

  return prevState
}