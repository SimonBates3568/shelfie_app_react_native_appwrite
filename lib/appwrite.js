import { Client, Account, Avatars, Databases } from 'react-native-appwrite'

const client = new Client()
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID)
    .setPlatform('dev.sibates.shelfie');

export const account = new Account(client)
export const avatars = new Avatars(client)
export const databases = new Databases(client)

export default client