<template>
  <div>
    <v-autocomplete
      v-if="$vuetify.breakpoint.mdAndUp"
      :label="label"
      :value="value"
      :items="icons"
      :filter="filter"
      :prepend-icon="`mdi-${value}`"
      :menu-props="autocompleteMenuProps"
      :aria-autocomplete="false"
      :spellcheck="false"

      @input="$emit('input', arguments[0])"
    >
      <template v-slot:item="data">
        <v-list-item-icon>
          <v-icon>
            mdi-{{ data.item.text }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          {{ data.item.text }}
        </v-list-item-content>
      </template>
    </v-autocomplete>
    <template v-else>
      <autocomplete>
        <template v-slot:item="data">
          <v-list-item-icon>
            <v-icon>
              mdi-{{ data.item.text }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            {{ data.item.text }}
          </v-list-item-content>
        </template>
      </autocomplete>
      <v-text-field />
    </template>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'IconPicker',

  props: {
    value: {
      default: '',
      type: String,
    },
    label: {
      default: 'Icon',
      type: String,
    },
  },

  data: () => ({
    icons: [],
  }),

  computed: {
    autocompleteMenuProps() {
      // default properties copied from the vuetify-autocomplete docs
      const defaultProps = {
        closeOnClick: false,
        closeOnContentClick: false,
        disableKeys: true,
        openOnClick: false,
        maxHeight: 304,
      };

      if (this.$vuetify.breakpoint.smAndDown) {
        defaultProps.maxHeight = 130;
        defaultProps.top = true;
      }
      return defaultProps;
    },
  },

  async created() {
    const request = await axios.get('https://raw.githubusercontent.com/Templarian/MaterialDesign/master/meta.json');
    const iconsUnparsed = request.data;
    this.icons = iconsUnparsed.map(icon => ({
      text: icon.name, value: icon.name, aliases: icon.aliases.join(' '), tags: icon.tags.join('-'),
    })).sort(this.sort);
    console.log(this.icons);
  },

  methods: {
    filter(item, query) {
      const name = (item.value || '').toLowerCase();
      const aliases = (item.aliases || '').toLowerCase();
      const tags = (item.tags || '').toLowerCase();
      const searchText = (query || '').toLowerCase();

      return name.indexOf(searchText) > -1
          || aliases.indexOf(searchText) > -1
          || tags.indexOf(searchText) > -1;
    },
    sort(a, b) {
      if (!a.value && !b.value) return 0;
      if (!a.value) return b.value.length;
      if (!b.value) return a.value.length;
      return a.value.length - b.value.length;
    },
  },
};
</script>
