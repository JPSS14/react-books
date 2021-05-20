import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import apiKey from '../../apiKey.json';

type Book = {
    title: string;
    img: string;
};

type BooksContextData = {
    newBook: (e: any) => void;
    search: (e: any) => void;
    result: any[];
    myResult: any[];
}

export const BooksContext = createContext({} as BooksContextData);

type BooksContextProviderProps = {
    children: ReactNode;
}

export function BooksContextProvider({ children }: BooksContextProviderProps) {

    const [book, setBook] = useState("");
    const [result, setResult] = useState([]);
    const [myResult, setMyResult] = useState([]);
    const key = apiKey[0].apiKey;

    function newBook(e: any) {
        setBook(e.target.value);
    }

    function search(e) {
        e.preventDefault();
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${book}&key=${aut}&maxResults=16`)
            .then(info => {
                console.log(info.data.items);
                setResult(info.data.items);
            });
        console.log(book);
        
    }

    useEffect(() => {
        let array = [];
        let tes = {};
        result.map((item, key) => {
            if (item.volumeInfo.imageLinks) {

                tes = {
                    title: item.volumeInfo.title,
                    img: item.volumeInfo.imageLinks.thumbnail
                }
                array.push(tes);
                console.log("tem");
            } else {
                tes = {
                    title: item.volumeInfo.title,
                    img: "/sem-img.png"
                }
                array.push(tes);
                console.log("não tem");
            }

        });
        console.log("tes", array);
        setMyResult(array);
    
    }, [result]);
        

    const aut = key.slice(62, 101);
    return (
        <BooksContext.Provider
            value={{
                newBook,
                search,
                result,
                myResult
            }}>
            {children}
        </BooksContext.Provider>
    )

}

export const useBooks = () => {
    return useContext(BooksContext);
}

