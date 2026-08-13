import React, { useEffect, useState } from 'react';
import { MessageSquare, AlertCircle } from 'lucide-react';

export const DisqusForum: React.FC = () => {
  const [loadError, setLoadError] = useState<boolean>(false);

  useEffect(() => {
    try {
      // Configure Disqus window object safely
      (window as any).disqus_config = function (this: any) {
        this.page.url = window.location.href;
        this.page.identifier = 'tradingview_apex_forum';
      };

      // 1. Embed Disqus Thread Script
      if ((window as any).DISQUS) {
        try {
          (window as any).DISQUS.reset({
            reload: true,
            config: (window as any).disqus_config,
          });
        } catch (e) {
          console.warn('Disqus reset error:', e);
        }
      } else if (!document.getElementById('disqus-embed-script')) {
        const d = document;
        const s = d.createElement('script');
        s.id = 'disqus-embed-script';
        s.src = 'https://agenti-ai-sample1.disqus.com/embed.js';
        s.setAttribute('data-timestamp', `${+new Date()}`);
        s.async = true;
        s.onerror = (e) => {
          console.warn('Disqus embed script failed to load:', e);
          setLoadError(true);
        };
        (d.head || d.body).appendChild(s);
      }

      // 2. Load Disqus Comment Count Script safely
      if (!document.getElementById('dsq-count-scr')) {
        const countScript = document.createElement('script');
        countScript.id = 'dsq-count-scr';
        countScript.src = 'https://agenti-ai-sample1.disqus.com/count.js';
        countScript.async = true;
        countScript.onerror = (e) => {
          console.warn('Disqus count script failed to load:', e);
        };
        (document.head || document.body).appendChild(countScript);
      }
    } catch (err) {
      console.warn('Disqus forum initialization error:', err);
      setLoadError(true);
    }
  }, []);

  return (
    <section className="w-full bg-white dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] rounded-2xl p-6 shadow-xs transition-colors">
      <div className="flex items-center justify-between border-b border-[#E0E3EB] dark:border-[#2A2E39] pb-4 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-[#2962FF] text-white rounded-lg shadow-xs">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-[#181c21] dark:text-white">
              Community Discussion & Market Forum
            </h3>
            <p className="text-xs text-[#6A6D78] dark:text-[#808392]">
              Share trader insights, technical ideas, and discuss market sentiment
            </p>
          </div>
        </div>
        <a
          href="#disqus_thread"
          className="text-xs font-bold px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-[#2962FF] border border-[#2962FF]/20"
        >
          Comments
        </a>
      </div>

      {loadError && (
        <div className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 p-3 rounded-lg border border-amber-200 dark:border-amber-900/40 mb-4 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Discussion forum script could not be loaded directly in preview mode (cross-origin browser restrictions). Open app in a new tab or visit Disqus to participate.</span>
        </div>
      )}

      {/* Disqus Container */}
      <div id="disqus_thread" className="min-h-[200px]" />
      <noscript>
        Please enable JavaScript to view the{' '}
        <a href="https://disqus.com/?ref_noscript" className="text-[#2962FF] underline">
          comments powered by Disqus.
        </a>
      </noscript>
    </section>
  );
};
