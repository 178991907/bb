'use server';

import { getPool } from '@/lib/database';
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
  const pool = getPool();
  const client = await pool.connect();

  try {
    const result = await client.query<Category>('SELECT id, name, slug, icon, "createdDate" FROM categories');
    // Assuming createdDate is stored as a TIMESTAMP and you want it as a string
    return result.rows.map(row => ({
      ...row,
      createdDate: new Date(row.createdDate).toISOString(), // Adjust format as needed
    }));
  } catch (error) {
    console.error('Error getting categories from database:', error);
    // Depending on your error handling strategy, you might want to throw the error
    // or return an empty array/error indicator. Returning empty array for now.
    return [];
  } finally {
    client.release();
  }
}