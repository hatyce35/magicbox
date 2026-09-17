import React, { useState } from 'react';
import { Download, Share2, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Language } from '../types/game';
import { translations } from '../data/localization';

interface Props {
  language: Language;
}

export const PWAInstallButton: React.FC<Props> = ({ language }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const t = translations[language];

  if (isInstalled) {
    return null;
  }

  if (isInstallable) {
    return (
      <button
        id="btn-install-pwa"
        onClick={install}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-600/80 hover:bg-violet-600 text-white text-xs font-semibold shadow-md transition-all active:scale-95 border border-violet-400/40"
      >
        <Download className="w-3.5 h-3.5" />
        <span>{t.installApp}</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          id="btn-install-ios"
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-600/80 hover:bg-violet-600 text-white text-xs font-semibold shadow-md transition-all active:scale-95 border border-violet-400/40"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{t.installApp}</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <div className="w-full max-w-xs rounded-2xl bg-slate-900 border border-violet-500/30 p-5 shadow-2xl text-white">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-bold text-violet-200">
                  {language === 'tr' ? 'iPhone / iPad’e Yükle' : 'Install on iPhone / iPad'}
                </h3>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 rounded-full hover:bg-white/10"
                >
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              </div>
              <p className="text-sm text-slate-300 space-y-2">
                {language === 'tr' ? (
                  <>
                    1. Safari alt menüsündeki <Share2 className="inline w-3.5 h-3.5 mx-1 text-sky-400" /> <strong>Paylaş</strong> simgesine dokunun.<br />
                    2. Listeden <strong>Ana Ekrana Ekle</strong> seçeneğini seçin.
                  </>
                ) : (
                  <>
                    1. Tap the <Share2 className="inline w-3.5 h-3.5 mx-1 text-sky-400" /> <strong>Share</strong> button in Safari toolbar.<br />
                    2. Scroll down and tap <strong>Add to Home Screen</strong>.
                  </>
                )}
              </p>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-4 w-full py-2 rounded-xl bg-violet-600 font-semibold text-xs text-white hover:bg-violet-500"
              >
                {t.close}
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
