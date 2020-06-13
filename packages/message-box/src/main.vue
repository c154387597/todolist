<template>
  <transition name="el-msgbox-fade">
    <div v-show="value" class="el-msgbox__wrapper">
      <div
        :class="[
          'el-msgbox',
          customClass
        ]"
      >
        <i
          v-if="type === 'alert'"
          :class="[
            'el-msgbox__close',
            closeIconClass
          ]"
          @click="handleAction('close')"
        ></i>
        <div v-show="title" class="el-msgbox__header">{{title}}</div>
        <div class="el-msgbox__content">
          <div :class="[
            'el-msgbox__message',
            title && 'el-msgbox__message--has-title'
          ]">
            <slot>
              <div v-if="!dangerouslyUseHTMLString">{{message}}</div>
              <p v-else v-html="message"></p>
            </slot>
          </div>
        </div>
        <div v-if="type === 'confirm'" class="el-msgbox__footer el-hairline-top">
          <button
            v-show="cancelButtonText"
            class="el-button el-msgbox__cancel"
            @click="handleAction('cancel')"
          >
            <span class="el-button__text">{{cancelButtonText}}</span>
          </button>
          <button
            class="el-button el-msgbox__confirm el-hairline-left"
            @click="handleAction('confirm')"
          >
            <span v-if="!confirmButtonLoading" class="el-button__text">{{confirmButtonText}}</span>
            <i v-else class="el-msgbox__loading">
              <svg viewBox="25 25 50 50" class="el-loading__circular">
                <circle cx="50" cy="50" r="20" fill="none"></circle>
              </svg>
            </i>
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
  import mask from '../../mask';

  export default {
    mixins: [mask],
    data () {
      return {
        action: '',
        type: '',
        customClass : '',
        title: null,
        message: '',
        closeIconClass: '',
        confirmButtonText: '',
        cancelButtonText: '',
        confirmButtonLoading: false,
        dangerouslyUseHTMLString: false
      }
    },
    methods: {
      doClose () {
        if (!this.value) return;
        this.value = false;
        if (this.action) this.callback(this.action, this);
      },
      handleAction(action) {
        this.action = action;
        if (typeof this.beforeClose === 'function') {
          this.beforeClose(action, this, this.doClose);
        } else {
          this.doClose();
        }
      }
    }
  }
</script>
