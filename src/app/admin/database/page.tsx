'use client';

import { useState } from 'react';
import { Client } from 'pg';

export default function DatabaseConfigPage() {
  const [dbUrl, setDbUrl] = useState('');
  const [testResult, setTestResult] = useState<string | null>(null);

  const handleTestConnection = async () => {
    setTestResult('Testing connection...');
    try {
      const client = new Client({
        connectionString: dbUrl,
        ssl: {
          rejectUnauthorized: false, // Adjust based on your database provider's SSL requirements
        },
      });
      await client.connect();
      setTestResult('Connection successful!');
      await client.end();
    } catch (error: any) {
      setTestResult(`Connection failed: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">数据库配置</h1>
      <div className="mb-4">
        <label htmlFor="dbUrl" className="block text-sm font-medium text-gray-700">
          数据库连接字符串
        </label>
        <input
          type="text"
          id="dbUrl"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={dbUrl}
          onChange={(e) => setDbUrl(e.target.value)}
        />
      </div>
      <button
        onClick={handleTestConnection}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        测试连接
      </button>
      {testResult && (
        <div className="mt-4 p-3 bg-gray-100 rounded-md whitespace-pre-wrap">
          <p className="font-medium">测试结果:</p>
          <p>{testResult}</p>
        </div>
      )}
    </div>
  );
}