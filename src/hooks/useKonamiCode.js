import { useEffect, useState } from 'react';

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

export function useKonamiCode() {
  const [activated, setActivated] = useState(false);
  const sequenceRef = { current: [] };

  useEffect(() => {
    const onKey = (e) => {
      sequenceRef.current.push(e.key);
      sequenceRef.current = sequenceRef.current.slice(-KONAMI.length);
      if (sequenceRef.current.join(',') === KONAMI.join(',')) {
        setActivated(true);
        setTimeout(() => setActivated(false), 4000);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return activated;
}
