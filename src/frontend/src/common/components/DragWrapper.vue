<template>
  <div
    :draggable="true"
    @dragstart.self="onDrag"
    @dragover.prevent
    @dragenter.prevent
    class="draggable-item"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: "DragWrapper",
  props: {
    transferData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onDrag({ dataTransfer }) {
      dataTransfer.dropEffect = "move";
      dataTransfer.effectAllowed = "move";
      dataTransfer.setData("payload", JSON.stringify(this.transferData));
    },
  },
};
</script>

<style scoped>
.draggable-item {
  cursor: grab;
}

.draggable-item:active {
  cursor: grabbing;
}
</style>
