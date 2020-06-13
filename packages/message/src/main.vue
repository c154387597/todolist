<template>
  <transition name="el-message-fade" @after-leave="handleAfterLeave">
    <div
      :class="[
        'el-message',
        customClass
      ]"
      v-show="visible"
    >
      <i v-if="iconClass" :class="iconClass"></i>
      <i v-if="type !== 'info'" :class="typeClass"></i>
      <slot>
        <p class="el-message__content">{{message}}</p>
      </slot>
    </div>
  </transition>
</template>

<script type="text/babel">
  const typeMap = {
    success: 'success',
    error: 'error',
    tip: 'tip'
  };

  export default {
    data () {
      return {
        visible: false,
        message: '',
        duration: 3000,
        type: 'info',
        customClass : '',
        iconClass: '',
        closed: false,
        timer: null
      }
    },
    watch: {
      closed (newVal) {
        newVal && (this.visible = false);
      }
    },
    computed: {
      typeClass () {
        return this.type && !this.iconClass
        ? `el-message__icon icon-${typeMap[this.type]}`
        : '';
      }
    },
    methods: {
      handleAfterLeave () {
        this.$destroy();
        this.$el.parentNode.removeChild(this.$el);
      },
      close () {
        this.closed = true;
      },
      startTimer () {
        if (this.duration > 0) {
          this.timer = setTimeout(() => {
            (!this.closed) && this.close();
          }, this.duration)
        }
      }
    },
    mounted () {
      this.startTimer();
    }
  }
</script>
