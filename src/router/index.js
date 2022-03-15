import { createWebHistory, createRouter } from "vue-router";
import IndexPage from "@/views/IndexPage";
import Bookings from "@/views/Bookings";
import Deliveries from "@/views/Deliveries";

const routes = [
    {
        path: "/",
        name: "Главная",
        component: IndexPage,
    },
    {
        path: "/bookings",
        name: "Бронирования",
        component: Bookings,
    },
    {
        path: "/deliveries",
        name: "Доставки",
        component: Deliveries,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;