import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const baseURL = process.env.FIREBASE_DATABASE_URL;

interface User {
    age: number;
    citizen: string;
    email: string;
    fullName: string;
    location: string;
}

const userProfile = (data): User => {
    return {
        age: data.age,
        citizen: data.citizen,
        email: data.email,
        fullName: data.fullName,
        location: data.location,
    };
};
const resolvers = {
    Query: {
        users: async (): Promise<User[]> => {
            const data = await fetch(`${baseURL}/users.json`);
            const dataJson: Record<string, unknown> =
                (await data.json()) as Record<string, unknown>;
            const keys = Object.keys(dataJson);
            return keys.map((item) => {
                const userData = dataJson[item];
                return userProfile(userData);
            });
        },
    },
};

export default resolvers;
