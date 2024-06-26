import { React } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { colors } from './theme';
import { Icon } from 'react-native-elements'
import i18n from 'i18n-js';
import { api } from 'common';
import DeliveryModal from '../components/DeliveryModal';
var { height, width } = Dimensions.get('window');

export const MAIN_COLOR = colors.DELIVERYPRIMARY;
export const SECONDORY_COLOR = colors.DELIVERYSECONDORY;

export const appConsts = {
    needEmergemcy: false,
    hasMultiDrop: true,
    makePending: false,
    hasOptions: true,
    checkWallet: true,
    acceptWithAmount: false,
    hasStartOtp: false,
    canCall: false,
    showBookingOptions: true,
    captureBookingImage: true
}

export const checkSearchPhrase = (str) => {
    return "";
}

export const FormIcon = (props)=>{
    return  <Icon
        name='truck-fast'
        type='material-community'
        color={colors.HEADER}
        size={18}
        containerStyle={{width: '15%',alignItems: 'center'}}
    />
}

export const CarHorizontal = (props) => {
    const { t } = i18n;
    const isRTL = i18n.locale.indexOf('he') === 0 || i18n.locale.indexOf('ar') === 0;
    const {onPress, carData, settings, styles} = props;
    return (
        <TouchableOpacity onPress={onPress} style={{height:'100%'}}>
            <View style={styles.imageStyle}>
                <Image resizeMode="contain" source={carData.image ? { uri: carData.image } : require('../../assets/images/microBlackCar.png')} style={styles.imageStyle1} />
            </View>
            <View style={styles.textViewStyle}>
                <Text style={styles.text1}>{carData.name.toUpperCase()}</Text>
                {carData.extra_info && carData.extra_info != '' ?
                    <View style={{ justifyContent: 'space-around', flexDirection: 'column', alignItems: 'center',marginTop:5 }}>
                        {
                            carData.extra_info.split(',').map((ln) => <Text style={styles.text2} key={ln} >{ln}</Text>)
                        }
                    </View>
                : null}
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginTop:5 }}>
                        {isRTL ?
                            null :
                            settings.swipe_symbol === false ?
                                <Text style={[styles.text2, { fontWeight: 'bold', color: colors.MAP_TEXT }]}>{settings.symbol}{carData.rate_per_unit_distance} / {settings.convert_to_mile ? t('mile') : t('km')} </Text>
                                :
                                <Text style={[styles.text2, { fontWeight: 'bold', color: colors.MAP_TEXT }]}>{carData.rate_per_unit_distance}{settings.symbol} / {settings.convert_to_mile ? t('mile') : t('km')} </Text>

                        }
                        {isRTL ?
                            settings.swipe_symbol === false ?
                                <Text style={[styles.text2, { fontWeight: 'bold', color: colors.MAP_TEXT }]}>{settings.symbol}{carData.rate_per_unit_distance} / {settings.convert_to_mile ? t('mile') : t('km')} </Text>
                                :
                                <Text style={[styles.text2, { fontWeight: 'bold', color: colors.MAP_TEXT }]}>{carData.rate_per_unit_distance}{settings.symbol} / {settings.convert_to_mile ? t('mile') : t('km')} </Text>
                            : null}
                    </View>
                <View>
                    <Text style={styles.text2}>({carData.minTime != '' ? carData.minTime : t('not_available')})</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export const CarVertical = (props) =>{
    const { t } = i18n;
    const isRTL = i18n.locale.indexOf('he') === 0 || i18n.locale.indexOf('ar') === 0;
    const {onPress, carData, settings, styles} = props;
    return (
        <TouchableOpacity
            style={[styles.carContainer, { borderWidth: 1, borderColor: carData.active == true ? colors.DELIVERYPRIMARY : colors.WHITE,flexDirection:isRTL?'row-reverse':'row'}]}
            onPress={onPress}
        >
            <Image
                source={carData.image ? { uri: carData.image } : require('../../assets/images/microBlackCar.png')}
                resizeMode="contain"
                style={styles.cardItemImagePlace}
            ></Image>
            <View style={[styles.bodyContent, { alignContent: 'center', flexDirection: 'column', justifyContent: 'center' }]}>
                <Text style={[styles.titleStyles,{textAlign:isRTL?'right':'left'}]}>{carData.name.toUpperCase()}</Text>
                <View style={{ flexDirection:isRTL?'row-reverse':'row', alignItems: 'center' }}>
                    {settings.swipe_symbol === false ?
                        <Text style={[styles.text2, { fontWeight: 'bold', color: colors.MAP_TEXT }]}>{settings.symbol}{carData.rate_per_unit_distance} / {settings.convert_to_mile ? t('mile') : t('km')} </Text>
                        :
                        <Text style={[styles.text2, { fontWeight: 'bold', color: colors.MAP_TEXT }]}>{carData.rate_per_unit_distance}{settings.symbol} / {settings.convert_to_mile ? t('mile') : t('km')} </Text>
                    }
                    {carData.extra_info && carData.extra_info != '' ?
                        <View style={{ justifyContent: 'space-around', marginLeft: 3 ,width: width-170}}>
                            {
                                carData.extra_info.split().map((ln) => <Text key={ln} style={[styles.text2, { fontWeight: 'bold', color: colors.MAP_TEXT, textAlign: isRTL ? 'right': 'left' }]} >{ln}</Text>)
                            }
                        </View>
                    : null}
                </View>
                <Text style={[styles.text2,{textAlign:isRTL?'right':'left'}]}>({carData.minTime != '' ? carData.minTime : t('not_available')})</Text>
            </View>
        </TouchableOpacity>
    )
}

