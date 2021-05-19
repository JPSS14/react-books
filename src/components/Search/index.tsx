import { useBooks } from '../../contexts/BooksContext';
import autocomplete from '../../../autocomplete.json';
import style from './Search.module.scss';

export function Search() {
    const {newBook, search} = useBooks();
    return (
        <div className={style.search}>
            <input list="teste" onChange={newBook} type="text" placeholder="digite um livro" />
            <datalist id="teste">
                {autocomplete.map((item, key) =>
                    item.nome ?
                        <option value={item.nome} key={key}></option> : <></>
                )}
            </datalist>
            <button onClick={search}>Pesquisar</button>
        </div>
    );
}