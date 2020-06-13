import Vue from 'vue';
import Main from './main.vue';
const MessageConstructor = Vue.extend(Main);

let instance;
let instances = [];
let seed = 1;

const Message = function (options) {
  options = options || {};
  if (typeof options === 'string') {
    options = {
      message: options
    };
  }

  if (instances.length > 0) {
    messageClose();
  }

  let id = 'message_' + seed++;
  instance = new MessageConstructor({
    data: options
  });
  instance.id = id;
  instance.$mount();
  document.body.appendChild(instance.$el);
  instance.visible = true;
  instances.push(instance);
  return instance;
}

function messageClose () {
  let len = instances.length;
  for (let i = 0; i < len; i++) {
    instances[i] && (
      instances[i].closed = true,
      instances.splice(i, 1)
    );
  }
}

export default Message;
