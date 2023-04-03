<template>
  <div>
    <Loading v-if="loading" />
    <div v-if="!loading" v-for="test in testsMade" :key="test.id" @click="goToTestCorrection(test.id)">
      <p>{{ getTestName(test.id) }}</p>
    </div>
    <p v-if="error.length > 0">{ error }</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import ITestsMade from '../Interfaces/TestsMade.interfaces';

const URL = 'http://localhost:3001';

export default defineComponent({
  name: 'TestsMade',
  data() {
    return {
      testsMade: [] as ITestsMade[],
      loading: true,
      error: '',
    };
  },
  methods: {
    async getTests() {
      try {
        const { data } = await axios.get(`${URL}/token`, {
          headers: {
            Authorization: `${localStorage.getItem('token')}`,
          },
        });
        const { tests_made } = data;
        this.testsMade = tests_made;
      } catch (error: any) {
        this.error = error.response.data.message;
        this.loading = false;
      }
    },

    async getTestName(id: string) {
      try {
        const { data } = await axios.get(`${URL}/tests/${id}`);
        return data.name;
      } catch (error: any) {
        this.error = error.response.data.message;
        this.loading = false;
      }
    },

    goToTestCorrection(id: string) {
      this.$router.push(`/correction/${id}`);
    }
  },
})
</script>
