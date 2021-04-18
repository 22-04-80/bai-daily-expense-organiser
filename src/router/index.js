import HelloWorld from '../components/HelloWorld.vue';
import Groceries from '../components/Groceries/Groceries.vue';
import NewGroceryList from '../components/Groceries/NewGroceryList.vue';
import NewProduct from "../components/Products/NewProduct";
import Products from '../components/Products/Products.vue';
import Categories from '../components/Categories.vue';
import Dashboard from '../components/Dashboard.vue';
import {createWebHistory, createRouter} from 'vue-router';

const routes = [
	{
		path: '/helloWorld',
		name: 'HelloWorld',
		component: HelloWorld
	},
	{
		path: '/groceries',
		name: 'Groceries',
		component: Groceries
	},
	{
		path: '/new-grocery-list',
		name: 'NewGroceryList',
		component: NewGroceryList
	},
	{
		path: '/products',
		name: 'Products',
		component: Products
	},
	{
		path: '/new-product',
		name: 'NewProduct',
		component: NewProduct
	},
	{
		path: '/categories',
		name: 'Categories',
		component: Categories
	},
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: Dashboard
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;