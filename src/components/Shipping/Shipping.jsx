import React from 'react';
import { useShipmentContext } from '../../Context/ShipmentContext';
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { useTranslation } from 'react-i18next';
import dateFormat from "dateformat";
import style from './Shipping.module.css'
import ask from '../../images/ask.png'

export default function Shipping() {
  const shipmentData = useShipmentContext();
  const { t, i18n } = useTranslation();

  console.log(shipmentData);

  let present = 0;
  let color = ''; 
if (shipmentData?.CurrentStatus) {
    switch (shipmentData.CurrentStatus.state) {
      case 'TICKET_CREATED':
      case 'PACKAGE_RECEIVED':
        present = 33;
        color = i18n.language === 'ar'
          ? 'linear-gradient(to left, #ff0000, #7CCC5B)' // Red 
          : 'linear-gradient(to right, #7CCC5B, #ff0000)'; 
        break;
      case 'IN_TRANSIT':
        present = 66;
        color = 'linear-gradient(to right, #ffa500, #ffa500)'; // Orange
        break;
      case 'OUT_FOR_DELIVERY':
      case 'WAITING_FOR_CUSTOMER_ACTION':
        present = 66;
        color = 'linear-gradient(to right, #ffa500, #ffa500)'; // Orange
        break;
      case 'DELIVERED_TO_SENDER':
      case 'DELIVERED':
        present = 100;
        color = 'linear-gradient(to right, #7CCC5B, #7CCC5B)'; // Green
        break;
      case 'CANCELLED':
        present = 0;
        color = i18n.language === 'ar'
          ? 'linear-gradient(to right, #ff0000, #ff0000)' //red
          : 'linear-gradient(to left, #ff0000, #ff0000)'; 
        break;
      default:
        break;
    }
  }


  return (
    <div className={style.shipping}>
      <div className='container'>
        <div className="row">
          <div className={style.shipmentProgress}>
              <div className={`d-flex flex-wrap ${style.progressSteps}`}>
                <div className={`col-lg-3 ${style.progressStep}`}>
                 <p>{t('Tracking.ShipmentNo')} <span>{shipmentData?.TrackingNumber}</span></p>
                  <h6 style={{ color }}>{t(shipmentData?.CurrentStatus?.state.replace("_", " "))}</h6>
                </div>
                <div className={`col-lg-3 col-12 ${style.progressStep}`}>
                  <p>{t('Tracking.LatestUpdate')}</p>
                  <h6>
                    {dateFormat(
                      shipmentData?.CurrentStatus?.timestamp,
                      "dddd - dd/mm/yyyy 'at' hh:MMTT"
                    )}
                  </h6>
                </div>
                <div className={`col-lg-3 col-12 ${style.progressStep}`}>
                  <p>{t('Tracking.MerchantName')}</p>
                <h6>{shipmentData.provider }</h6>
                </div>
                <div className={`col-lg-3 col-12 ${style.progressStep}`}>
                  <p>{t('Tracking.DeliveryTime')}</p>
                <h6>{dateFormat(shipmentData?.PromisedDate,"dddd - dd/mm/yyyy 'at' hh:MMTT" )}</h6>
                </div>
              </div>
              <div className={style.progressStatus}>
                <div>
                 <ProgressBar percent={present} filledBackground={color}>
                    <Step transition="scale">
                      {() => (
                        <i className={`fa - solid fa-circle-check ${style.progressCheck}`}></i>
                      )}
                    </Step>
                    <Step transition="scale">
                      {() => (
                        <i className={`fa - solid fa-circle-check ${style.progressCheck}`}></i>
                      )}
                    </Step>
                    <Step transition="scale">
                    {() => (
                      <i className={`fa - solid fa-circle-check ${style.progressCheck}`}></i>
                      )}
                    </Step>
                    <Step transition="scale">
                      {() => (
                        <i className={`fa - solid fa-circle-check ${style.progressCheck}`}></i>
                      )}
                    </Step>
                  </ProgressBar>
                </div>
                <div className={`row ${style.steps}`}>
                  <div className={`col-lg-3 ${style.shipStatus}`}>
                    <p>{t('Tracking.TICKETCREATED')}</p>
                  </div>
                  <div className={`col-lg-3 ${style.shipStatus}`}>
                    <p>{t('Tracking.PACKAGERECEIVED')}</p>
                  </div>
                  <div className={`col-lg-3 ${style.shipStatus}`} style={{textAlign: 'end'}}>
                    <p>{t('Tracking.OUTFORDELIVERY')}</p>
                    <p></p>
                  </div>
                  <div className={`col-lg-3 ${style.shipStatus}`} style={{textAlign: "end"}}>
                    <p>{t('Tracking.DELIVERED')}</p>
                  </div>
                </div>
              </div>
              </div>

          
          <div className="row">
          <div className="col-lg-8 col-12">
            <h4 className={style.shipTitle}>{t('Tracking.ShipmentDetails')}</h4>
            <div style={{ overflow: "auto" }}>
              <table>
                <thead>
                  <tr>
                    <th>{t('Tracking.Branch')}</th>
                    <th>{t('Tracking.Date')}</th>
                    <th>{t('Tracking.Time')}</th>
                    <th>{t('Tracking.Details')}</th>
                  </tr>
                </thead>
                <tbody>
                  {shipmentData?.TransitEvents?.map((item) => {
                      return (
                        <tr key={item.timestamp}>
                          <td>{item?.hub ? item.hub : t("Tracking.City")}</td>
                          <td>{dateFormat(item?.timestamp, "dd/mm/yyyy")}</td>
                          <td>{dateFormat(item?.timestamp, "hh:MMTT")}</td>
                          <td>{item.state.replace("_", " ")}<br></br> {item.reason}</td>
                        </tr>
                      );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-lg-4 col-12">
              <h4 className={style.shipTitle}>{t('Tracking.DeliveryAddress')}</h4>
              <div className={style.shipAddress}>
              <p>{t('Tracking.Address')}</p>
            </div>
              <div className={`d-flex flex-wrap ${style.shipHelp}`}>
              <div>
                <img style={{ width: 80 + "px" }} src={ask} alt="help" />
              </div>
              <div>
                <p>{t('Tracking.problem')}</p>
                <button className='btn btn-danger'>{t('Tracking.report')}</button>
              </div>
            </div>
          </div>
          </div>
          </div>
        </div>
    </div>
  );
}
