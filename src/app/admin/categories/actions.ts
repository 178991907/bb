'use server';

import { Pool } from 'pg';


export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  createdDate: string; // Or Date depending on how you handle dates
}

/**
 * Server Action to get a list of all categories from the database.
 * @returns A promise that resolves with an array of Category objects.
 */
export async function getCategoriesAction(): Promise<Category[]> {
  const db = await getDb();

  if (!db) {
    console.warn('Database not initialized. Cannot get categories.');
    return []; // Return empty array if database is not connected
  }
  try {
    const categories = await db('categories').select('id', 'name', 'slug', 'icon', 'createdDate');
    return categories as Category[]; // Type assertion
  } catch (error) {
    console.error('Error getting categories from database:', error);
    // Depending on your error handling strategy, you might want to throw the error
    // or return an empty array/error indicator. Returning empty array for now.
    return [];
  } finally {
    client.release();
}

/**
 * Server Action to create a new category in the database.
 * @param categoryData - The category data to create.
 * @returns A promise that resolves with an object indicating success or failure.
 */
export async function createCategoryAction(categoryData: Omit<Category, 'id' | 'createdDate'>): Promise<{ success: boolean; message: string; }> {
  const pool = getPool();
  const client = await pool.connect();

  try {
    // Generate a new UUID for the category ID
    const newCategoryId = uuidv4();
    const now = new Date();

    const result = await client.query(
      'INSERT INTO categories(id, name, slug, icon, "createdDate") VALUES($1, $2, $3, $4, $5)',
      [newCategoryId, categoryData.name, categoryData.slug, categoryData.icon, now]
    );

    console.log('Category inserted successfully:', newCategoryId);
    return { success: true, message: 'Category created successfully!' };
  } catch (error) {
    console.error('Error creating category in Server Action:', error);
    return { success: false, message: 'Failed to create category.' };
  } finally {
    client.release();
  }
}