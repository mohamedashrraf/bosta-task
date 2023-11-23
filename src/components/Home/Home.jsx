import style from './Home.module.css'
import React, { useState } from 'react'
import {Link} from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function Home() {
    const [searchInput, setSearchInput] = useState("");

    const handleSearchNo = (event) => {
        setSearchInput(event.target.value);
        
        }

    const { t } = useTranslation();

    const validSearchInputs = ['67151313', '13737343', '7234258'];

    const isValidSearchInput = validSearchInputs.includes(searchInput);

    const renderLinkOrRedirect = () => {
  if (isValidSearchInput) {
    return (
      <Link className={style.shipmentButton} to={{ pathname: `/Shipping/`, search: `?${searchInput}` }}>
        <i className="fa-solid fa-magnifying-glass fa-xl"></i>
      </Link>
    );
  } else {
    return (
        <Link className={style.shipmentButton} to={{ pathname: `/*` }}>
            <i className="fa-solid fa-magnifying-glass fa-xl"></i>
      </Link>
    );
  }
    };
    
    return (
        <div className={style.Home}>
            <div className="container h-100">
                <div className="row justify-content-center h-100">
                    <div className="col-6 w-100 d-flex h-100">
                        <div className={style.shipmentContainer}>
                            <h1 className={style.shipmentTitle}>{t('HomePage.title')}</h1>
                            <h2 className={style.shipmentSubTitle}>{t('HomePage.subTitle')}</h2>
                            <form className="d-flex flex-wrap mb-4">
                                <div className={style.shipmentSearch}>
                                    <input name="shipment" onChange={handleSearchNo} type="text" placeholder={t('HomePage.placeholder')} />
                                </div>
                                <div className="mx-2 d-flex">
                                    {renderLinkOrRedirect()}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
