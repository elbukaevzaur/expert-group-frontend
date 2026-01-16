import React from 'react';
import styles from './pagination.module.css'

interface DotPaginationProps {
  totalSteps: number;
  currentStep: number;
  onChange?: (index: number) => void;
}

const PaginationComponent: React.FC<DotPaginationProps> = ({ 
  totalSteps, 
  currentStep, 
  onChange 
}) => {
  return (
    <div className={styles.paginationContainer}>
      {Array.from({ length: totalSteps }).map((_, index) => {
        const isActive = index === currentStep;
        
        return (
          <button
            key={index}
            onClick={() => onChange?.(index)}
            className={`${styles.dot} ${isActive ? styles.active : styles.inactive}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        );
      })}
    </div>
  );
};

export default PaginationComponent;