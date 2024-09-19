import React from 'react';

interface DateComponentProps {
    date: Date;
}

export const DateComponent: React.FC<DateComponentProps> = ({ date }) => {
  // Formatea la fecha
    const newDate = new Date(date);
  const formattedDate = newDate ? newDate.toLocaleDateString('es-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }): 'Date not available';
  console.log(formattedDate);
  return (
    <div>
      
        {formattedDate}
      
    </div>
  );
};