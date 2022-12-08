<template>
  <div class="hello">
    <button @click="handleToggleTheme">切换主题</button>
    <h1>{{ msg }}</h1>
    <p>yes</p>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      themeNames: THEME_NAMES,
      currentTheme: "default",
    };
  },
  computed: {
    currentThemeIndex() {
      return THEME_NAMES.findIndex((item) => item === this.currentTheme);
    },
  },
  mounted() {},
  methods: {
    handleToggleTheme() {
      this.currentTheme = this.currentTheme === "default" ? "old" : "default";
      document
        .querySelector("body")
        .setAttribute("data-theme", this.currentTheme);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@mixin themify() {
  @each $theme-name, $map in $themes-color {
    [data-theme="#{$theme-name}"] & {
      $theme-map: () !global;
      @each $key, $value in $map {
        $theme-map: map-merge(
          $map1: $theme-map,
          $map2: (
            $key: $value,
          ),
        ) !global;
      }
      @content;
    }
  }
}

@function themed($key) {
  @return map-get($theme-map, $key);
}

h1 {
  @include themify() {
    color: themed("color");
  }
}
h3 {
  @include themify() {
    color: themed("color");
  }
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
