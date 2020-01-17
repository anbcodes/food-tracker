<template>
  <v-progress-circular
    :size="level * 25 + 30"
    :width="10"
    :value="percentage(items[level])"
    :color="items[level].goal.color"
    rotate="-90"
  >
    <Recursive
      v-if="level !== 0"
      :level="level - 1"
      :items="items"
    />
  </v-progress-circular>
</template>
<script>
export default {
  name: 'Recursive',
  props: {
    level: {
      default: 0,
      type: Number,
    },

    items: {
      default: () => [],
      type: Array,
    },
  },

  methods: {
    percentage(item) {
      return item.done / item.goal.amount * 100;
    },
  },
};
</script>
