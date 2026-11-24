// src/components/GameCardDeck.tsx
import { useRef, useState } from 'react';

import styles from './OneGameCardDeck.module.css';

interface OneGameCardDeckProps {
  cards: string[];
  gameName: string;
  onClose: () => void;
}

export default function OneGameCardDeck({
  cards,
  gameName,
  onClose
}: OneGameCardDeckProps) {
  // Blanda ordningen eller välj ett slumpat startkort
  const [deck, setDeck] = useState<string[]>(() =>
    [...cards].sort(() => Math.random() - 0.5)
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  // Drag & Swipe states
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [swipeOutDirection, setSwipeOutDirection] = useState<'left' | 'right' | null>(
    null
  );
  const startPos = useRef({ x: 0, y: 0 });

  function handleNextCard() {
    setSwipeOutDirection(null);
    setDragOffset({ x: 0, y: 0 });

    if (currentIndex < deck.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setDeck([...cards].sort(() => Math.random() - 0.5));
      setCurrentIndex(0);
    }
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (swipeOutDirection) {
      return;
    }
    setIsDragging(true);
    startPos.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDragging || swipeOutDirection) {
      return;
    }
    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;
    setDragOffset({ x: dx, y: dy });
  }

  function handlePointerUp() {
    if (!isDragging || swipeOutDirection) {
      return;
    }
    setIsDragging(false);

    const SWIPE_THRESHOLD = 40; // Pixlar att dra för att trigga swipe

    if (dragOffset.x > SWIPE_THRESHOLD) {
      // Swipe höger (t.ex. Klar / Poäng)
      setSwipeOutDirection('right');
      setTimeout(handleNextCard, 220);
    } else if (dragOffset.x < -SWIPE_THRESHOLD) {
      // Swipe vänster (t.ex. Passa)
      setSwipeOutDirection('left');
      setTimeout(handleNextCard, 220);
    } else {
      // Studsa tillbaka till mitten
      setDragOffset({ x: 0, y: 0 });
    }
  }

  // Beräkna rotation baserat på hur långt man dragit
  const rotation = dragOffset.x * 0.08;
  const currentCard = deck[currentIndex];

  return (
    <div className={styles.overlay}>
      <div className={styles.deckContainer}>
        {/* Topprad med stängknapp och titel */}
        <div className={styles.header}>
          <span className={styles.deckTitle}>{gameName}</span>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Stäng">
            ✕
          </button>
        </div>

        {/* Spelkortet */}

        {/* Det aktiva kortet man sveper */}
        <div
          className={`${styles.card} ${styles.activeCard} ${
            swipeOutDirection ? styles[`flyOut_${swipeOutDirection}`] : ''
          }`}

          style={{
            transform: swipeOutDirection
              ? undefined
              : `translate(${String(dragOffset.x)}px, ${String(dragOffset.y * 0.4)}px) rotate(${String(rotation)}deg)`,
            transition: isDragging ? 'none' : 'transform 0.25s ease, opacity 0.2s ease',
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {/* Tinder-stämplar vid swipe */}
          {dragOffset.x > 35 && (
            <span className={`${styles.stamp} ${styles.stampRight}`}>KLAR</span>
          )}
          {dragOffset.x < -35 && (
            <span className={`${styles.stamp} ${styles.stampLeft}`}>PASSA</span>
          )}
          <span className={styles.cardBadge}>
            Kort {currentIndex + 1} av {deck.length}
          </span>
          <p className={styles.cardText}>{currentCard}</p>
        </div>

        {/* Instruktion / Hjälpknappar */}
        <div className={styles.footerControls}>
          <button
            className={styles.actionBtnPass}
            onClick={() => {
              setSwipeOutDirection('left');
              setTimeout(handleNextCard, 220);
            }}
          >
            ← Passa
          </button>
          <span className={styles.hintText}>Svep kortet</span>
          <button
            className={styles.actionBtnDone}
            onClick={() => {
              setSwipeOutDirection('right');
              setTimeout(handleNextCard, 220);
            }}
          >
            Klar →
          </button>
        </div>
      </div>
    </div>
  );
}
