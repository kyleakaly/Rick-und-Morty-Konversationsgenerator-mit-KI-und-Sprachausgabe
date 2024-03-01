<script>
  import Router from 'svelte-spa-router'
  import routes from './routes/routes.js';
</script>

<main>
  <div class="container">
    <Router {routes} />
  </div>
</main>
