<template>
  <div
    draggable
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
      dataTransfer.dropEffect = dataTransfer.effectAllowed = "move";
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
