import * as React from 'react';

interface IProps {
  heading: string,
  description: string,
  releaseDate: string,
  duration: number,
}


const BlogIntro = ({
  heading,
  description,
  releaseDate,
  duration,
}: IProps) => {
  const getCoffeeConsumption = (readTime: number): string => "☕".repeat(Math.floor((readTime / 5))) || "☕";
  const getDurationDateTime = (duration: number): string => {
    const hours: number = duration % 60;
    const minutes: number = duration - (hours * 60);

    return `PT${hours}H${minutes}M0S`;
  }

  return (
    <article>
      <header>
        <h2>{heading}</h2>
        <small>
          <time dateTime={"12341324"}>{releaseDate}</time>
          <span>&middot;</span>
          <span>{getCoffeeConsumption(duration)}</span>
          <time dateTime={"12321"}>{duration}</time>
        </small>
      </header>
      <p>{description}</p>
    </article>
  )
};


export default BlogIntro;