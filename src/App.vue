<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <div class="my-3">
        <img src="https://maisaedu.com.br/hubfs/site-grupo-a/logo-mais-a-educacao.svg" class="mx-auto w-1/4 pb-3">
        <div class="text-center bg-gray-500 p-2">
          <h2 class="text-white">
            Módulo Acadêmico
          </h2>  
        </div>
      </div>

      <v-divider class="m-4"/>

      <div class="mb-3 text-left">
        <nav>
          <router-link to="/" class="block">
            Home
          </router-link>
          <router-link to="/about" class="block">
            About
          </router-link>
        </nav>
      </div>

    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <!-- <v-toolbar-title>Application</v-toolbar-title> -->
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    
    name: 'App',
    data: () => ({ drawer: null }),

  }
  
</script>