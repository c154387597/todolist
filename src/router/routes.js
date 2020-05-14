export default [
  {
    path: '/',
    name: 'todo',
    meta: {
      title: 'todolist'
    },
    component: () => import(/* webpackChunkName: "todo" */ '../pages/todo.vue'),
  }
]
