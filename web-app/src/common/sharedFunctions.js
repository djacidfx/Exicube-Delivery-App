import React from 'react';
import moment from 'moment/min/moment-with-locales';
import { colors } from "../components/Theme/WebTheme";
import {
  Grid,
  Typography,
  TextField,
  FormControlLabel,
  Switch
} from '@mui/material';
import { useTranslation } from "react-i18next";

export const calcEst = false;
export const showEst = true;
export const optionsRequired = true;

export const MAIN_COLOR = colors.DELIVERYPRIMARY;
export const SECONDORY_COLOR = colors.DELIVERYSECONDORY;

export const bookingHistoryColumns = (role, settings, t, isRTL) => [
  { title: t('booking_ref'), field: 'reference'},
  { title: t('booking_date'), field: 'bookingDate', render: rowData => rowData.bookingDate?moment(rowData.bookingDate).format('lll'):null,},
  { title: t('car_type'), field: 'carType',  },
  { title: t('assign_driver'), field: 'driver_name', },
  { title: t('booking_status_web'), field: 'status',
   render: rowData => 
  <div
  style={{backgroundColor:rowData.status === "CANCELLED"?colors.RED :rowData.status=== "COMPLETE"?colors.GREEN : colors.YELLOW, color:"white", padding:7, borderRadius:"15px", fontWeight:"bold", width:"150px", margin: 'auto' }}
  >{t(rowData.status)}</div>,  },
  { title: t('otp'), field: 'otp',},
  { title: t('trip_cost'), field: 'trip_cost',
  render: (rowData) =>
  rowData.trip_cost
  ? settings.swipe_symbol
  ? rowData.trip_cost + " " + settings.symbol
  : settings.symbol + " " + rowData.trip_cost
: settings.swipe_symbol
  ? "0 " + settings.symbol
  : settings.symbol + " 0",
 },
];

