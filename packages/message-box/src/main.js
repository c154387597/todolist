import Vue from 'vue';
import Main from './main.vue';
import merge from '../../utils/merge';
import {isVNode} from '../../utils/vdom';
const MessageBoxConstructor = Vue.extend(Main);

let instance, currentMsg;
let msgQueue = [];
const defaults = {
  title: null,
  message: '',
  type: '',
  customClass: '',
  confirmButtonText: '',
  cancelButtonText: '',
  beforeClose: null,
  closeIconClass: 'icon-close',
  confirmButtonLoading: false,
  dangerouslyUseHTMLString: false
};

const defaultCallback = action => {
  if (currentMsg) {
    let callback = currentMsg.callback;
    if (typeof callback === 'function') {
      callback(action);
    }
    if (currentMsg.resolve) {
      if (action === 'confirm') {
        currentMsg.resolve(action);
      } else if (currentMsg.reject && (action === 'cancel' || action === 'close')) {
        currentMsg.reject(action);
      }
    }
  }
};

const initInstance = () => {
  instance = new MessageBoxConstructor({
    el: document.createElement('div')
  });
  instance.callback = defaultCallback;
};

const showNextMsg = () => {
  if (!instance) {
    initInstance();
  }

  if (!instance.value && msgQueue.length > 0) {
    currentMsg = msgQueue.shift();
    let options = currentMsg.options;
    for (let prop in options) {
      if (options.hasOwnProperty(prop)) {
        instance[prop] = options[prop];
      }
    }
    if (options.callback === undefined) {
      instance.callback = defaultCallback;
    }

    if (isVNode(instance.message)) {
      instance.$slots.default = [instance.message];
      instance.message = null;
    } else {
      delete instance.$slots.default;
    }

    document.body.appendChild(instance.$el);

    Vue.nextTick(() => {
      instance.value = true;
    });
  }
};

const MessageBox = function (options) {
  if (typeof options === 'string' || isVNode(options)) {
    options = {
      message: options
    };
    if (typeof arguments[1] === 'string') {
      options.title = arguments[1];
    }
  }

  if (typeof Promise !== 'undefined') {
    return new Promise((resolve, reject) => {
      msgQueue.push({
        options: merge({}, defaults, options),
        resolve: resolve,
        reject: reject
      });

      showNextMsg();
    })
  } else {
    msgQueue.push({
      options: merge({}, defaults, options)
    });

    showNextMsg();
  }
};

MessageBox.confirm = function (message, title, options) {
  if (typeof message === 'object') {
    options = message;
    title = '';
  } else if (typeof title === 'object') {
    options = title;
    title = '';
  }
  return MessageBox(merge({
    type: 'confirm',
    message: message,
    title: title
  }, options));
};

MessageBox.alert = function (message, title, options) {
  if (typeof message === 'object') {
    options = message;
    title = '';
  } else if (typeof title === 'object') {
    options = title;
    title = '';
  }
  return MessageBox(merge({
    type: 'alert',
    message: message,
    title: title
  }, options));
};

export default MessageBox;
