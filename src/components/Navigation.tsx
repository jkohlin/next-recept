import { GetStaticProps} from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import Burger from "./Burger";
import { useState } from "react";
import { listTags, TagContent } from "../lib/tags";

export default function Navigation() {
  const tags = listTags()
  const router = useRouter();
  const [active, setActive] = useState(false);
  return (
    <>
      <Burger active={active} onClick={() => setActive(!active)} />
      <div className={"container " + (active ? "active" : "")}>
        <ul>
          {/* <li>
            <Link href="/">
              <a className={router.pathname === "/posts" ? "active" : null}>Hem</a>
            </Link>
          </li> */}
          <li>
            <Link href="/posts/">
              <a
                className={
                  router.pathname.startsWith("/") ? "active" : null
                }
              >
                Alla recept
              </a>
            </Link>
          </li>
          <li>
            <hr/>
          </li>
          {tags.map((tag, i) => {
            const k = tag.slug + i
            return (
              <li key={k}>
                <Link  href={`/posts/tags/${tag.slug}`}>
                  <a className={router.pathname.startsWith(`/posts/tags/${tag.slug}`) ? "active" : null}>{tag.name}</a>
                </Link>
              </li>
          )})}
        </ul>
        <style jsx>
          {`
            .container {
              width: 0;
            }
            ul {
              opacity: 0;
              width: 100%;
              height: 100vh;
              text-align: right;
              list-style: none;
              margin: 0;
              padding: 0;
              position: fixed;
              top: 0;
              background-color: #fff;
              display: flex;
              flex-direction: column;
              justify-content: center;
              z-index: 1;
              transform: translateY(100%);
              transition: opacity 200ms;
            }
            .active ul {
              opacity: 1;
              transform: translateY(0);
            }
            li {
              margin-bottom: 1.75rem;
              font-size: 2rem;
              padding: 0 1.5rem 0 0;
            }
            li:last-child {
              margin-bottom: 0;
            }
            .active {
              color: #222;
            }

            @media (min-width: 769px) {
              .container {
                width: 7rem;
                display: block;
              }
              ul {
                opacity: 1;
                width: 7rem;
                top: auto;
                display: block;
                transform: translateY(0);
              }
              li {
                font-size: 1rem;
                padding: 0;
              }
            }
          `}
        </style>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const tags = listTags();
  return {
    props: {
      tags,
    },
  };
};
