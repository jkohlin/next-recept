import { PostContent } from "../lib/posts";
import Date from "./Date";
import Link from "next/link";
import { parseISO } from "date-fns";

type Props = {
  post: PostContent;
};
export default function PostItem({ post }: Props) {
  return (
    <Link href={"/posts/" + post.slug}>
      <a>
        <h2 className="recept">{post.title} <span className={'tag'}>{post.tags[0]}</span></h2>
        <style jsx>
          {`
            a {
              color: #222;
              display: inline-block;
            }
            h2 {
              margin: 0;
              font-weight: 500;
            }
            .tag {
              font-weight: 300;
              font-size: 0.8rem;
              display: inline-block;
              border: solid 1px #9AB9C0;
              border-radius: 1rem;
              padding: 0.4rem 0.7rem;
              margin-left: 1rem;
              color: #323D3F;
              background-color: rgba(235, 235, 222, 0.14);
              position: relative;
              bottom: 5px;
            }
          `}
        </style>
      </a>
    </Link>
  );
}
