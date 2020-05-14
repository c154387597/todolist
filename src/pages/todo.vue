<template>
  <div class="todo">
    <div class="todo-header">
      <h1>ToDoList</h1>
      <div class="todo-header-input">
        <input
          type="text"
          @keyup.enter="addTodo"
          placeholder="添加todo" />
      </div>
    </div>
    <div class="todo-list">
      <Item
        v-for="todo in filterTodos"
        :todo="todo"
        :key="todo.id"
        @del="delTodo"
      ></Item>
      <span v-show="filterTodos.length === 0" class="todo-tip">暂无事项</span>
    </div>
    <Tabs
      :filter="filter"
      @toggle="toggleFilter"
      @clear="clearDoneTodo"
    ></Tabs>
  </div>
</template>

<script>
import Item from './item';
import Tabs from './tabs';

let id = 1;

export default {
  components: {
    Item,
    Tabs
  },
  data () {
    return {
      todos: [],
      filter: 'all'
    }
  },
  created () {
    this.getStorage();
  },
  methods: {
    addTodo (e) {
      this.todos.unshift({
        id: id++,
        content: e.target.value,
        done: !1
      });
      e.target.value = '';
      this.setStorage();
    },
    delTodo (id) {
      this.todos.splice(this.todos.findIndex(todo => id === todo.id), 1);
      this.setStorage();
    },
    clearDoneTodo () {
      this.todos = this.todos.filter(item => item.done === !1);
      this.setStorage();
    },
    toggleFilter (state) {
      this.filter = state;
      this.setStorage();
    },
    getStorage () {
      // const storage = JSON.parse(localStorage.getItem('todo'));
      // if (storage) {
      //   this.todos = storage.list;
      //   this.filter = storage.filter;
      // }
    },
    setStorage () {
      // localStorage.setItem('todo', JSON.stringify({
      //   filter: this.filter,
      //   list: this.todos
      // }));
    }
  },
  computed: {
    filterTodos () {
      if (this.filter === 'all') return this.todos;
      const todoType = this.filter === 'done';
      return this.todos.filter(todo => todo.done === todoType);
    }
  }
}
</script>

<style lang="scss" scoped>
.todo {
  position: relative;
  display: inline-block;
  width: 80%;
  max-width: 600px;
  overflow: hidden;
  font-size: 16px;
  vertical-align: middle;
  background-color: #fff;
  border-radius: 5px;
}
.todo-header {
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 50px;
  background: rgba(47, 47, 47);

  h1 {
    color: #ddd;
  }
}
.todo-header-input {
  flex: 1;
  height: 30px;
  text-align: right;

  input {
    padding: 0 20px;
    width: 80%;
    height: inherit;
    border: 0;
    font-size: 14px;
    border-radius: 5px;
    box-sizing: border-box;

    &:focus {
      outline: none;
    }
  }
}
.todo-list {
  padding: 10px 20px;
  height: 350px;
  overflow-y: auto;
}
.todo-tip {
  line-height: 35px;
  color: #333;
  font-size: 14px;
}
</style>
