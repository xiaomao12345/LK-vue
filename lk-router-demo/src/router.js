import Vue from 'vue'
import Router from 'vue-router'

// 一级界面
import Login from './views/Login'
import DashBoard from './views/DashBoard'

// 二级界面
import Home from './views/Home'
// import About from './views/About'
import Mine from './views/Mine'

//懒加载  节约性能
const About = ()=> import('./views/About');


Vue.use(Router);

const router = new Router({
    routes: [
        { path: '/', redirect: '/dashboard' },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: DashBoard,
            children: [
                { path: '/dashboard', redirect: '/dashboard/home' },
                {path: 'home', name: 'home', component: Home,},
                {path: 'about', name: 'about', component: About},
                {path: 'mine', name: 'mine', component: Mine}
            ],
        },
        {path: '/login', name: 'login', component: Login}
    ]
});

// 全局路由前置守卫
router.beforeEach((to, from, next)=>{
    // console.log(to, from);
    if(to.path !== '/login'){ // 验证是否登录
        if(window.isLogin){ // 已经登录
            next();
        }else { // 没有登录
            // next('/login?redirect='+ to.path);
            // next('/login?redirect=/dashboard/mine');
            next('/login');
        }
    }else { // 不需要验证
        next();
    }
    // 放行
    next();
});

// 全局路由后置守卫
router.afterEach((to, from) => {
   // console.log('来了！');
});

export default router;