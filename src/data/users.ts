import { User } from "@/types";
import bcrypt from "bcryptjs"; // اطمینان حاصل کنید که bcryptjs نصب شده است: npm install bcryptjs

// رمز عبور ثابت برای همه کاربران تستی
const TEST_PASSWORD = "123456"; 
const HASHED_PASSWORD = bcrypt.hashSync(TEST_PASSWORD, 10); 

export const users: User[] = [
    {
        id: 101,
        name: "علی محمدی",
        email: "ali.mohammadi@example.com",
        password: HASHED_PASSWORD, 
        role: "user",
        createdAt: "2024-05-01T10:00:00Z",
        avatar: "/images/about/profile-team.jpg"
    },
    {
        id: 200,
        name: "سارا حسینی",
        email: "sara.admin@example.com",
       
        password: HASHED_PASSWORD, 
        role: "admin",
        createdAt: "2023-11-15T14:30:00Z",
        avatar: "/images/about/profile-team.jpg"
    },
    {
        id: 102,
        name: "رضا کریمی",
        email: "reza.karimi@example.com",
       
        password: HASHED_PASSWORD, 
        // role: undefined
        createdAt: "2024-01-20T08:00:00Z",
        avatar: "/images/about/profile-team.jpg"
    },
    {
        id: 103,
        name: "مریم احمدی",
        email: "maryam@example.com",
        password: HASHED_PASSWORD, 
        role: "user",
        createdAt: "2024-04-10T11:22:00Z",
        avatar: "/images/about/profile-team.jpg"
    },
    {
        id: 104,
        name: "امیر صالحی",
        email: "amir@example.com",
        password: HASHED_PASSWORD, 
        createdAt: "2024-03-05T17:45:00Z",
        avatar: "/images/about/profile-team.jpg"
    }
];

