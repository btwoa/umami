import { IntlProvider } from 'react-intl';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';
import ErrorBoundary from 'components/common/ErrorBoundary';
import useLocale from 'hooks/useLocale';
import useConfig from 'hooks/useConfig';
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import 'react-basics/dist/styles.css';
import 'styles/variables.css';
import 'styles/locale.css';
import 'styles/index.css';
import 'chartjs-adapter-date-fns';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }) {
  const { locale, messages } = useLocale();
  const { basePath, pathname } = useRouter();
  const config = useConfig();

  const Wrapper = ({ children }) => <span className={locale}>{children}</span>;

  if (config?.uiDisabled) {
    return null;
  }

  return (
    <QueryClientProvider client={client}>
      <IntlProvider
        locale={locale}
        messages={messages[locale]}
        textComponent={Wrapper}
        onError={() => null}
      >
        <ErrorBoundary>
          <Head>
            <link rel="icon" href="https://ovo.btwoa.com/blog.png" />
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="https://ovo.btwoa.com/blog.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="https://ovo.btwoa.com/blog.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="https://ovo.btwoa.com/blog.png"
            />
            <link rel="manifest" href={`${basePath}/site.webmanifest`} />
            <link rel="mask-icon" href="https://ovo.btwoa.com/blog.svg" />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="theme-color" content="#fafafa" media="(prefers-color-scheme: light)" />
            <meta name="theme-color" content="#2f2f2f" media="(prefers-color-scheme: dark)" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="robots" content="noindex,nofollow" />
          </Head>
          <Component {...pageProps} />
          {!pathname.includes('/share/') && <Script src={`${basePath}/telemetry.js`} />}
        </ErrorBoundary>
      </IntlProvider>
    </QueryClientProvider>
  );
}
