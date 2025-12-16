import Link from 'next/link';
import styles from './page.module.css';
import MealsGrid from '@/components/meals/meals-grid';
import { getMeals } from '@/lib/meals';
import { Suspense } from 'react';

//Static MetaData
// export const metadata = {
//   title: 'All Meals',
//   description: 'Browse the Delicious meals shared by food-loving community.',
// };

async function Meals() {
  const meals = getMeals();
  return <MealsGrid meals={meals} />;
}

export default function MealsPage() {
  return (
    <>
      <header className={styles.header}>
        <h1>
          Delicious meals, created <span className={styles.highlight}>by you</span>
        </h1>
        <p>Choose your favorite recipe and cook it your self, It is easy and </p>
        <p className={styles.cta}>
          <Link href="/meals/share">Share you favorite Recipe</Link>
        </p>
      </header>
      <main className={styles.main}>
        <Suspense fallback={<p className={styles.loading}>fetching Meals</p>}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
