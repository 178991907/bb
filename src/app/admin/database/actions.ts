
'use server';

import { Client } from 'pg';
import { createLink, getPool } from '@/lib/database'; // Import necessary functions

interface ConnectionResult {
  success: boolean;
  message: string;
}

export async function testDatabaseConnectionAction(dbUrl: string): Promise<ConnectionResult> {
  if (!dbUrl) {
    return { success: false, message: '数据库连接字符串不能为空。' };
  }

  let client: Client | null = null;
  try {
    client = new Client({
      connectionString: dbUrl,
      ssl: {
        rejectUnauthorized: false, // 根据您的数据库提供商的 SSL 要求进行调整
      },
      connectionTimeoutMillis: 5000, // 添加连接超时
    });

    await client.connect();
    // 可选：执行一个简单查询以进一步验证连接
    // await client.query('SELECT 1');
    return { success: true, message: '数据库连接成功！' };
  } catch (error: any) {
    console.error('数据库连接测试失败 (Server Action):', error);
    return { success: false, message: `连接失败: ${error.message}` };
  } finally {
    if (client) {
      try {
        await client.end();
      } catch (closeError) {
        console.error('关闭数据库连接时出错 (Server Action):', closeError);
      }
    }
  }
}

// Server action to create a new category
export async function createCategory(categoryData: { name: string; slug: string; icon?: string }): Promise<ConnectionResult> {
  const pool = getPool();
  const client = await pool.connect();
  try {
    const { name, slug, icon } = categoryData;
    if (!name || !slug) {
      return { success: false, message: '分类名称和 slug 不能为空。' };
    }

    // Basic insertion into categories table
    await client.query(
      'INSERT INTO categories(id, name, slug, "createdDate", icon) VALUES(gen_random_uuid(), $1, $2, NOW(), $3)',
      [name, slug, icon]
    );

    console.log('Category created successfully:', name);
    return { success: true, message: '分类创建成功！' };
  } catch (error: any) {
    console.error('Error creating category:', error);
    return { success: false, message: `分类创建失败: ${error.message}` };
  } finally {
    client.release();
  }
}

// Server action to create a new link
export async function createLinkAction(linkData: any): Promise<ConnectionResult> {
  try {
    // Assuming createLink in src/lib/database.ts handles the insertion logic
    // You might need to adjust the type of linkData based on your LinkItem interface
    await createLink(linkData);
    console.log('Link created successfully:', linkData.title);
    return { success: true, message: '链接创建成功！' };
  } catch (error: any) {
    console.error('Error creating link:', error);
    return { success: false, message: `链接创建失败: ${error.message}` };
  }
}
