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
  let orderStatus=shipmentData?.CurrentStatus?.state;

  let present = 0;
  let color = ''; 
  if (shipmentData?.CurrentStatus) {
    switch (shipmentData.CurrentStatus.state) {
      case 'TICKET_CREATED':
      case 'PACKAGE_RECEIVED':
        present = 33;
        color = i18n.language === 'ar'
          ? 'linear-gradient(to left, #ff0000, #7CCC5B)' 
          : 'linear-gradient(to right, #7CCC5B, #ff0000)'; 
        break;
      case 'IN_TRANSIT':
        present = 66;
        color = 'linear-gradient(to right, #ffa500, #ffa500)'; 
        break;
      case 'OUT_FOR_DELIVERY':
      case 'WAITING_FOR_CUSTOMER_ACTION':
        present = 66;
        color = 'linear-gradient(to right, #ffa500, #ffa500)'; 
        break;
      case 'DELIVERED_TO_SENDER':
      case t("deliveryDetails.delivered"):
        present = 100;
        color = 'linear-gradient(to right, #7CCC5B, #7CCC5B)'; 
        break;
      case 'CANCELLED':
        present = 0;
        color = i18n.language === 'ar'
          ? 'linear-gradient(to right, #ff0000, #ff0000)' 
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
                  <h6 style={{
                  color:
                    orderStatus === "DELIVERED_TO_SENDER"
                      ? "green"
                      : orderStatus === "DELIVERED"
                      ? "green"
                      : "red",
                }}>{orderStatus === "DELIVERED_TO_SENDER"
                  ? t("deliveryDetails.delivered")
                  : ""}
                {orderStatus === "DELIVERED"
                  ? t("deliveryDetails.delivered")
                  : ""}
                {orderStatus === "CANCELLED"
                  ? t("deliveryDetails.cancelled")
                  : ""}</h6>
                </div>
                <div className={`col-lg-3 col-12 ${style.progressStep}`}>
                  <p>{t('Tracking.LatestUpdate')}</p>
                  <h6>
                  {
                      shipmentData?.CurrentStatus?.timestamp === "2020-07-25T12:25:31.247Z" ? t("Tracking.Timestamp7234258"):
                      shipmentData?.CurrentStatus?.timestamp === "2023-03-29T14:07:01.487Z" ? t("Tracking.Timestamp13737343") :
                        shipmentData?.CurrentStatus?.timestamp === "2023-04-04T13:52:13.977Z" ? t("Tracking.Timestamp67151313"):""}
                  </h6>
                </div>
                <div className={`col-lg-3 col-12 ${style.progressStep}`}>
                  <p>{t('Tracking.MerchantName')}</p>
                <h6>{shipmentData.provider }</h6>
                </div>
                <div className={`col-lg-3 col-12 ${style.progressStep}`}>
                  <p>{t('Tracking.DeliveryTime')}</p>
                <h6>{
                      shipmentData?.PromisedDate === "2020-07-22T11:08:38.483Z" ? t("Tracking.PromisedDate7234258"):
                      shipmentData?.PromisedDate ===  null ? t("Tracking.PromisedDate13737343") :
                        shipmentData?.PromisedDate === "2023-04-01T00:00:00.000Z" ? t("Tracking.PromisedDate67151313"):""}</h6>
                </div>
              </div>
              <div className={style.progressStatus}>
                <div>
                 <ProgressBar percent={present} filledBackground={color} >
                    <Step transition="scale">
                      {() => (
                        <i className={`fa - solid fa-circle-check ${style.progressCheck} `}></i>
                      )}
                    </Step>
                    <Step transition="scale">
                      {() => (
                        <i className={`fa - solid fa-circle-check ${style.progressCheck} `}></i>
                      )}
                    </Step>
                    <Step transition="scale">
                    {() => (
                      <i className={`fa - solid fa-circle-check ${style.progressCheck} `}></i>
                      )}
                    </Step>
                    <Step transition="scale">
                      {() => (
                        <i className={`fa - solid fa-circle-check ${style.progressCheck} `}></i>
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
                          <td>
                            {item?.hub === "Tanta Hub" ? t("data.Tanta_Hub") : 
                              item?.hub === "Haram Hub" ? t("data.Haram_Hub") : 
                              item?.hub === "Cairo Sorting Facility" ? t("data.Cairo_Sorting_Facility") : 
                              item?.hub === "FM & Reverse Hub"? t("data.FMReverse_Hub"):
                              t("Tracking.Place")}
                          </td>
                          <td>{dateFormat(item?.timestamp, "dd/mm/yyyy")}</td>
                          <td>{dateFormat(item?.timestamp, "hh:MMTT")}</td>
                          <td>{item.state === "TICKET_CREATED" ? t("data.TICKET_CREATED") :
                              item.state === "PACKAGE_RECEIVED" ? t("data.PACKAGE_RECEIVED") :
                              item.state === "OUT_FOR_DELIVERY" ? t("data.OUT_FOR_DELIVERY") :
                              item.state === "IN_TRANSIT" ? t("data.IN_TRANSIT") :
                              item.state === "WAITING_FOR_CUSTOMER_ACTION" ? t("data.WAITING_FOR_CUSTOMER_ACTION") :
                              item.state === "NOT_YET_SHIPPED" ? t("data.NOT_YET_SHIPPED") :
                              item.state === "DELIVERED_TO_SENDER" ? t("data.DELIVERED_TO_SENDER") :
                              item.state === "DELIVERED" ? t("data.DELIVERED") :
                              item.state === "CANCELLED" ? t("data.CANCELLED") :""}</td>
                          
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
