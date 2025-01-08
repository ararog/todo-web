import useSWR, {useSWRConfig} from "swr";
import { useActionState } from "react"
import { createItem } from "src/actions/todo";
import { api, fetcher } from "src/helpers/api";
import { TodoItem } from "src/models/TodoItem";
import { TodoItemState } from "src/types/TodoItemState";

export default function Todo () {
  const [state, formAction, pending] = useActionState<TodoItemState, FormData>(createItem, { created: false });
  const {mutate} = useSWRConfig();
  const {data: items, isLoading} = useSWR('/todo', fetcher<TodoItem>);

  const onCompletedClick = async (item?: TodoItem) => {
    await api.put<TodoItem>(`/todo/${item?.id}`, {
      description: item?.description,
      completed: !item?.completed,
      userId: item?.userId
    });

    mutate('/todo')
  }

  const renderLoading = () => {
    return <span className="home_title">Loading...</span>;
  };

  const renderList = (todoItems?: TodoItem[]) => {
    return !todoItems || todoItems.length === 0 ? 
        <span className="home_title">Nothing to do!</span>
      :
      todoItems.map((item: TodoItem) => 
        <div key={item.id} style={{ display: "flex", flexDirection: 'row' }}>
          <input type="checkbox" id={`completed_${item.id}`} checked={item.completed} onClick={() => onCompletedClick(item)} />
          <div style={{display: 'flex', alignItems: 'center', width: '400px', margin: '4px', height: '30px' }}>
            <label htmlFor={`completed_${item.id}`} className="todo_item_description">{item.description}</label>
          </div>
        </div>
      );
  };

  return <div>
    <div>
      <form action={formAction}>
        <input className="todo_input" type="text" name="description" />
        <input className="todo_button" type="submit" disabled={pending} value={pending ? 'Adding...' : 'Add'} />
      </form>
      <div>
        {isLoading ? renderLoading() : renderList(items)}
      </div>
    </div>
  </div>
}