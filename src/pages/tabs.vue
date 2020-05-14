<template>
  <ul class="todo-toolbar">
    <li :class="filter === 'all' && 'on'">
      <button @click="toggleFilter('all')">全部</button>
    </li>
    <li :class="filter === 'action' && 'on'">
      <button @click="toggleFilter('action')">待完成</button>
    </li>
    <li :class="filter === 'done' && 'on'">
      <button @click="toggleFilter('done')">已完成</button>
    </li>
    <li>
      <button @click="$emit('clear')">清除已完成</button>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    filter: {
      type: String,
      required: true
    }
  },
  methods: {
    toggleFilter (state) {
      if (this.filter === state) return;
      this.$emit('toggle', state);
    }
  }
}
</script>

<style lang="scss" scoped>
.todo-toolbar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 20px 10px;

  li {
    margin-right: 20px;

    &:last-child {
      margin: 0;

      button {
        border: 0;
        color: #629A9C;
      }
    }
    &.on button {
      color: #fff;
      background-color: #2f2f2f;
    }
    button {
      padding: 5px 10px;
      border-radius: 5px;
      cursor: pointer;
      border: 1px solid #ececec;
      transition: all linear .2s;
      box-sizing: border-box;
      background-color: transparent;

      &:focus {
        outline: none;
      }
      &:hover {
        box-shadow: 0 0 4px rgba(0, 0, 0, .3);
      }
    }
  }
  @media screen and (max-width: 760px) {
    padding: 0 10px 10px;

    li {
      margin-right: 10px;
    }
  }
}
</style>
