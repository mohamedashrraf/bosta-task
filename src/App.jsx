import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { I18nextProvider, initReactI18next, useTranslation } from "react-i18next";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { TRANSLATIONS_AR } from './languages/ar/translation.js';
import { TRANSLATIONS_EN } from './languages/en/translation.js';
import Layout from './components/Layout/Layout';
import Shipping from './components/Shipping/Shipping';
import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound';



const routes = createBrowserRouter([{
  path: "", element: <Layout />,
  children: [                            
    {index: true, element: <Home />},     
    {path: "Shipping", element: <Shipping /> },
    { path: "*", element: <NotFound /> }

  ]
}])

i18next.use(LanguageDetector).use(initReactI18next)
.init({
  resources: {
    en: {
      translation: TRANSLATIONS_EN
    },
    ar: {
      translation: TRANSLATIONS_AR
    }
  },
  interpolation: { escapeValue: false },
});


function App() {
    const { t } = useTranslation();
  return (
      <div className={t('class')}>
      <I18nextProvider i18n={i18next}>
        <RouterProvider router={routes} >
          </RouterProvider>
      </I18nextProvider>
      </div>
  );
}

export default App;
