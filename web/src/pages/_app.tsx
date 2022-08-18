import { ChakraProvider } from '@chakra-ui/react'

import SEO from '../next-seo'

import theme from '../theme'
import { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <DefaultSeo
        title={SEO.openGraph.title}
        description={SEO.openGraph.description}
        canonical={SEO.openGraph.url}
        {...SEO}
      />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
