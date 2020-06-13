import Vue from 'vue';
import {addClass, removeClass, addEvent, removeEvent} from '../utils/dom';

let zIndex;
let idSeed = 1;
let instances = [];
let hasZIndex = false;

function getModal (id, zIndex) {
  let maskDom = null;
  const modalStack = maskManage.modalStack;

  for (let i = 0, j = modalStack.length; i < j; i++) {
    if (modalStack[i].id === id) {
      maskDom = modalStack[i].dom;
      break;
    }
  }

  if (!maskDom) {
    maskDom = document.createElement('div');
    addClass(maskDom, 'el-mask');
    addEvent(maskDom, 'click', maskManage.doOnModalClick);
    maskManage.modalStack.push({id: id, zIndex: zIndex, dom: maskDom});
  }

  return maskDom;
}

const maskManage = {
  getInstance: function (id) {
    return instances[id];
  },
  register: function (id, instance) {
    if (id && instance) {
      instances[id] = instance;
    }
  },
  deregister: function (id) {
    if (id) {
      instances[id] = null;
      delete instances[id];
    }
  },
  modalStack: [],
  doOnModalClick: function () {
    const topItem = maskManage.modalStack[maskManage.modalStack.length - 1];
    if (!topItem) return;
    const instance = maskManage.getInstance(topItem.id);
    if (instance && instance.shadeClose) {
      instance.$emit('input', false);
    }
  },
  closeModal: function (id) {
    const maskDom = getModal(id);
    const modalStack = this.modalStack;
    if (modalStack.length > 0) {
      const topItem = modalStack[modalStack.length - 1];
      if (topItem.id === id) {
        addClass(maskDom, 'el-mask-leave');
        this.modalStack.pop();

        setTimeout(() => {
          maskDom.parentNode.removeChild(maskDom);
          removeClass(maskDom, 'el-mask-leave');
          removeEvent(maskDom, 'click', maskManage.doOnModalClick);
        }, 300)
      }
    }
  },
  nextZIndex: function () {
    return maskManage.zIndex++;
  },
  openModal: function (id, zIndex, dom) {
    if (!id || zIndex === undefined) return;

    let maskDom = getModal(id, zIndex);

    dom.parentNode.appendChild(maskDom);
    if (zIndex) {
      maskDom.style.zIndex = zIndex;
    }
  }
};

Object.defineProperty(maskManage, 'zIndex', {
  configurable: true,
  get () {
    if (!hasZIndex) {
      zIndex = 2000;
      hasZIndex = true;
    }
    return zIndex;
  },
  set (val) {
    zIndex = val;
  }
});

export default {
  props: {
    value: Boolean,
    zIndex: {}
  },
  beforeMount () {
    this._maskId = 'mask-' + idSeed++;
    maskManage.register(this._maskId, this);
  },
  beforeDestroy () {
    maskManage.deregister(this._maskId);
  },
  data () {
    return {
      opened: false
    }
  },
  watch: {
    value (val) {
      const type = val ? 'open' : 'close';
      this[type]();
    }
  },
  methods: {
    open () {
      if (this.opened) return;

      const dom = this.$el;

      maskManage.openModal(this._maskId, maskManage.nextZIndex(), dom);
      dom.style.zIndex = maskManage.nextZIndex();

      this.opened = true;
    },
    close () {
      this.opened = false;
      maskManage.closeModal(this._maskId);
      this.$emit('input', false);
    }
  }
}
