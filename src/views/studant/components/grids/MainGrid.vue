<template>
  <DefaultGrid
      :columns="columns"
      :data="dataTable"
      :pagination="pagination"
    />
</template>

<script lang="ts">
import StudantService from "../../services/studant.service";
import DefaultGrid from "@/shared/components/DefaultGrid.vue";

const createColumns = () => {
  return [
    {
      title: 'Código',
      key: 'id'
    },
    {
      title: 'Nome',
      key: 'name'
    }
  ]
};

export default {
  components: {
    DefaultGrid
  },
  data() {
    return {
      isLoading: false,
      dataTable: [],
      service: new StudantService(this.$http),
      columns: createColumns(),
      pagination: {
        page: 1,
        pageCount: 1,
        pageSize: 10,
        prefix ({ itemCount }) {
          return `Total is ${itemCount}.`
        },
      },
    };
  },
  methods: {
    async loadStudants() {
      const loadingMessage = "Buscando alunos";
      this.$loading.setMessage(loadingMessage)

      this.dataTable = await this.service.getStudants()
        .finally(() => {
          this.$loading.removeMessage(loadingMessage)    
        });
    }
  },
  created() {
    this.loadStudants();
  }
};
</script>

<style>
</style>
