import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import axios from 'axios';

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
    favorite: any[];
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

    // Recebe o livro que foi digitado
    function newBook(e: any) {
        setBook(e.target.value);
    }

    // Envia o livro para a API e salva os resultados
    function search(e) {
        e.preventDefault();
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${book}&maxResults=40`)
            .then(info => {
                console.log(info.data.items);
                setTotalItems(info.data.totalItems);

                setResult(info.data.items);
            });
    }

    // 1) Pega os resultados da API e salva em um State local, para evitar chamdas desnecessárias a API 
    // 2) verifica se possuí imagem ou não, se não possuir insere uma imagem sem fundo
    // 3) Compara com a lista de favoritos, se o elemento existir na lista de favoritos a estrela é preenchida
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
                favorite.map((item2, key) => {
                    if (item.volumeInfo.title === item2.title) {
                        tes = {
                            id: item.id,
                            title: item.volumeInfo.title,
                            img: "/sem-img.png",
                            description: item.volumeInfo.description,
                            saleability: item.saleInfo.saleability,
                            buy: item.saleInfo.buyLink,
                            star: 1
                        }

                    } else {
                        tes = {
                            id: item.id,
                            title: item.volumeInfo.title,
                            img: "/sem-img.png",
                            description: item.volumeInfo.description,
                            saleability: item.saleInfo.saleability,
                            buy: item.saleInfo.buyLink,
                            star: 0
                        }
                    }
                })
            }
            array.push(tes);
        });
        console.log("tes", array);
        setMyResult(array);

    }, [result]);

    // Constrói o bookList para a paginação
    useEffect(() => {
        setBookList(myResult.slice(0, totalItems));
    }, [myResult]);

    // Quando clicar na estrela o livro é salvo na lista de favoritos, e a estrela é preenchida
    function favoriteBook(id: string) {
        let array = [];
        let salvos = favorite;
        myResult.map((item, key) => {
            if (item.id === id) {
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

    // Monta um array e inseri ele nos favoritos
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

    // Filtra os resultados em favoritos
    useEffect(() => {
        console.log("favorite", favorite);
        setMyResult(favorite);
    }, [star]);

    // Busca o livro baseado no id que foi passado na url
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

    // Recebe o resultado do buildPage e ativa um livro para que a pagina seja carregada com as suas informações
    useEffect(() => {
        setActiveBook(active);
        console.log("eu", activeBook);
    }, [active])

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
                activeBook,
                favorite
            }}>
            {children}
        </BooksContext.Provider>
    )

}

// Função para chamar o context, com o objetivo de economizar linhas de código nas chamadas a esse context
export const useBooks = () => {
    return useContext(BooksContext);
}