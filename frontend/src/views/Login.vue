<template>
  <form>
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" class="form-control" id="email" placeholder="Enter email" v-model="email">
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" class="form-control" id="password" placeholder="Password" v-model="password">
    </div>
    <button type="submit" class="btn btn-primary" @click.prevent="login">Login</button>
  </form>
  <p v-if="error.length > 0">{ error }</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

const URL = 'http://localhost:3001';

export default defineComponent({
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      error: '',
    };
  },
  methods: {
    async login() {
      try {
        const { data } = await axios.post(`${URL}/login`, {
          email: this.email,
          password: this.password,
        });
        localStorage.setItem('token', data.token);
        this.$router.push('/');
      } catch (error: any) {
        this.error = error.response.data.message;
      }
    },
  },
})
</script>
