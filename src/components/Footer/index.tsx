import style from './Footer.module.scss';

export function Footer() {
    return (
        <header className={style.mainFooter}>
            <h1>React <span className={style.theme}>Books</span></h1>
        </header>
    );
}