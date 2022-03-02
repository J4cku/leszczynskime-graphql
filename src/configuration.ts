import dotenv from 'dotenv';

dotenv.config();

interface Configuration {
    firebase: {
        apiKey: string;
        authDomain: string;
        databaseURL: string;
        projectId: string;
    };
}

const configuration: Configuration = {
    firebase: {
        apiKey: process.env.FIREBASE_API_KEY || '',
        authDomain: process.env.FIREBASE_AUTH_DOMAIN || '',
        databaseURL: process.env.FIREBASE_DATABASE_URL || '',
        projectId: process.env.FIREBASE_PROJECT_ID || '',
    },
};

export default configuration;
