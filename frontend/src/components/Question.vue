<template>
  <div>
    <p>{{ question.number }}</p>
    <p>{{ question.text }}</p>
    <div v-for="(answer, index) in question.answers" :key="index" @click="selectAnswer(index)">
      <p>{{ answer }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IQuestion from '../Interfaces/Questions.interfaces';

export default defineComponent({
  name: 'Question',
  props: {
    question: {
      type: Object as () => IQuestion,
      required: true,
    },
    selectAnswer: {
      type: Function,
      required: true,
    },
  },
})
</script>
