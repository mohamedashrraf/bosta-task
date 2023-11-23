import React from 'react'
import logoEn from '../../images/logo.png';
import logoAr from '../../images/logoAr.png'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


export default function Navbar() {

  const { t, i18n } = useTranslation();
  const handleLang = (event)=>{
    event.preventDefault();
    if(localStorage.getItem("lang") === 'en'){
      localStorage.setItem("lang","ar");
      i18n.changeLanguage("ar");
    }else{
      localStorage.setItem("lang","en");
      i18n.changeLanguage("en");
    }
  }

  const getLogoPath = () => {
    return i18n.language === 'en' ? logoEn : logoAr;
  }

  return (
      <>
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container">
<Link className="navbar-brand" to={''}><img src={getLogoPath()} alt="" style={{ width: '90px' }} /></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to={''}>{t('navbar.Home')}</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={'#'}>{t('navbar.Pricing')}</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={''}>{t('navbar.TrackingShipment')}</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" id="language-btn" onClick={handleLang}>{t('lang')}</Link>
        </li>
      </ul>
      
    </div>
  </div>
</nav>

    </>
  )
}
