import { useBooks } from "../../contexts/BooksContext"
import { AiOutlineStar, AiTwotoneStar } from 'react-icons/ai';
import style from './ResultSearch.module.scss';

export function ResultSearch() {
    const { result, myResult, favoriteBook } = useBooks();
    return (
        <>
            {result != [] ?


                (
                    <section className={style.searchResult}>
                        {myResult.map((item, key) =>

                            <article key={key} className={style.resultArticle}>
                                <header>
                                    <h2>{item.title}</h2>
                                </header>
                                
                                <div className={style.imgContainer}>
                                    <img src={item.img} alt={item.title} title={item.title} className={item.img === "/sem-img.png" ? style.semImg : ""} />
                                </div>

                                <button>Ver mais</button>

                                <div className={style.starContainer}>
                                    {item.star === 0 ? <AiOutlineStar className={style.starVoid} onClick={(e) => favoriteBook(item.title)} key={key} /> : <AiTwotoneStar onClick={(e) => favoriteBook(item.title)} key={key} className={style.starFull} />}
                                </div>

                                <footer>
                                    <p>Publicado: {item.data === undefined ? "Sem data" : item.data}</p>
                                </footer>
                            </article>

                        )}
                    </section>
                )
                :
                (<></>)
            }
        </>
    );

}