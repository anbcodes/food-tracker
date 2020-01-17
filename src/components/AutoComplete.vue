<template>
  <v-dialog
    :fullscreen="$vuetify.breakpoint.smAndDown"
    :value="open"
    @input="$emit('update:open', arguments[0])"
  >
    <v-card>
      <v-toolbar>
        <v-toolbar-title>
          Pick {{ label }}
        </v-toolbar-title>
      </v-toolbar>
      <v-text-field
        ref="text"
        :label="label"
        :value="value"
        @input="$emit('input', arguments[0])"
      />
      <v-list>
        <v-list-item
          v-for="item in filteredItems"
          :key="item.value === undefined ? item : item.value"
          @click="
            $refs.text.value = item.value === undefined ? item : item.value;
            $emit('update:open', false)
          "
        >
          <slot :item="item">
            <v-list-item-content>
              {{ item.text === undefined ? item : item.text }}
            </v-list-item-content>
          </slot>
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    value: {
      default: '',
      type: String,
    },

    open: {
      default: false,
      type: Boolean,
    },

    items: {
      default: () => [],
      type: Array,
    },

    filter: {
      default: (item, query) => (item.value ? item.value.contains(query) : item.contains(query)),
      type: Function,
    },
  },

  computed: {
    filteredItems() {
      if (this.filter) {
        return this.items.filter(item => this.filter(item, this.value));
      }
      return this.items;
    },
  },
};
</script>
