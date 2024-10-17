import React from 'react';
import Link from 'next/link';
import { useUser } from "../lib/UserContext";
import styles from "../styles/Home.module.css";

const Header = () => {
    const { user } = useUser();

    return (
        <header className={styles.header}>
          

            <ul className={styles.headerNav}>
                <li>
                    <Link href="/">
                        <a className={styles.headerLink}>Home</a>
                    </Link>

                    {/* Condicional para mostrar o link de Produtos apenas se o usuário for o admin */}
                    {user && user.email === 'admin@admin.com' && (
                        <Link href="/App">
                            <a className={styles.headerLink}>Produtos</a>
                        </Link>
                    )}

                    {!user ? (
                        <>
                            <Link href="/sign-up">
                                <a className={styles.headerLink}>Sign</a>
                            </Link>
                            <Link href="/login">
                                <a className={styles.headerLink}>Login</a>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/logout">
                                <a className={styles.headerLink}>Logout</a>
                            </Link>
                            <Link href="/profile">
                                <a className={styles.headerLink}>Profile</a>
                            </Link>
                        </>
                    )}
                </li>
            </ul>
        </header>
    );
};

export default Header;
