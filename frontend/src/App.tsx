import {BrowserRouter, Routes, Route} from "react-router";
import {Home, Register, Login, Saves, Editor, PrivacyPolicy, TermsOfService} from '@/pages'
import {ThemeProvider} from "@/components/theme-provider.tsx";
import AuthRoute from "@/pages/AuthRoute.tsx";
import PageRoute from "@/pages/PageRoute.tsx";


export default function App() {
  return <ThemeProvider defaultTheme={'light'} storageKey={"vite-ui-theme"}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageRoute/>}>
          <Route index element={<Home/>}/>
          <Route path='/saves' element={<Saves/>}/>
          <Route path='/editor' element={<Editor/>}/>
          <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>
          <Route path='/terms-of-service' element={<TermsOfService/>}/>
        </Route>
        <Route path='/' element={<AuthRoute/>}>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
}