export const BookingModalBody = (props) => {
    const { t, i18n  } = useTranslation();
    const isRTL = i18n.dir();
    const { classes, instructionData, handleChange, auth, profileData } = props;
    return (
      <Grid item xs={12}>
        <span>
            <Typography component="h2" variant="h5" style={{marginTop:15, color:'#000'}}>
                {t('delivery_information')}
            </Typography>
            {auth.profile.usertype === 'customer' && !auth.profile.firstName ?
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required = {auth.profile.firstName ? false : true }
                fullWidth
                id="firstName"
                label={t('firstname')}
                name="firstName"
                autoComplete="firstName"
                onChange={handleChange}
                value={profileData.firstName}
                autoFocus
                className={isRTL==='rtl'?classes.inputRtl:classes.textField}
                style={{direction:isRTL==='rtl'?'rtl':'ltr'}}
              />
            </Grid>
            : null }
            {auth.profile.usertype === 'customer' && !auth.profile.lastName ?
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required = {auth.profile.lastName ? false : true }
                fullWidth
                id="lastName"
                label={t('lastname')}
                name="lastName"
                autoComplete="lastName"
                onChange={handleChange}
                value={profileData.lastName}
                className={isRTL==='rtl'?classes.inputRtl:classes.textField}
                style={{direction:isRTL==='rtl'?'rtl':'ltr'}}
              />
            </Grid>
            : null }
            {auth.profile.usertype === 'customer' && !auth.profile.email ?
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required = {auth.profile.email ? false : true }
                fullWidth
                id="email"
                label={t('email')}
                name="email"
                autoComplete="email"
                onChange={handleChange}
                value={profileData.email}
                className={isRTL==='rtl'?classes.inputRtl:classes.textField}
                style={{direction:isRTL==='rtl'?'rtl':'ltr'}}
              />
            </Grid>
            : null }
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="deliveryPerson"
                label={t('deliveryPerson')}
                name="deliveryPerson"
                autoComplete="deliveryPerson"
                onChange={handleChange}
                value={instructionData.deliveryPerson}
                //autoFocus
                className={isRTL==='rtl'?classes.inputRtl:classes.textField}
                style={{direction:isRTL==='rtl'?'rtl':'ltr'}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="deliveryPersonPhone"
                label={t('deliveryPersonPhone')}
                name="deliveryPersonPhone"
                autoComplete="deliveryPersonPhone"
                type="number"
                onChange={handleChange}
                value={instructionData.deliveryPersonPhone}
                className={isRTL==='rtl'?[classes.inputRtl, classes.rightRty]:classes.textField}
                style={{direction:isRTL==='rtl'?'rtl':'ltr'}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="pickUpInstructions"
                label={t('pickUpInstructions')}
                name="pickUpInstructions"
                autoComplete="pickUpInstructions"
                onChange={handleChange}
                value={instructionData.pickUpInstructions}
                className={isRTL==='rtl'?classes.inputRtl:classes.textField}
                style={{direction:isRTL==='rtl'?'rtl':'ltr'}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="deliveryInstructions"
                label={t('deliveryInstructions')}
                name="deliveryInstructions"
                autoComplete="deliveryInstructions"
                onChange={handleChange}
                value={instructionData.deliveryInstructions}
                className={isRTL==='rtl'?classes.inputRtl:classes.textField}
                style={{direction:isRTL==='rtl'?'rtl':'ltr'}}
              />
            </Grid>
        </span>
      </Grid>
    )
}

export const validateBookingObj = (t, bookingObject, instructionData) => {
  const regx1 = /([0-9\s-]{7,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
  if (/\S/.test(instructionData.deliveryPerson) && regx1.test(instructionData.deliveryPersonPhone) && instructionData.deliveryPersonPhone && instructionData.deliveryPersonPhone.length > 6) {
    bookingObject['instructionData'] = instructionData;
    delete bookingObject.driverEstimates;
    return { bookingObject };
  } else {
    return { error: true, msg : t('deliveryDetailMissing')}
  }
}

export const PanicSettings = (props) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir();
  const { classes, data, handleTextChange } = props;
  return (
      <span>
          <Typography component="h1" variant="h5" style={{ marginTop: '15px', textAlign: isRTL === 'rtl' ? 'right' : 'left' }}>
              {t('panic_num')}
          </Typography>
          <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="panic"
              label={t('panic_num')}
              className={isRTL === "rtl" ? [classes.rootRtl_1, classes.right] : classes.textField}
              name="panic"
              autoComplete="panic"
              onChange={handleTextChange}
              value={data.panic}
          />
      </span>
  )
}

export const DispatchSettings = (props) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir();
  const { autoDispatch, onChange } = props;
  return (
      <FormControlLabel
          style={{ flexDirection: isRTL === 'rtl' ? 'row-reverse' : 'row' }}
          control={
              <Switch
                  checked={autoDispatch}
                  onChange={onChange}
                  name="autoDispatch"
                  color="primary"
              />
          }
      label={t('auto_dispatch')}
    />
  )
}

export const BookingImageSettings = (props) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir();
  const { data, handleSwitchChange } = props;
  return (
      <span>
          <FormControlLabel
            style={{ marginTop: '10px', flexDirection: isRTL === 'rtl' ? 'row-reverse' : 'row' }}
            control={
              <Switch
                checked={data.AllowDeliveryPickupImageCapture}
                onChange={handleSwitchChange}
                name="AllowDeliveryPickupImageCapture"
                color="primary"
              />
            }
            label={t('allow_del_pkp_img')}
          />
          <FormControlLabel
            style={{ marginTop: '10px', flexDirection: isRTL === 'rtl' ? 'row-reverse' : 'row' }}
            control={
              <Switch
                checked={data.AllowFinalDeliveryImageCapture}
                onChange={handleSwitchChange}
                name="AllowFinalDeliveryImageCapture"
                color="primary"
              />
            }
            label={t('allow_del_final_img')}
          />
      </span>
  )
}

export const carTypeColumns = (t, isRTL, onClick) =>  [
  { title: t('name'), field: 'name',
  },
  { title: t('image'),  field: 'image',
    initialEditValue: 'https://cdn.pixabay.com/photo/2012/04/15/22/09/car-35502__480.png',
    render: rowData => rowData.image? <button onClick={()=>{onClick(rowData)}}><img alt='CarImage' src={rowData.image} style={{width: 50}}/></button>:null
  },
  { title: t('base_fare'), field: 'base_fare', type: 'numeric', 
   initialEditValue: 0 },
  { title: t('rate_per_unit_distance'), field: 'rate_per_unit_distance', type: 'numeric', 
   initialEditValue: 0},
  { title: t('rate_per_hour'), field: 'rate_per_hour', type: 'numeric', 
   initialEditValue: 0},
  { title: t('min_fare'), field: 'min_fare', type: 'numeric', 
  initialEditValue: 0},
  { title: t('convenience_fee'), field: 'convenience_fees', type: 'numeric', 
   initialEditValue: 0},
  {
    title: t('convenience_fee_type'),
    field: 'convenience_fee_type',
    lookup: { flat: t('flat'), percentage: t('percentage')},
  },
  {
    title: t('fleet_admin_comission'), field: 'fleet_admin_fee', type: 'numeric', 
   initialEditValue: 0
  },
  { title: t('extra_info'), field: 'extra_info' ,
},
  { title: t('position'), field: 'pos', type: 'numeric', defaultSort:'asc'}
];

export const acceptBid = (selectedBooking, selectedBidder) => {
  return null;
}

export const BidModal = (props) => {
  return null
}

export const  downloadCsv = (data, fileName) => {
  const finalFileName = fileName.endsWith(".csv") ? fileName : `${fileName}.csv`;
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([data], { type: "text/csv" }));
  a.setAttribute("download", finalFileName);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}