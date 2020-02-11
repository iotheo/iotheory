import * as React from 'react';
import format from 'date-fns/format';

interface IProps {
  title: string,
  description: string,
  releaseDate: Date,
  duration: number,
}


const BlogIntro: React.FC<IProps> = ({
  title,
  description,
  releaseDate,
  duration,
}: IProps) => {
  const getCoffeeConsumption = (_duration: number): string => '☕'.repeat(Math.floor((_duration / 5))) || '☕';
  const getDurationDateTime = (_duration: number): string => {
    const hours: number = _duration % 60;
    const minutes: number = _duration - (hours * 60);

    return `PT${hours}H${minutes}M0S`;
  };

  return (
    <article>
      <header>
        <h2>{title}</h2>
        <small>
          <time dateTime="12341324">{format(releaseDate, 'dd MMM yyyy')}</time>
          <span>&middot;</span>
          <span>{getCoffeeConsumption(duration)}</span>
          <time dateTime={getDurationDateTime(duration)}>{duration}</time>
        </small>
      </header>
      <p>{description}</p>
    </article>
  );
};


export default BlogIntro;
