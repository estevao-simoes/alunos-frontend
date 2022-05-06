<template>
  <v-container>
    <v-row class="mx-2">
      <v-col cols="6">
        <h1 class="text-3xl mt-4">
          Consulta de Alunos
        </h1>
      </v-col>
      <v-col cols="6" class="inline-flex justify-end items-center">
      <v-btn
        class="ma-2"
        color="primary"
        dark
      >
        <v-icon
          dark
          left
        >
          mdi-account-plus
        </v-icon>
        Accept
      </v-btn>

      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="mx-4">
          <v-card-title>            
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Digite sua busca"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="desserts"
            :search="search"
          >
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "StudentList",

  data () {
      return {
        search: '',
        desserts: [
          {
            ra: '111687',
            name: 'Estevão Simões',
            cpf: '38819437813',
          },
        ],
      }
    },
    computed: {
      headers () {
        return [
          {
            text: 'Registro Acadêmico',
            align: 'center',
            sortable: true,
            value: 'ra',
          },
          {
            text: 'Nome',
            align: 'center',
            sortable: true,
            value: 'name',
          },
          {
            text: 'CPF',
            align: 'center',
            sortable: true,
            value: 'cpf',
          },
          {
            text: 'Ações',
            value: 'calories',
            sortable: false,
          },
        ]
      },
    },
};
</script>
