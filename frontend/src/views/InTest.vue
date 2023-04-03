<template>
  <div>
    <Loading v-if="loading" />
    <div v-if="!loading">
      <h1>{{ test.name }}</h1>
      <div v-for="(question) in test.questions" :key="question.number">
        <Question :question="question" :selectAnswer="selectAnswer" />
      </div>
      <div v-for="(question, index) in test.questions" :key="question.number" @click="goToQuestion(index)">
        <p>{{ question.number }}</p>
      </div>
      <button class="btn btn-primary" @click="finishTest">Finish test</button>
    </div>
    <p v-if="error.length > 0">{ error }</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import Question from '../components/Question.vue';
import IQuestion from '../Interfaces/Questions.interfaces';
import ICorrectionQuestion from '../Interfaces/Correction.interfaces';

const URL = 'http://localhost:3001';

export default defineComponent({
  name: 'InTest',
  components: {
    Question,
  },
  data() {
    return {
      test: {
        name: '',
        questions: [] as IQuestion[],
      },
      answers: [] as ICorrectionQuestion[],
      currentQuestion: {} as IQuestion,
      loading: true,
      error: '',
    };
  },
  methods: {
    async getTest() {
      try {
        const { data } = await axios.get(`${URL}/tests/${localStorage.getItem('startedTest')}`);
        this.test = data;
        this.loading = false;
      } catch (error: any) {
        this.error = error.response.data.message;
        this.loading = false;
      }
    },

    goToQuestion(index: number) {
      this.currentQuestion = this.test.questions[index];
    },

    selectAnswer(index: number, answer: string) {
      this.answers[index] = {
        number: this.test.questions[index].number,
        text: this.test.questions[index].text,
        answerGiven: answer,
      };
    },

    async finishTest() {
      this.loading = true;
      try {
        const response = await axios.post(`${URL}/correction`, {
          testId: localStorage.getItem('startedTest'),
          questionsGiven: this.answers,
        });
        localStorage.removeItem('startedTest');
        this.loading = false;
        this.$router.push(`/correction`);
      } catch (error: any) {
        this.loading = false;
        this.error = error.response.data.message;
      }
    },
  },
})
</script>
