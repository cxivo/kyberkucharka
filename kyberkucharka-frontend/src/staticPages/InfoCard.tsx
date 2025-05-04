import { Link } from "react-router";

interface RecipeCardProps {
  title: string;
  text: string;
  link: string;
}

export default function InfoCard({ title, text, link }: RecipeCardProps) {
  return (
    <>
      <Link
        to={link}
        className="info-card"
      >
        <div>
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      </Link>
    </>
  );
}
