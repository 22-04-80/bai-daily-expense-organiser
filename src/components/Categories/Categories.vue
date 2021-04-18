<template>
  <h1>Categories</h1>
  <hr />
  <div v-if="loading.shoppingList || loading.products">
    <h1>Loading...</h1>
  </div>
  <div v-if="!loading" class="categories">
    <div v-for="group in groupedCategories" v-bind:key="group.title">
      <p class="category-title">{{ group.title }}</p>
      <ul class="text-start">
        <li
          v-for="category in group.children"
          v-bind:key="category"
          class="row"
        >
          <span class="col-sm-6 offset-sm-3" @click="goToProducts(category)">{{
            category
          }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { api } from "@/api/api";
export default {
  name: "Categories",
  data: function () {
    return {
      loading: true,
      groupedCategories: null,
    };
  },
  methods: {
    getCategories: async function () {
      const categories = await api.getCategories();
      this.groupedCategories = await this.groupCategoriesByFirstLetter(
        categories
      );
      this.loading = false;
    },
    groupCategoriesByFirstLetter: async function (categories) {
      let groupedCategories = [];
      categories.forEach((element) => {
        let firstLetter = element[0].toUpperCase();

        if (
          groupedCategories.length === 0 ||
          !groupedCategories.some((e) => e.title === firstLetter)
        ) {
          groupedCategories.push({
            title: firstLetter,
            children: [element],
          });
        } else {
          groupedCategories
            .filter((e) => e.title === firstLetter)[0]
            .children.push(element);
        }
        groupedCategories.sort((a, b) => a.title.localeCompare(b.title));
      });
      return groupedCategories;
    },
    goToProducts: function (category) {
      this.$router.push({ path: "/products", query: { category: category } });
    },
  },
  mounted: async function () {
    await this.getCategories();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.categories {
  width: 20%;
}
.category-title {
  font-size: 24px;
  font-weight: bold;
}
ul {
  list-style-type: none;
}
ul li {
  justify-content: center;
  margin-left: 32px;
}

ul li:hover {
  color: rgb(64, 171, 233);
  cursor: pointer;
}
</style>
