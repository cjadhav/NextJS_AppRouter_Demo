import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import fs from 'node:fs';

const db = sql('meals.db');

//.all for get multiple rows
//.get for get single row
//.run for insert, update, delete
export function getMeals() {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  const stmt = db.prepare('SELECT * FROM meals');
  return stmt.all();
  // throw new Error('Loading meals failed');
}

export function getMeal(slug) {
  // const stmt = db.prepare('SELECT * FROM meals WHERE slug = ?');
  // return stmt.get(slug);
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(objMeal) {
  objMeal.slug = slugify(objMeal.title, { lower: true });
  objMeal.instructions = xss(objMeal.instructions);

  const extension = objMeal.image.name.split('.').pop();
  const fileName = `${objMeal.slug}.${extension}`;
  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await objMeal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error('Saving Image Failed!');
    }
  });

  objMeal.image = `/images/${fileName}`;

  db.prepare(
    `
    INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)`
  ).run(objMeal);
}
