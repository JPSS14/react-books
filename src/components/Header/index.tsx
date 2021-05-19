import style from './Header.module.scss';

export function Header() {
    return (
        <header className={style.mainHeader}>
            <h1>React <span className={style.theme}>Books</span></h1>
        </header>
    );
}