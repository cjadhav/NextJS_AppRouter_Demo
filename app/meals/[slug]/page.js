import { use } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import { getMeal } from '@/lib/meals';
import { notFound } from 'next/navigation';

//dynamic MetaData
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const meal = getMeal(slug);
  if (!meal) notFound();
  return {
    title: meal.title,
    description: meal.summary,
  };
}

export default function MealDetailsPage({ params }) {
  //   const { slug } = await params;
  const { slug } = use(params);
  const objMealDetails = getMeal(slug);

  if (!objMealDetails) {
    notFound();
  }

  objMealDetails.instructions = objMealDetails.instructions.replace(/\n/g, '<br/>');

  return (
    <>
      <header className={styles.header}>
        <div className={styles.image}>
          <Image src={objMealDetails.image} alt={objMealDetails.title} fill />
        </div>
        <div className={styles.headerText}>
          <h1>{objMealDetails.title}</h1>
          <p className={styles.creator}>
            by <a href={`mailto: ${objMealDetails.creator_email}`}>{objMealDetails.creator}</a>
          </p>
          <p className={styles.summary}>{objMealDetails.summary}</p>
        </div>
      </header>
      <main>
        <p className={styles.instructions} dangerouslySetInnerHTML={{ __html: objMealDetails.instructions }}></p>
      </main>
      <p>{slug}</p>
    </>
  );
}
