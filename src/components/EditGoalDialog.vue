<template>
  <v-dialog
    :value="value"
    fullscreen
    @input="$emit('input', arguments[0])"
  >
    <v-card>
      <v-card-title>{{ edit ? 'Edit' : 'Create' }} Goal</v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="editedGoal.name"
                label="Name"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="editedGoal.amount"
                label="Amount"
                type="number"
                inputmode="numeric"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="editedGoal.unit"
                label="Unit"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <icon-picker
                v-model="editedGoal.icon"
                label="Icon"
                spellcheck="off"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-autocomplete
              v-if="$vuetify.breakpoint.mdAndUp"
              v-model="editedGoal.color"
              label="Color"
              :aria-autocomplete="false"
              :spellcheck="false"
              :menu-props="autocompleteMenuProps"
              :color="editedGoal.color"
              :items="['red', 'pink', 'purple',
                       'deep-purple', 'indigo', 'blue',
                       'light-blue', 'cyan', 'teal',
                       'green', 'light-green', 'lime',
                       'yellow', 'amber', 'orange', 'deep-orange',
                       'brown', 'blue-grey', 'grey']"
            />
            <template v-else>
              <autocomplete
                :value="fields.colorText.focus"
                :items="['red', 'pink', 'purple',
                         'deep-purple', 'indigo', 'blue',
                         'light-blue', 'cyan', 'teal',
                         'green', 'light-green', 'lime',
                         'yellow', 'amber', 'orange', 'deep-orange',
                         'brown', 'blue-grey', 'grey']"
                @input="arguments[0] ? $refs.colorTextField.blur() : ''"
              />
              <v-text-field
                :color="editedGoal.color"
                @focus="fields.colorText.focus = true"
              />
            </template>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-container>
          <v-row>
            <v-col cols="6">
              <v-btn
                color="error"
                @click="$emit('input', false)"
              >
                Cancel
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                color="success"
                @click="$emit('input', false); $emit('save', editedGoal)"
              >
                {{ edit ? 'Save' : 'Create' }}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import IconPicker from './IconPicker.vue';
import Autocomplete from './AutoComplete.vue';

export default {
  name: 'EditGoalDialog',
  components: {
    IconPicker,
    Autocomplete,
  },
  props: {
    value: {
      default: false,
      type: Boolean,
    },

    edit: {
      default: true,
      type: Boolean,
    },

    goal: {
      default: () => ({}),
      type: Object,
    },
  },

  data: () => ({
    editedGoal: {},
    feilds: {
      colorText: {
        focus: false,
      },
    },
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

  watch: {
    goal() {
      this.editedGoal = JSON.parse(JSON.stringify(this.goal));
    },
  },
};
</script>
