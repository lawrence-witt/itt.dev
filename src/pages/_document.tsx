import React from "react";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { SheetsRegistry, JssProvider, createGenerateId } from "react-jss";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const registry = new SheetsRegistry();
    const generateId = createGenerateId();
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) =>
          function EnhancedApp(props) {
            return (
              <JssProvider registry={registry} generateId={generateId}>
                <App {...props} />
              </JssProvider>
            );
          },
      });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: [
        initialProps.styles,
        <style key="server-side-styles" type="text/css" id="server-side-styles">
          {registry.toString()}
        </style>,
      ],
    };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
