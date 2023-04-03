<template>
  <div>
    <Loading v-if="loading" />
    <div v-if="!loading">
      <p>{{ name }}</p>
      <p>Corretas: </p>
      <div v-for="question in test.correct" :key="question.number">
        <p>{{ question.text }}</p>
        <p>{{ question.number }}</p>
        <div v-for="answer in question.answers" :key="answer.text">
          <p>{{ answer.text }}</p>
        </div>
      </div>
      <div v-for="question in test.incorrect" :key="question.number">
        <p>{{ question.text }}</p>
        <p>{{ question.number }}</p>
        <div v-for="answer in question.answers" :key="answer.text">
          <p>{{ answer.text }}</p>
        </div>
      </div>
    </div>
    <p v-if="error.length > 0">{ error }</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouteParams } from 'vue-router';
import axios from 'axios';
import ITestsMade from '../Interfaces/TestsMade.interfaces';

const URL = 'http://localhost:3001';

export default defineComponent({
  name: 'Correction',
  data() {
    return {
      id: '',
      name: '',
      test: {} as ITestsMade,
      loading: true,
      error: '',
    };
  },
  methods: {
    async getTest() {
      try {
        const { data } = await axios.post(`${URL}/token`, {}, {
          headers: {
            Authorization: `${localStorage.getItem('token')}`,
          },
        });
        const { tests_made } = data;
        const test = tests_made.filter((test: any) => test.id === this.id);
        this.test = test[0];
        this.loading = false;
        return data;
      } catch (error: any) {
        this.error = error.response.data.message;
        this.loading = false;
      }
    },
  },
  async created() {
    this.id = (this.$route.params as RouteParams).id as string;
    try {
        const { data } = await axios.get(`${URL}/tests/${this.id}`);
        this.name = data.name;
      } catch (error: any) {
        this.error = error.response.data.message;
        this.loading = false;
      }
  },
})
</script>
