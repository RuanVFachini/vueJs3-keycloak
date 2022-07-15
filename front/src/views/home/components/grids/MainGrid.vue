<template>
  <h1>teste</h1>
  <button @click="loadStudants">carregar</button>
  <!-- <n-table :bordered="false" :single-line="false">
    <thead>
      <tr>
        <th>Id</th>
        <th>Nome</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="">
        <td>放弃</td>
        <td>反常的</td>
      </tr>
    </tbody>
  </n-table> -->
</template>

<script lang="ts">
import Studant from "../../entities/studant";
import StudantService from "../../services/studant.service";

export default {
  data(): {
    service: StudantService;
    isLoading: boolean;
    dataTable: Studant[];
  } {
    return {
      isLoading: false,
      dataTable: [],
      service: new StudantService(this.$http),
    };
  },
  methods: {
    loadStudants() {
      this.service.getStudants().then((x) => {
        this.dataTable = x;
        console.log(this.dataTable);
      });
    },
  },
};
</script>

<style></style>
