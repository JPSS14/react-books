import { useBooks } from '../../contexts/BooksContext';
import style from './Search.module.scss';

export function Search() {
    const {newBook, autocomplete, search} = useBooks();
    return (
        <div className={style.search}>
            <input list="teste" onChange={newBook} type="text" placeholder="digite um livro" />
            <datalist id="teste">
                {autocomplete.map((item, key) =>
                    item.volumeInfo.title ?
                        <option value={item.volumeInfo.title} key={key}></option> : <></>
                )}
            </datalist>
            <button onClick={search}>Pesquisar</button>
        </div>
    );
}