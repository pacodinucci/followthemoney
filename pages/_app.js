import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import AuthContextProvider from '@/lib/store/auth-context';
import { ToastContainer, toast } from 'react-toastify';
import Nav from "@/components/Nav";
import FinanceContextProvider from '@/lib/store/finance-context';

export default function App({ Component, pageProps }) {
  return(
    <AuthContextProvider>
      <FinanceContextProvider>
        <ToastContainer />
        <Nav />
        <Component {...pageProps} />
      </FinanceContextProvider>
    </AuthContextProvider>
  ) 
}
