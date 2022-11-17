<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
body {
  background-color: #f6f8f9;
}
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 6px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #d2cbcb;
}
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  background: #dcdfe6;
}
</style>
