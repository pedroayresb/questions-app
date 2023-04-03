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
    <div class="form-group">
      <label for="name">Name</label>
      <input type="text" class="form-control" id="name" placeholder="Name" v-model="name">
    </div>
    <button type="submit" class="btn btn-primary" @click.prevent="register">Register</button>
  </form>
  <p v-if="error.length > 0">{ error }</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

const URL = 'http://localhost:3001/user';

export default defineComponent({
  name: 'Register',
  data() {
    return {
      email: '',
      name: '',
      password: '',
      role: 'user',
      error: '',
    };
  },
  methods: {
    async register() {
      try {
        const { data } = await axios.post(`${URL}/register`, {
          email: this.email,
          password: this.password,
          name: this.name,
          role: this.role,
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
