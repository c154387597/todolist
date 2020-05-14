# 移动端组件库

## 技术栈

 - vue
 - sass

## 项目结构

```
|-packages         // 组件库
  |- utils         // 工具
  |- theme         // 主题
    |- common      // 基本配置
    |- mixins      // 混入
    |- icon        // 图标
  |- message       // 消息组件
  |- message-box   // 弹框组件
  |- mask         // 遮罩层
```

## 图标

```
|- icon-success
|- icon-error
|- icon-tip
|- icon-loading
|- icon-close
```

## 组件

### 反馈组件

```javascript
// Message
Message({
  type: 'info', // 状态 成功-success 失败-error 提示-tip
  customClass: '', // 自定义class
  iconClass: '', // 自定义icon
  message: '', // 内容
  duration: 3000 // 持续时间
})

// Message-box
MessageBox.alert({
  customClass: '', // 自定义class
  title: '', // 标题
  message: '', // 内容
  closeIconClass: '', // 关闭图标
  dangerouslyUseHTMLString: false, // message解析为html
})

MessageBox.confirm({
  customClass: '', // 自定义class
  title: '', // 标题
  message: '', // 内容
  beforeClose: (action, instance, done) => {
    // 处理异步操作
    // action String 动作
    // instance Object 实例
    // done Function 结束关闭
  },
  confirmButtonText: '', // 确认文本
  cancelButtonText: '', // 取消文本
  confirmButtonLoading: false, // 确认按钮加载中
  dangerouslyUseHTMLString: false, // message解析为html
})
```

### 展示组件

```html
// popup
<el-popup
  v-model="true"
  class="demo"
  position="bottom"
  :style="{}"
>
</el-popup>
```
