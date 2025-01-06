import { useState } from "react"
import { fetcher } from "src/helpers/api";
import { TodoItem } from "src/models/TodoItem";
import { useTodoStore } from "src/states/todo";
import useSWR from "swr";

export default function Todo () {
  const token = useTodoStore(state => state.accessToken);
  const [description, setDescription] = useState("");
  const {data: items, isLoading} = useSWR(['/todo', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }], fetcher<TodoItem>);

  const onDescriptionChange = (e: any) => {
    setDescription(e.target.value)
  }

  const addTodo = () => {

  }

  const renderLoading = () => {
    return <span className="home_title">Loading</span>;
  };

  const renderList = (todoItems?: TodoItem[]) => {
    return !todoItems || todoItems.length === 0 ? 
        <span className="home_title">Nothing to do!</span>
      :
      todoItems.map((item) => 
        <div>
          <span>{item.description}</span>
          <input type="checkbox" />
        </div>
      );
  };

  return <div>
    <div>
      <input className="todo_input" type="text" onChange={onDescriptionChange} value={description} />
      <input className="todo_button" type="button" onClick={addTodo} value={'Add'} />
      <div>
        {isLoading ? renderLoading() : renderList(items)}
      </div>
    </div>
  </div>
}