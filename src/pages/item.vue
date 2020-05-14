<template>
  <div
    :class="[
      'todo-list-item',
      todo.done ? 'donelist' : 'todolist'
    ]"
  >
      <input
        class="toggle"
        type="checkbox"
        v-model="todo.done"
      >
      <label>{{todo.content}}</label>
      <button class="delete" @click="delTodo"></button>
  </div>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  methods: {
    delTodo () {
      this.$emit('del', this.todo.id);
    }
  }
}
</script>

<style lang="scss" scoped>
.todo-list-item {
  display: flex;
  text-align: left;
  align-items: center;
  height: 35px;

  &::before {
    content: '';
    margin-right: 10px;
    width: 5px;
    height: 70%;
    border-radius: 5px;
  }
  &.todolist::before {
    background: #629A9C;
  }
  &.donelist::before {
    background: #999;
  }
  label {
    flex: 1;
    padding: 0 20px;
  }
  .delete {
    position: relative;
    width: 20px;
    height: 20px;
    border: 0;
    font-size: 14px;
    cursor: pointer;
    background-color: rgb(180, 29, 29);
    border-radius: 50%;

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 40%;
      height: 1px;
      background-color: #fff;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
