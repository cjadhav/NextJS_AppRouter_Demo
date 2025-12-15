import Image from 'next/image';
import Link from 'next/link';

import styles from './main-header.module.css';
import imgLogo from '@/assets/logo.png';
import HeaderBackground from './main-header-background';
import NavLink from '../nav-link';

export default function MainHeader() {
  return (
    <>
      <HeaderBackground />
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          <Image src={imgLogo} alt="logo" priority />
          NextLevel Food
        </Link>
        <nav className={styles.nav}>
          <ul>
            <li>
              <NavLink href={'/meals'}> Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href={'/community'}> Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
