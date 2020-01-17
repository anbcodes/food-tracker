<template>
  <v-container>
    <v-app-bar app>
      <v-btn
        large
        icon
        @click="currentDay = currentDay.remove(1)"
      >
        <v-icon large>
          mdi-chevron-left
        </v-icon>
      </v-btn>
      <v-spacer />
      <v-toolbar-title class="display-1">
        {{ currentDay }}
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        large
        icon
        @click="currentDay = currentDay.add(1)"
      >
        <v-icon large>
          mdi-chevron-right
        </v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <v-row>
          <v-col
            v-for="goal in goalsForDay"
            :key="goal.goal.name"
            cols="auto"
          >
            <v-card
              :class="`${goal.goal.color}--text px-3 py-2 text-center`"
              @click="openAddDialog(goal.goal)"
            >
              <v-icon
                :color="goal.goal.color"
                small
              >
                mdi-{{ goal.goal.icon }}
              </v-icon> {{ goal.goal.name }}<v-divider />
              {{ +goal.done }}/{{ goal.goal.amount }} {{ goal.goal.unit }}
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row justify="center">
          <v-col
            cols="auto"
          >
            <circlar-progress
              v-if="goalsForDay.length !== 0"
              :items="goalsForDay"
              :level="goalsForDay.length - 1"
            />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col
            class="title"
            style="text-align: center"
            cols="12"
          >
            {{ totalDone }}/{{ totalTotal }}
          </v-col>
        </v-row>
      </v-container>
      <add-dialog
        v-model="addDialog.open"
        :goal="addDialog.goal"
        @save="add"
      />
    </v-content>
  </v-container>
</template>

<script>
import CirclarProgress from '../components/CirclarProgress.vue';
import Tracker from '../util/Tracker';
import SimpleDate from '../util/SimpleDate';
import AddDialog from '../components/AddDialog.vue';


export default {
  name: 'Home',
  components: {
    CirclarProgress,
    AddDialog,
  },

  data: () => ({
    tracker: new Tracker('sampleId'),
    currentDay: new SimpleDate(),
    addDialog: { open: false },
  }),

  computed: {
    goalsForDay() {
      return this.$store.getters.getGoalsForDay(this.currentDay);
    },

    totalDone() {
      return this.goalsForDay.reduce((total, goal) => total + +goal.done, 0);
    },

    totalTotal() {
      return this.goalsForDay.reduce((total, goal) => total + +goal.goal.amount, 0);
    },
  },

  methods: {
    openAddDialog(goal) {
      this.addDialog = { open: true, goal };
    },

    async add({ goal, amount }) {
      goal.addAmountToDay(this.currentDay, amount);
      this.$store.commit('setGoal', goal);
    },
  },
};
</script>
