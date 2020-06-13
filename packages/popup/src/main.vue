<template>
  <transition :name="transitionName">
    <div
      v-show="value"
      :class="[
        'el-popup',
        'el-popup--'.concat(position)
      ]"
    >
      <slot></slot>
    </div>
  </transition>
</template>

<script type="text/babel">
  import mask from '../../mask';

  export default {
    name: 'ElPopup',
    mixins: [mask],
    props: {
      value: {
        type: Boolean,
        default: false
      },
      transition: String,
      position: {
        type: String,
        default: 'bottom'
      },
      shadeClose: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      transitionName () {
        return this.transition || `el-popup-slide--${this.position}`;
      }
    }
  }
</script>
