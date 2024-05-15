<template>
  <header>
    <nav class="navbar">
      <div class="container-fluid">
        <a class="navbar-brand d-inline-flex align-items-center" href="#">
          <img src="@/assets/logo.png" alt="Logo" width="32" class="d-inline-block align-text-top me-2">
          NMap Scanner
        </a>
      </div>
    </nav>
  </header>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  background-color: #587eee;
}

.navbar-brand {
  color: white;
  font-weight: bold;
}

.navbar-brand:hover {
  color: #eee;
}
</style>