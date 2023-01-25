import { UserProvider } from '@auth0/nextjs-auth0/client'
import { NotificationsProvider } from '@mantine/notifications';
import { SkeletonTheme } from 'react-loading-skeleton'
// import type { AppProps } from 'next/app'
import PageLayout from "../layouts/PageLayout"
import '../styles/globals.css'

// type ComponentWithPageLayout = AppProps & {
//   Component: AppProps["Component"] & {
//     PageLayout?: React.ComponentType
//   }
// }

export default function App({ Component, pageProps }) { //: ComponentWithPageLayout) {
  return(
    <UserProvider>
      <NotificationsProvider position='bottom-center' autoClose={4000} zIndex={10000}>
        <SkeletonTheme baseColor="rgba(255, 255, 255, 0.2)" highlightColor="rgba(255, 255, 255, 0.2)"> 
          <PageLayout >
            <Component {...pageProps} />
            {/* {
              Component.PageLayout ?
              <Component.PageLayout>
                <Component {...pageProps} />
              </Component.PageLayout> 
              : <Component {...pageProps} />
            } */}
          </PageLayout>
        </SkeletonTheme>
      </NotificationsProvider>
    </UserProvider>
  )

}
