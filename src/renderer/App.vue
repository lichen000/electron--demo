<template>
  <div id="app">
      <header>网络文档管理系统</header>
      <nav>AAA</nav>
      <div id="content">
          <aside>
              <section id="menu1">
                  <div>Menu</div>
                  <ul>
                      <li><a href="#/">主面板</a></li>
                  </ul>
              </section>
          </aside>
          <section id="main_body">
              <router-view></router-view>
          </section>
      </div>
      <footer>mangolost版权所有</footer>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="scss">
  /* CSS */

  * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
  }

  html {

  }

  body {
      width: 100%;
  }

  header {
      position: fixed;
      top: 0;
      width: 100%;
      height: 40px;
      text-align: center;
  }

  nav {
      position: fixed;
      top: 40px;
      width: 100%;
      height: 20px;
  }

  footer {
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 20px;
      text-align: center;
  }

  div#content {
      position: fixed;
      top: 60px;
      bottom: 20px;
      width: 100%;
      height: auto;
      border: 1px solid red;


  }

  aside {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 20%;
      height: 100%;
      border: 1px solid green;
  }

  #menu1 {
      color: red;

  div {
      color: pink;
  }
  }


  section#main_body {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 20%;
      width: 80%;
      height: 100%;
      border: 1px solid black;
  }
</style>