export const validateBookingObj = async (t, addBookingObj, instructionData, settings, bookingType, roundTrip, tripInstructions, tripdata, drivers) => {
    const {
        getDistanceMatrix,
        GetDistance,
    } = api;
    const regx1 = /([0-9\s-]{7,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
    if (/\S/.test(instructionData.deliveryPerson) && regx1.test(instructionData.deliveryPersonPhone) && instructionData.deliveryPersonPhone && instructionData.deliveryPersonPhone.length > 6) {
      addBookingObj['instructionData'] = instructionData;
      if (settings.autoDispatch && bookingType == false && (addBookingObj.payment_mode == 'cash')) {
        let requestedDrivers = {};
        let driverEstimates = {};
        let startLoc = tripdata.pickup.lat + ',' + tripdata.pickup.lng;
        let distArr = [];
        let allDrivers = [];
        if(drivers && drivers.length > 0){
            for (let i = 0; i < drivers.length; i++) {
                let driver = { ...drivers[i] };
                let distance = GetDistance(tripdata.pickup.lat, tripdata.pickup.lng, driver.location.lat, driver.location.lng);
                if (settings.convert_to_mile) {
                    distance = distance / 1.609344;
                }
                if (distance < ((settings && settings.driverRadius) ? settings.driverRadius : 10) && driver.carType === tripdata.carType.name) {
                    driver["distance"] = distance;
                    allDrivers.push(driver);
                }
            }
            const sortedDrivers = settings.useDistanceMatrix ? allDrivers.slice(0, 25) : allDrivers;
            if (sortedDrivers.length > 0) {
                let driverDest = "";
                for (let i = 0; i < sortedDrivers.length; i++) {
                    let driver = { ...sortedDrivers[i] };
                    driverDest = driverDest + driver.location.lat + "," + driver.location.lng
                    if (i < (sortedDrivers.length - 1)) {
                        driverDest = driverDest + '|';
                    }
                }
                if (settings.useDistanceMatrix) {
                    distArr = await getDistanceMatrix(startLoc, driverDest);
                } else {
                    for (let i = 0; i < sortedDrivers.length; i++) {
                        distArr.push({ timein_text: ((sortedDrivers[i].distance * 2) + 1).toFixed(0) + ' min', found: true })
                    }
                }
                for (let i = 0; i < sortedDrivers.length; i++) {
                    if (distArr[i].found) {
                        let driver = {}
                        driver.id = sortedDrivers[i].id;
                        driver.distance = sortedDrivers[i].distance;
                        driver.timein_text = distArr[i].timein_text;
                        requestedDrivers[driver.id] = true;
                        driverEstimates[driver.id] = {distance: driver.distance, timein_text :  driver.timein_text};
                    }
                }
                addBookingObj['requestedDrivers'] = requestedDrivers;
                addBookingObj['driverEstimates'] = driverEstimates;
            }
        } else{
            return { error: true, msg : t('no_driver_found_alert_messege')}
        }
      }
      return { addBookingObj };
    } else {
      return { error: true, msg : t('deliveryDetailMissing')}
    }
}

export default function BookingModal(props){
    return <DeliveryModal {...props} />
}

export const prepareEstimateObject =  async (tripdata, instructionData) => {
    const { t } = i18n;
    const {
        getDirectionsApi
    } = api;
    try {
        const startLoc = tripdata.pickup.lat + ',' + tripdata.pickup.lng;
        const destLoc = tripdata.drop.lat + ',' + tripdata.drop.lng;
        let routeDetails = await getDirectionsApi(startLoc, destLoc, null);
        let waypoints = '';
        if (tripdata.drop && tripdata.drop.waypoints && tripdata.drop.waypoints.length > 0) {
            const origin = tripdata.pickup.lat + ',' + tripdata.pickup.lng;
            const arr = tripdata.drop.waypoints;
            for (let i = 0; i < arr.length; i++) {
                waypoints = waypoints + arr[i].lat + ',' + arr[i].lng;
                if (i < arr.length - 1) {
                    waypoints = waypoints + '|';
                }
            }
            const destination = tripdata.drop.lat + ',' + tripdata.drop.lng;
            routeDetails = await getDirectionsApi(origin, destination, waypoints);
        } else {
            routeDetails = await getDirectionsApi(startLoc, destLoc, null);
        }
        const estimateObject = {
            pickup: { coords: { lat: tripdata.pickup.lat, lng: tripdata.pickup.lng }, description: tripdata.pickup.add },
            // drop: { coords: { lat: tripdata.drop.lat, lng: tripdata.drop.lng }, description: tripdata.drop.add},
            drop: { coords: { lat: tripdata.drop.lat, lng: tripdata.drop.lng }, description: tripdata.drop.add, waypointsStr: waypoints != '' ? waypoints : null, waypoints: waypoints != '' ? tripdata.drop.waypoints : null },
            carDetails: tripdata.carType,
            routeDetails: routeDetails,
            instructionData: instructionData
        };
        return { estimateObject };
    } catch (err) {
        return { error: true, msg : t('not_available')}
    }
}

export const ExtraInfo = (props) => {
    const { t } = i18n;
    const isRTL = i18n.locale.indexOf('he') === 0 || i18n.locale.indexOf('ar') === 0;
    const { item, styles } = props;
    return (
        <>
      
            <View style={styles.textContainerStyle}>
                <Text style={styles.textHeading}>{t('pickUpInstructions')}</Text>
                <Text style={styles.textContent}>
                    {item? item.pickUpInstructions : ''}
                </Text>
            </View>
            <View style={[styles.textContainerStyle]}>
                <Text style={styles.textHeading}>{t('deliveryInstructions')}</Text>
                <Text style={styles.textContent}>
                    {item? item.deliveryInstructions : ''}
                </Text>
            </View>
            <View style={[styles.deliveryOption,{flexDirection: isRTL ? 'row-reverse' : 'row',}]}>
            <View style={{width:width/3,alignItems:'center'}}>
                <Text style={styles.textHeading}>{t('parcel_type')}</Text>
                <Text style={styles.textContent}>
                    {item && item.parcelTypeSelected? item.parcelTypeSelected.description : ''}
                </Text>
            </View>
            <View style={{width:width/3,alignItems:'center'}}>
                <Text style={styles.textHeading}>{t('options').toUpperCase()}</Text>
                <Text style={styles.textContent}>
                    {item && item.optionSelected? item.optionSelected.description : ''}
                </Text>
            </View>
            <View style={{width:width/3,alignItems:'center'}}>
                <Text style={styles.textHeading}>{t('payment_mode')}</Text>
                <Text style={styles.textContent}>
                {t(item.payment_mode)}
                </Text>
            </View>
            </View>
        </>
    )
}

export const RateView = (props) => {
    const {settings, item, styles} = props;
    return (
        <View style={styles.rateViewStyle}>
            {settings.swipe_symbol === false ?
                <Text style={styles.rateViewTextStyle}>{settings.symbol}{item ? item.estimate > 0 ? parseFloat(item.estimate).toFixed(settings.decimal) : 0 : null}</Text>
                :
                <Text style={styles.rateViewTextStyle}>{item ? item.estimate > 0 ? parseFloat(item.estimate).toFixed(settings.decimal) : 0 : null}{settings.symbol}</Text>
            }
        </View>
    )
}