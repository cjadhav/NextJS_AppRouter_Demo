'use server';

import { redirect } from 'next/navigation';
import { saveMeal } from './meals';
import { revalidatePath } from 'next/cache';

const isInvalidText = (text) => {
  if (!text || text.trim() === '') return false;
  else return true;
};

export const shareMeal = async (prevState, formData) => {
  //   'use server';
  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes('@') ||
    !meal.image ||
    meal.image.size === 0
  ) {
    // throw new Error('Invalid input');
    return {
      message: 'Invalid input',
    };
  }

  await saveMeal(meal);
  revalidatePath('/meals', 'layout'); //use to clear cache and next redirect it will fetch from backend.
  redirect('/meals');
};
