import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&display=swap"
            rel="stylesheet"
          />
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/linkbase_logo_svg.svg" />
          <meta name="theme-color" contents="#fff" />
          <link
            rel="icon"
            type="image/png"
            href="/iconx/favicon-16x16.png"
            sizes="16x16"
          />
          <link
            rel="icon"
            type="image/png"
            href="/iconx/favicon-32x32.png"
            sizes="32x32"
          />
          <link
            rel="icon"
            type="image/png"
            href="/iconx/android-192x192.png"
            sizes="192x192"
          />
          <link
            rel="apple-touch-icon"
            href="/iconx/apple-touch-icon-180x180.png"
            sizes="180x180"
          />
          <meta
            name="msapplication-config"
            content="/iconx/browserconfig.xml"
          ></meta>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
