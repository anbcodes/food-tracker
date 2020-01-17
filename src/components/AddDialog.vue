<template>
  <v-dialog
    :value="value"
    fullscreen
    @input="$emit('input', arguments[0])"
  >
    <v-card>
      <v-card-title>
        Add or remove from {{ goal.name }}
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <v-text-field
                ref="amount"
                v-model="amount"
                label="amount"
                type="number"
                inputmode="numeric"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-container>
          <v-row>
            <v-col cols="auto">
              <v-btn
                color="error"
                @click="$emit('input', false)"
              >
                Cancel
              </v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn
                color="success"
                @click="$emit('save', {goal, amount}); $emit('input', false)"
              >
                Add
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    goal: {
      type: Object,
      default: () => ({}),
    },
  },

  data: () => ({
    amount: '',
  }),

  watch: {
    async value() {
      this.amount = '';
      if (this.value) {
        await this.$nextTick();
        this.$refs.amount.focus();
      }
    },
  },
};
</script>
