<template>
  <div class="wrapper">
    <router-view />
  </div>
</template>

<script>
import Todo from './pages/todo.vue';

export default {
  components: {
    Todo
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  background-color: #ddd;

  &::after {
    content: '';
    display: inline-block;
    height: 100%;
    width: 0;
    vertical-align: middle;
  }
}
</style>
