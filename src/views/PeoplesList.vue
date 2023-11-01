<template>
  <div class="animate">
    <div class="d-flex fd-column jc-center ai-center">
      <PeoplesTable class="order-2"/>
      <SearchForm class="order-1"/>
    </div>
  </div>
</template>


<script setup>
import PeoplesTable from '@/components/PeoplesTable.vue';
import SearchForm from '@/components/SearchForm.vue';

</script>