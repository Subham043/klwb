import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { CustomProvider, Loader, Message } from 'rsuite';
import { Toaster } from 'react-hot-toast';
import { PhotoProvider } from "react-photo-view";
import { QueryClientOptions } from "./utils/constants/query_client";
import AccountProvider from "./contexts/accountProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserProvider from "./contexts/userProvider"
import 'rsuite/dist/rsuite.min.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-photo-view/dist/react-photo-view.css';
import './index.css'

const queryClient = new QueryClient(QueryClientOptions);

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <CustomProvider>
      <UserProvider>
      <QueryClientProvider client={queryClient}>
        <AccountProvider>
          <PhotoProvider 
            maskOpacity={0.5}
            brokenElement={
              <Message type="error" bordered showIcon>
                <strong>Error!</strong> Failed to load Image. Please try again later.
              </Message>
            }
            loadingElement={<Loader center size="md" color='blue' content="loading" />}
          >
            <App />
          </PhotoProvider>
        </AccountProvider>
      </QueryClientProvider>
      </UserProvider>
      <Toaster />
    </CustomProvider>,
  // </React.StrictMode>,
)
