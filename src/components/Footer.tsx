import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-[#131722] border-t border-[#E0E3EB] dark:border-[#2A2E39] py-12 mt-auto transition-colors">
      <div className="max-w-[1280px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-sm font-medium text-[#6A6D78] dark:text-[#808392]">
          © 2025 TradingView Pro Terminal • Powered by Gemini AI
        </div>
        <ul className="flex flex-wrap items-center gap-6">
          <li>
            <a
              href="#"
              className="text-xs font-semibold uppercase tracking-wider text-[#6A6D78] dark:text-[#808392] hover:text-[#2962FF] dark:hover:text-[#2962FF] hover:underline transition-all"
            >
              Overview
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-xs font-semibold uppercase tracking-wider text-[#6A6D78] dark:text-[#808392] hover:text-[#2962FF] dark:hover:text-[#2962FF] hover:underline transition-all"
            >
              Markets
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-xs font-semibold uppercase tracking-wider text-[#6A6D78] dark:text-[#808392] hover:text-[#2962FF] dark:hover:text-[#2962FF] hover:underline transition-all"
            >
              Sectors
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-xs font-semibold uppercase tracking-wider text-[#6A6D78] dark:text-[#808392] hover:text-[#2962FF] dark:hover:text-[#2962FF] hover:underline transition-all"
            >
              AI Terminal
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

