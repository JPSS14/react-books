import { useBooks } from '../../contexts/BooksContext';
import autocomplete from '../../../autocomplete.json';
import { AiOutlineSearch, AiFillStar } from 'react-icons/ai';
import style from './Search.module.scss';

export function Search() {
    const { newBook, search, favoriteFilter } = useBooks();
    return (
        <div className={style.search}>

            <button className={style.favoriteButton} onClick={favoriteFilter}>
                <span className={style.buttonText}>Favoritos</span>
                <AiFillStar className={style.buttonIconLeft} />
            </button>

            <input list="teste" onChange={newBook} type="text" placeholder="digite um livro" />
            <datalist id="teste" className={style.teste}>
                {autocomplete.map((item, key) =>
                    item.nome ?
                        <option value={item.nome} className={style.teste} key={key}></option> : <></>
                )}
            </datalist>

            <button onClick={search}>
                <AiOutlineSearch className={style.buttonIconRight} />
                <span className={style.buttonText}>Pesquisar</span>
                </button>
                
        </div>
    );
}