// Settings.tsx
import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="bg-[#F0F0F0] dark:bg-zinc-700 p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">تنظیمات</h2>
      <div className="mt-4 space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">تغییر زبان</span>
          <select className="p-2 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-gray-600 rounded-md">
            <option>فارسی</option>
            <option>انگلیسی</option>
          </select>
        </div>
        {/* تنظیمات دیگر */}
      </div>
    </div>
  );
};

export default Settings;
