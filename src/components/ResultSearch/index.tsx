import { useBooks } from "../../contexts/BooksContext"
import { AiOutlineStar, AiTwotoneStar } from 'react-icons/ai';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import style from './ResultSearch.module.scss';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from "react";

export function ResultSearch() {
    const { result, myResult, favoriteBook, bookList, totalItems } = useBooks();


    const [pageNumber, setPageNumber] = useState(0);

    const booksPerPage = 12;
    const pagesVisited = pageNumber * booksPerPage;

    const displayBook = bookList.slice(pagesVisited, pagesVisited + booksPerPage).map((item, key) => {
        return (

            <article key={key} className={style.resultArticle}>
                <header>
                    <h2>{item.title}</h2>
                </header>

                <div className={style.imgContainer}>
                    <img src={item.img} alt={item.title} title={item.title} className={item.img === "/sem-img.png" ? style.semImg : ""} />
                </div>

                <Link href={`/livro/${item.id}`}>
                    <button>Ver mais</button>
                </Link>

                <div className={style.starContainer}>
                    {item.star === 0 ? <AiOutlineStar className={style.starVoid} onClick={(e) => favoriteBook(item.title)} key={key} /> : <AiTwotoneStar onClick={(e) => favoriteBook(item.title)} key={key} className={style.starFull} />}
                </div>

                <footer>
                    <p>Publicado: {item.data === undefined ? "Sem data" : item.data}</p>
                </footer>
            </article>
        )
    });
    const pageCount = Math.ceil(bookList.length / booksPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    };
    return (


        <section className={style.searchResult}>
            {displayBook}

            <div className={style.pagination}>
                <ReactPaginate
                    previousLabel={<FaArrowAltCircleLeft/>}
                    nextLabel={<FaArrowAltCircleRight/>}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={style.paginationButtons}
                    previousLinkClassName={style.previousButton}
                    nextLinkClassName={style.nextButton}
                    disabledClassName={style.paginationDisabled}
                    activeClassName={style.paginationActive}
                />
            </div>
        </section>



        // <>
        //     {result != [] ?
        //         (
        //             <section className={style.searchResult}>
        //                 {myResult.map((item, key) =>

        //                     <article key={key} className={style.resultArticle}>
        //                         <header>
        //                             <h2>{item.title}</h2>
        //                         </header>

        //                         <div className={style.imgContainer}>
        //                             <img src={item.img} alt={item.title} title={item.title} className={item.img === "/sem-img.png" ? style.semImg : ""} />
        //                         </div>

        //                         <Link href={`/livro/${item.id}`}>
        //                             <button>Ver mais</button>
        //                         </Link>

        //                         <div className={style.starContainer}>
        //                             {item.star === 0 ? <AiOutlineStar className={style.starVoid} onClick={(e) => favoriteBook(item.title)} key={key} /> : <AiTwotoneStar onClick={(e) => favoriteBook(item.title)} key={key} className={style.starFull} />}
        //                         </div>

        //                         <footer>
        //                             <p>Publicado: {item.data === undefined ? "Sem data" : item.data}</p>
        //                         </footer>
        //                     </article>

        //                 )}
        //             </section>
        //         )
        //         :
        //         (<></>)
        //     }
        // </>
    );

}