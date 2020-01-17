<template>
  <v-container>
    <v-app-bar app>
      <v-spacer />
      <v-toolbar-title class="display-1">
        Goals
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-content>
      <v-container>
        <v-row>
          <v-col>
            <v-simple-table>
              <thead>
                <th>Name</th>
                <th>Amount</th>
              </thead>
              <tbody>
                <tr
                  v-for="(goal, i) in goals"
                  :key="goal.name"
                  :class="`${goal.color}--text`"
                  @click="edit(i)"
                >
                  <td>
                    <v-icon :color="goal.color">
                      mdi-{{ goal.icon }}
                    </v-icon>{{ goal.name }}
                  </td>
                  <td>{{ goal.amount }} {{ goal.unit }}</td>
                </tr>
              </tbody>
            </v-simple-table>
            <v-btn
              icon
              @click="create"
            >
              <v-icon>
                mdi-plus
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>

      <edit-goal-dialog
        v-model="dialogOpen"
        :goal="currentGoal.goal"
        :edit="!currentGoal.create"
        @save="saveGoal"
      />
    </v-content>
  </v-container>
</template>
<script>
import Goal from '../util/Goal';
import EditGoalDialog from '../components/EditGoalDialog.vue';

export default {
  name: 'Edit',
  components: {
    EditGoalDialog,
  },
  data: () => ({
    currentGoal: {
      goal: {},
    },
    dialogOpen: false,
  }),

  computed: {
    goals() {
      return this.$store.state.goals;
    },
  },
  methods: {
    edit(i) {
      this.currentGoal = { goal: this.goals[i], index: i };
      this.dialogOpen = true;
    },

    saveGoal(goal) {
      if (this.currentGoal.create) {
        this.$store.commit('createGoal', new Goal(goal));
      } else {
        this.$store.commit('setGoal', new Goal(goal));
      }
    },

    create() {
      this.currentGoal = { goal: Goal.create({}), create: true };
      this.dialogOpen = true;
    },
  },
};
</script>
