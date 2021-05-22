import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import apiKey from '../../apiKey.json';

type Book = {
    id: string;
    data: string,
    title: string,
    img: string,
    star: number
};

type BooksContextData = {
    newBook: (e: any) => void;
    search: (e: any) => void;
    result: any[];
    myResult: any[];
    favoriteBook: (title: string) => void;
    favoriteFilter: () => void;
    bookList: any[];
    totalItems: number;
    buildPage: (id: any) => void;
    activeBook: any[];
}

export const BooksContext = createContext({} as BooksContextData);

type BooksContextProviderProps = {
    children: ReactNode;
}

export function BooksContextProvider({ children }: BooksContextProviderProps) {

    const [book, setBook] = useState("");
    const [bookList, setBookList] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [result, setResult] = useState([]);
    const [myResult, setMyResult] = useState([]);
    const [star, setStar] = useState([]);
    const [favorite, setFavorite] = useState([]);
    const [activeBook, setActiveBook] = useState([]);
    const [active, setActive] = useState([]);
    const key = apiKey[0].apiKey;

    function newBook(e: any) {
        setBook(e.target.value);
    }

    function search(e) {
        e.preventDefault();
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${book}&key=${aut}&maxResults=40`)
            .then(info => {
                console.log(info.data.items);
                setTotalItems(info.data.totalItems);

                setResult(info.data.items);
            });


    }

    useEffect(() => {
        let array = [];
        let tes = {};
        result.map((item, key) => {
            if (item.volumeInfo.imageLinks) {

                tes = {
                    id: item.id,
                    data: item.volumeInfo.publishedDate,
                    title: item.volumeInfo.title,
                    img: item.volumeInfo.imageLinks.thumbnail,
                    description: item.volumeInfo.description,
                    saleability: item.saleInfo.saleability,
                    buy: item.saleInfo.buyLink,
                    star: 0
                }

                if (favorite != []) {
                    favorite.map((item2, key) => {
                        if (item.volumeInfo.title === item2.title) {
                            tes = {
                                id: item.id,
                                data: item.volumeInfo.publishedDate,
                                title: item.volumeInfo.title,
                                img: item.volumeInfo.imageLinks.thumbnail,
                                description: item.volumeInfo.description,
                                saleability: item.saleInfo.saleability,
                                buy: item.saleInfo.buyLink,
                                star: 1
                            }

                        }

                    })
                }





            } else {

                tes = {
                    id: item.id,
                    data: item.volumeInfo.publishedDate,
                    title: item.volumeInfo.title,
                    img: "/sem-img.png",
                    description: item.volumeInfo.description,
                    saleability: item.saleInfo.saleability,
                    buy: item.saleInfo.buyLink,
                    star: 0
                }

                // favorite.map((item2, key) => {
                //     if (item.volumeInfo.title === item2.title) {
                //         tes = {
                //             title: item.volumeInfo.title,
                //             img: "/sem-img.png",
                //             star: 1
                //         }

                //     } else {
                //         tes = {
                //             title: item.volumeInfo.title,
                //             img: "/sem-img.png",
                //             star: 0
                //         }

                //     }
                // })



            }
            array.push(tes);

        });
        console.log("tes", array);
        setMyResult(array);

    }, [result]);

    useEffect(() => {
        setBookList(myResult.slice(0, totalItems));
    }, [myResult])

    function favoriteBook(title: string) {
        let array = [];
        let salvos = favorite;
        myResult.map((item, key) => {
            if (item.title === title) {
                if (item.star === 0) {
                    item.star = 1;
                    setFavorite(item);
                    console.log("salve", favorite);
                } else {
                    item.star = 0;
                }
            }
            array.push(item);
        })
        setMyResult(array);
        console.log("star", array);
    }

    function favoriteFilter() {
        let array = [];
        myResult.map((item, key) => {

            if (item.star === 1) {
                array.push(item);
            }
        });
        console.log("array f", array);
        setFavorite(array);
        setStar([0]);
    }

    useEffect(() => {
        console.log("favorite", favorite);
        setMyResult(favorite);
    }, [star]);

    function buildPage(id: string) {
        if (myResult.filter(myResult => myResult.id === id)) {
            const book = myResult.filter(myResult => myResult.id === id);
            setActive(book);
            console.log("my");
        }
        // if(myResult.filter(favorite => favorite.id === id)){
        //     const book = favorite.filter(favorite => favorite.id === id);
        //     setActive(book);
        //     console.log("fa");
        // }
    }

    useEffect(() => {
        setActiveBook(active);
        console.log("eu", activeBook);
    }, [active])

    const aut = key.slice(62, 101);
    return (
        <BooksContext.Provider
            value={{
                newBook,
                search,
                result,
                myResult,
                favoriteBook,
                favoriteFilter,
                bookList,
                totalItems,
                buildPage,
                activeBook
            }}>
            {children}
        </BooksContext.Provider>
    )

}

export const useBooks = () => {
    return useContext(BooksContext);
}

