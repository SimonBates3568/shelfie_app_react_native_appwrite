import { createContext, useState } from "react";
import { databases } from "../lib/appwrite";
import { useUser } from "../hooks/useUser";
import { Permission, Role, ID } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID || ""
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID || ""

export const BooksContext = createContext();

export function BoooksProvider({ children }){
    const [books, setBooks ] = useState([])
    const { user } = useUser()

    async function fetchBooks(){
            try {

            } catch(error){
                console.log(error.message)
            }
    }
     async function fetchBookById(){
         try {

            } catch(error){
                console.log(error.message)
            }
     }
     async function createBook(data){
            try {
                const newBook = await databases.createDocument(DATABASE_ID, 
                    COLLECTION_ID,
                     ID.unique(),
                      {...data, userId:user.$id },
                       [
                    Permission.read(Role.user(user.$id)),
                    Permission.update(Role.user(user.$id)), 
                    Permission.delete(Role.user(user.$id)), 
                ])
            } catch(error){
                console.log(error.message)
            }
     }
       async function deleteBook(id){
            try {

            } catch(error){
                console.log(error.message)
            }
     }
     return (
            <BooksContext.Provider value={{ books, fetchBooks, fetchBookById, createBook, deleteBook }}>
                {children}   
            </BooksContext.Provider>
     )
}

