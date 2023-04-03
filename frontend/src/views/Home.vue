<template>
  <div>
    <Loading v-if="loading" />
    <div v-if="!loading" v-for="test in tests" :key="test.id" @click="goToTest(test.id)">
      <p>{{ test.name }}</p>
    </div>
    <p v-if="error.length > 0">{ error }</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import ITest from "../Interfaces/Test.interfaces";
import Loading from "../components/Loading.vue";

const URL = 'http://localhost:3001';

export default defineComponent({
  name: 'Home',
  components: {
    Loading,
  },
  data() {
    return {
      loading: true,
      tests: [] as ITest[],
      error: '',
    };
  },
  methods: {
    async register() {
      try {
        const { data } = await axios.get(`${URL}/tests`);
        this.tests = data;
        this.loading = false;
      } catch (error: any) {
        this.error = error.response.data.message;
        this.loading = false;
      }
    },

    goToTest(id: string) {
      localStorage.setItem('startedTest', id);
      this.$router.push('/inTest');
    }
  },
})
</script>