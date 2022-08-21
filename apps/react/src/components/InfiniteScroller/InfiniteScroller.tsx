import { FC, memo, ReactNode, useCallback, useEffect, useRef } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import styles from './InfiniteScroller.module.css';

interface Props {

  /** Load more callback. */
  readonly loadMore: () => void;

  /** Are there other objects. */
  readonly hasMore: boolean;

  /** Are objects loading. */
  readonly isLoading: boolean;

  /** List node. */
  readonly children: ReactNode;

  /** Custom loader. */
  readonly loader?: ReactNode;
}

const InfiniteScrollerComponent: FC<Props> = ({
  loadMore,
  children,
  hasMore,
  isLoading,
  loader,
}) => {
  const interactionElement = useRef(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !isLoading) {
        loadMore();
      }
    },
    [hasMore, isLoading],
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0.2,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (interactionElement.current) {
      observer.observe(interactionElement.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [handleObserver]);

  return (
    <>
      {children}
      <div className={styles['loader-wrapper']}>
        {isLoading && (loader ?? <CircularProgress color="inherit" />)}
      </div>
      <div
        className={styles['interaction-item']}
        ref={interactionElement}
      ></div>
    </>
  );
};

export const InfiniteScroller = memo(InfiniteScrollerComponent);
