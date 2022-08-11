import Head from "next/head";
import Script from "next/script";

interface MetaProps {
  title: string;
  keywords: string;
  description: string;
}
function Meta({ title, keywords, description }: MetaProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <title>{title}</title>
      </Head>
      <Script
        src="https://widget.Cloudinary.com/v2.0/global/all.js"
        type="text/javascript"
      ></Script>
    </>
  );
}

Meta.defaultProps = {
  title: "PDF-GEN",
  keywords: "PDF Generator",
  description: "PDF, React",
};

export default Meta;
