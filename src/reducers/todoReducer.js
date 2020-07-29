import { CREATE_TODO, UPDATE_TODO, DELETE_TODO, APPEND_TODO } from '../actions';
const todoReducer = (oldState = [], action) => {
  switch (action.type) {
    case CREATE_TODO:
      return [action.payload, ...oldState];
    case UPDATE_TODO:
      return oldState.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            ...action.payload,
          };
        }
        return item;
      });
    case DELETE_TODO:
      return oldState.filter((item) => item.id !== action.payload.id);
    case APPEND_TODO:
      return uniqueMerge(oldState, action.payload);
    default:
      return oldState;
  }
};

function uniqueMerge(source = [], target = []) {
  // if source empty, return target
  if (source.length === 0) return target;

  // if target empty, return source
  if (target.length === 0) return source;

  // get keys from source
  const keys = source.flatMap((item) => (item.key ? [item.key] : []));

  // merge unique items to source and return
  const newItems = target.filter((item) => item.key && !keys.includes(item.key));

  return source.concat(newItems);
}
export default todoReducer;
