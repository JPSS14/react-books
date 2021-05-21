import { useBooks } from "../../contexts/BooksContext"
import { AiOutlineStar, AiTwotoneStar } from 'react-icons/ai';
import style from './ResultSearch.module.scss';

export function ResultSearch() {
    const { result, myResult, favoriteBook } = useBooks();
    return (
        <section>
            {result != [] ?


                (
                    <section className={style.searchResult}>
                        {myResult.map((item, key) =>

                            <article key={key} className={style.resultArticle}>

                                <p>{item.title}</p>
                                <img src={item.img} alt={item.title} title={item.title} className={item.img === "/sem-img.png" ? style.semImg : ""} />

                                {item.star === 0 ? <AiOutlineStar onClick={(e) => favoriteBook(item.title)} key={key} /> : <AiTwotoneStar onClick={(e) => favoriteBook(item.title)} key={key} />}

                            </article>

                        )}
                    </section>
                )
                :
                (<></>)
            }
        </section>
    );

}