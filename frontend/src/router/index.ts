import {createRouter, createWebHistory} from 'vue-router'
import routes from './routes'

const router = createRouter({
    history: createWebHistory(),   // uses HTML5 history mode
    routes
})

router.afterEach((to) => {
    if (to.meta.title) {
        document.title = `${to.meta.title} - Ezyone`;
    } else {
        document.title = 'Ezyone';
    }
});

export default router