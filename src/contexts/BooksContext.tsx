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
    autocomplete: any[];
}

export const BooksContext = createContext({} as BooksContextData);

type BooksContextProviderProps = {
    children: ReactNode;
}

export function BooksContextProvider({ children }: BooksContextProviderProps) {

    const [book, setBook] = useState("");
    const [result, setResult] = useState([]);
    const [autocomplete, setAutocomplete] = useState([]);
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
        if (book != "" && book.length >= 3) {
            axios.get(`https://www.googleapis.com/books/v1/volumes?q=${book}&key=${aut}&maxResults=6`)
                .then(info => {
                    console.log(info.data.items);
                    setAutocomplete(info.data.items);
                });
            console.log("recomend", autocomplete);
        }
    }, [book]);

    const aut = key.slice(62, 101);
    return (
        <BooksContext.Provider
            value={{
                newBook,
                search,
                result,
                autocomplete
            }}>
            {children}
        </BooksContext.Provider>
    )

}

export const useBooks = () => {
    return useContext(BooksContext);
}

