import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useBooks } from '../../contexts/BooksContext';
import { AiOutlineStar, AiTwotoneStar } from 'react-icons/ai';
import style from '../../styles/book.module.scss';

export default function Book() {
    const router = useRouter();
    const { activeBook, buildPage } = useBooks();
    useEffect(() => {
        buildPage(router.query.book);
    }, [])

    const teste = activeBook;
    console.log("teste", teste);
    return (
        <main className={style.bookMain}>
            {teste.map((item, key) =>



                <article key={key} className={style.resultArticle}>
                    <header>
                        <h2>{item.title}</h2>
                    </header>

                    <div className={style.imgContainer}>
                        <img src={item.img} alt={item.title} title={item.title} className={item.img === "/sem-img.png" ? style.semImg : ""} />
                    </div>

                    <h3>Descrição</h3>
                    <div className={style.description}>
                        <p>{item.description}</p>
                    </div>

                    {item.saleability === "FOR_SALE" ?
                        (
                            <div className={style.buttonBox}>
                                <div className={style.suport}>
                                    <a href={item.buy} target="_blank">
                                        Comprar
                                    </a>
                                </div>
                            </div>
                        ) :
                        (<div className={style.buttonBox}>
                            <button className={style.notForSale}>Comprar</button>
                            <p>Livro não disponivel</p>
                        </div>
                        )
                    }


                    {/* <div className={style.starContainer}>
                    {item.star === 0 ? <AiOutlineStar className={style.starVoid} onClick={(e) => favoriteBook(item.title)} key={key} /> : <AiTwotoneStar onClick={(e) => favoriteBook(item.title)} key={key} className={style.starFull} />}
                </div> */}

                    <footer>
                        <p>Publicado: {item.data === undefined ? "Sem data" : item.data}</p>
                    </footer>
                </article>


            )}
        </main>
    );
}