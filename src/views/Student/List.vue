<template>
  <v-container>
    <!-- <v-row class="mx-2">
      <v-col cols="6">
        <h1 class="text-3xl mt-4">
          Consulta de Alunos
        </h1>
      </v-col>
      <v-col cols="6" class="inline-flex justify-end items-center">
        <v-btn class="ma-2" color="primary" dark>
          <v-icon dark left>
            mdi-account-plus
          </v-icon>
          Accept
        </v-btn>

      </v-col>
    </v-row> -->
    <v-row>
      <v-col cols="12">
        <v-card class="mx-4">
          <v-card-title>
            <!-- <v-text-field v-model="search" append-icon="mdi-magnify" label="Digite sua busca" single-line hide-details>
            </v-text-field> -->
          </v-card-title>
          <v-data-table :headers="headers" :items="students" sort-by="id" class="elevation-1">
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>
                  <h1 class="text-3xl mt-4">
                    Consulta de Alunos
                  </h1>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                      <v-icon dark left>
                        mdi-account-plus
                      </v-icon>
                      Novo Aluno
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <v-text-field v-model="editedItem.id" label="RA" disabled></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field :rules="[rules.required]" v-model="editedItem.name" label="Nome" required></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field :rules="[rules.required, rules.email]" v-model="editedItem.email" label="E-mail" required></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field :rules="[rules.required]" v-model="editedItem.cpf" label="CPF" required></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">
                        Cancel
                      </v-btn>
                      <v-btn color="blue darken-1" text @click="save">
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h5">Tem certeza que deseja deletar o aluno?</v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
                      <v-btn color="blue darken-1" text @click="deleteItemConfirm">Sim</v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)">
                mdi-delete
              </v-icon>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize">
                Atualizar
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import api from '@/services/api';

export default {

  name: "StudentList",

  data: () => ({
    dialog: false,
    dialogDelete: false,
    rules: {
        required: value => !!value || 'Required.',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      },
    headers: [
      {
        text: 'Registro Acadêmico',
        align: 'center',
        sortable: true,
        value: 'id',
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
      { text: 'Ações', value: 'actions', sortable: false },
    ],
    students: [],
    editedIndex: -1,
    editedItem: {
      id: '',
      name: '',
      email: '',
      cpf: '',
    },
    defaultItem: {
      id: '',
      name: '',
      email: '',
      cpf: '',
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Novo Aluno' : 'Editar Aluno'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  mounted() {
    this.initialize()
  },

  methods: {
    initialize() {

      api.get('students').then(response => {
        this.students = response.data;
      });

    },

    editItem(item) {
      this.editedIndex = this.students.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.students.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
      console.log({'deleteItem()': this.editedIndex})
    },

    deleteItemConfirm() {
      
      api.delete(`student/${this.editedItem.id}`).then( () => {
        this.students.splice(this.editedIndex, 1)
        console.log('insideApi', this.editedItem.id)
        this.closeDelete()
      });

    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {    
      if (this.editedIndex > -1) {

        api.patch(`/student/${this.editedItem.id}`, {
          name: this.editedItem.name,
          cpf: this.editedItem.cpf,
          email: this.editedItem.email
        }).then( response => {
          console.log(response.data);
          Object.assign(this.students[this.editedIndex], response.data);
        });
        
      
      } else {

        api.post('/student', {
          name: this.editedItem.name,
          cpf: this.editedItem.cpf,
          email: this.editedItem.email
        }).then( response => {
          this.students.push(response.data)
        });

      }

      this.close()
    },
  },
}
</script>
