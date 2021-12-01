import * as React from "react";
import Link from "next/link";
import format from "date-fns/format";

const WORDS_PER_MINUTE: number = 265; // According to Medium and Dev.to

const wordCount = (text: string): number => text.split(" ").length;
const getEstimatedReadTime = (wordCount: number) =>
  Math.round(wordCount / WORDS_PER_MINUTE);

const getCoffeeConsumption = (durationInMinutes: number): string =>
  "☕".repeat(Math.round(durationInMinutes / 5)) || "☕";

const getDurationDateTime = (duration: number): string => {
  const hours: number = Math.floor(duration / 60);
  const minutes: number = duration - hours * 60;

  return `PT${hours}H${minutes}M0S`;
};

interface IProps {
  title: string;
  description: string;
  releaseDate: Date;
  slug: string;
  content: string;
}

const BlogIntro: React.FC<IProps> = ({
  title,
  description,
  releaseDate,
  slug,
  content,
}: IProps) => {
  const readTime = getEstimatedReadTime(wordCount(content));

  return (
    <article>
      <header>
        <h2>
          <Link href="blog/[slug]" as={`blog/${slug}`}>
            <a>{title}</a>
          </Link>
        </h2>
        <small>
          <time dateTime={format(releaseDate, "yyyy-mm-dd")}>
            {format(releaseDate, "dd MMM yyyy")}
          </time>
          <span>&nbsp;&middot; {getCoffeeConsumption(readTime)}&nbsp;</span>
          <time dateTime={getDurationDateTime(readTime)}>
            {readTime} min read
          </time>
        </small>
      </header>
      <p>{description}</p>
    </article>
  );
};

export default BlogIntro;
