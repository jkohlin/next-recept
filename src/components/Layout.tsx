import Head from "next/head";
import Navigation from "./Navigation";

type Props = {
  children: React.ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <div className="root">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#fff" />
      </Head>
      <header><h1>Kohlins recept</h1></header>
      <nav>
        <Navigation />
      </nav>
      <main>{children}</main>
      <style jsx>
        {`
          .root {
            display: block;
            padding: 6rem 0;
            box-sizing: border-box;
            height: 100%;
          }
          header {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            margin: auto;
            background-color: #FF6061;
          }
          header h1 {
            text-align: center;  
            font-size: 2rem;        
            margin: 1rem 0 1rem 58px;
            -webkit-background-clip: text;
            -moz-background-clip: text;
            background-clip: text;
            color: #fff;
          }
          @media (min-width: 769px) {
            header h1 {
              font-size: 2.5rem;        
              margin: 1rem 0 1rem 0;
            }
          }

          main {
            display: flex;
            min-height: 100%;
          }
          @media (min-width: 769px) {
            .root {
              display: flex;
              flex: 1 0 auto;
            }
            main {
              flex: 1 0 auto;
            }
          }
        `}
      </style>
    </div>
  );
}
