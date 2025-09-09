import { createContext, useEffect, useState } from "react"
import { databases, client } from "../lib/appwrite"
import { ID, Permission, Query, Role } from "react-native-appwrite"
import { useUser } from "../hooks/useUser"

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID || ""
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID || ""

export const BooksContext = createContext();

export function BoooksProvider({ children }){
    const [books, setBooks ] = useState([])
    const { user } = useUser()

    //fetch all books for a user
   async function fetchBooks() {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID, 
        COLLECTION_ID,
        [
          Query.equal('userId', user.$id)
        ]
      )

      setBooks(response.documents)
      console.log(response.documents)
    } catch (error) {
      console.error(error.message)
    }
  }

    //fetch a book by id
     async function fetchBookById(id){
         try {
             const response = await databases.getDocument(
                DATABASE_ID,
                 COLLECTION_ID,
                  id
                );
             return response;
         } catch(error){
             console.log(error.message)
            }
     }

     //create a new book
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
        //delete a book by id
        async function deleteBook(id) {
            try {
            await databases.deleteDocument(
                DATABASE_ID,
                COLLECTION_ID,
                id,
            )
            } catch (error) {
            console.log(error.message)
            }
        }

        useEffect(() => {
            let intervalId;

            if (user) {
            fetchBooks();
            intervalId = setInterval(() => {
                fetchBooks();
            }, 2000); // fetch every 2 seconds
            } else {
            setBooks([]);
            }

            return () => {
            if (intervalId) clearInterval(intervalId);
            };
        }, [user]);

     return (
            <BooksContext.Provider value={{ books, fetchBooks, fetchBookById, createBook, deleteBook }}>
                {children}   
            </BooksContext.Provider>
     )
}

