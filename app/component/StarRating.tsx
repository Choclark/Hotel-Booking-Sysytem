import React from 'react';

const Star = ({ filled }: { filled: boolean }) => {
  return (
    <span className={`text-green-400 ${filled ? 'fas fa-star' : 'fas fa-star-half-alt'}`}></span>
  );
};

const StarRating = ({ rate }: { rate: number }) => {
  const fullStars = Math.floor(rate); // Number of full stars
  const hasHalfStar = rate % 1 !== 0; // Determine if there is a half star

  return (
    <div className="flex gap-1 items-center">
      {/* Render full stars */}
      {[...Array(fullStars? fullStars : 0)].map((_, i) => (
        <Star key={i} filled={true} />
      ))}
      {/* Render half star if necessary */}
      {hasHalfStar && <Star filled={false} />}
    </div>
  );
};

export default StarRating