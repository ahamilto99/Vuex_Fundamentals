<template>
  <h4>Oops! Something went wrong.</h4>
  <p>{{ error }}</p>
</template>

<script>
export default {
  props: ['error']
}
</script>
