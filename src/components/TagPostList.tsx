import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PostContent } from "../lib/posts";
import { TagContent } from "../lib/tags";
import PostItem from "./PostItem";
import Pagination from "./Pagination";
import List from '../lib/list'

type Props = {
  posts: PostContent[];
  tag: TagContent;
  pagination: {
    current: number;
    pages: number;
  };
};
export default function TagPostList({ posts, tag, pagination }: Props) {
  const searchBar = useRef(null);
  let [filter, setFilter] = useState('');
  
  useEffect(() => {
    const sortList = new List('receptlista', {valueNames: ['recept']});
    console.log(sortList);
    
    sortList.sort('recept', { order: "asc" })
    
    return () => {
      setFilter('');
      if (searchBar && searchBar.current && searchBar.current.value) searchBar.current.value = '';
    }
  } , []);

  return (
    <div className={"container"} id="receptlista">
      <h1>
        <Link href="/posts/"> 
        <a href="">Alla recept</a>
        </Link> 
        / <span>{tag.name}</span>
      </h1>
      <nav className="search-bar">
        <input ref={searchBar} 
        onChange={(ev: React.ChangeEvent<HTMLInputElement>,): void => setFilter(searchBar.current.value.toUpperCase())} 
        type="text" className="filter" placeholder="sök recept" />
      </nav>
      <ul className="list">
        {posts.filter((post)=>post.title.toUpperCase().includes(filter)).map((it, i) => (
          <li key={i}>
            <PostItem post={it} />
          </li>
        ))}
      </ul>
      <Pagination
        current={pagination.current}
        pages={pagination.pages}
        link={{
          href: () => "/posts/tags/[[...slug]]",
          as: (page) =>
            page === 1
              ? "/posts/tags/" + tag.slug
              : `/posts/tags/${tag.slug}/${page}`,
        }}
      />
      <style jsx>
        {`
          .container {
            margin: 0 auto;
            max-width: 1200px;
            width: 100%;
            padding: 0 1.5rem;
            display: flex;
            flex-direction: column;
          }
          .search-bar {
            width: 150px;
            font-size: 1.2rem;
            margin-bottom: 1rem;
          }
          .search-bar > input {
            padding: 0.5rem 1rem;
            border-radius: 1.2rem;
          }
          h1 {
            margin: 0 0 2rem;
            padding: 0;
            font-weight: 100;
            font-size: 1.75rem;
            color: #9b9b9b;
          }
          h1 span {
            font-weight: bold;
            color: #222;
          }
          ul {
            margin: 0;
            padding: 0;
            flex: 1 0 auto;
          }
          li {
            list-style: none;
            margin-bottom: 1.5rem;
          }

          @media (min-width: 769px) {
            h1 {
              font-size: 2rem;
            }
          }
        `}
      </style>
    </div>
  );
}
