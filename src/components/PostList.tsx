import React, { useEffect, useRef, useState } from "react";
import { PostContent } from "../lib/posts";
import PostItem from "./PostItem";
import TagLink from "./TagLink";
import Pagination from "./Pagination";
import { TagContent } from "../lib/tags";
import List from '../lib/list'

type Props = {
  posts: PostContent[];
  tags: TagContent[];
  pagination: {
    current: number;
    pages: number;
  };
};
export default function PostList({ posts, tags, pagination }: Props) {
  const searchBar = useRef(null);
  let [filter, setFilter] = useState('');

  useEffect(() => {
    const sortList = new List('receptlista', {valueNames: ['recept']});
    sortList.sort('recept', { order: "asc" })
    
    return () => {
      setFilter('');
      if (searchBar && searchBar.current && searchBar.current.value) searchBar.current.value = '';
    }
  } , [posts]);

  return (
    <div className={"container"}>
      <div className={"posts"} id={"receptlista"}>
        <nav className="search-bar">
          <input ref={searchBar} 
          onChange={(ev: React.ChangeEvent<HTMLInputElement>,): void => setFilter(searchBar.current.value.toUpperCase())} 
          type="text" className="filter" placeholder="sök recept" />
        </nav>
        <ul className={"post-list list"}>
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
            href: (page) => (page === 1 ? "/posts" : "/posts/page/[page]"),
            as: (page) => (page === 1 ? null : "/posts/page/" + page),
          }}
        />
      </div>
      {/* <ul className={"categories"}>
        {tags.map((it, i) => (
          <li key={i}>
            <TagLink tag={it} />
          </li>
        ))}
      </ul> */}
      <style jsx>{`
        .container {
          display: flex;
          margin: 0 auto;
          max-width: 1200px;
          width: 100%;
          padding: 0 1.5rem;
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

        ul {
          margin: 0;
          padding: 0;
        }
        li {
          list-style: none;
        }
        .posts {
          display: flex;
          flex-direction: column;
          flex: 1 1 auto;
        }
        .posts li {
          margin-bottom: 1.5rem;
        }
        .post-list {
          flex: 1 0 auto;
        }
        .categories {
          display: none;
        }
        .categories li {
          margin-bottom: 0.75em;
        }

        @media (min-width: 769px) {
          .categories {
            display: block;
          }
        }
      `}</style>
    </div>
  );
}
