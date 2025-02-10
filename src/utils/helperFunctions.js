import { showMessage } from 'react-native-flash-message'
import { LayoutAnimation, Platform, UIManager } from "react-native"
// import ActionSheet from 'react-native-action-sheet'
// import ImageCropPicker from 'react-native-image-crop-picker'
// import Geolocation from 'react-native-geolocation-service'
// import Geocoder from 'react-native-geocoding'

import colors from "../styles/colors"
import commonStyles from "../styles/commonStyles"
import { moderateScale } from '../styles/responsiveSize'
// import strings from '../constants/languages'
// import RawStaticData from './RawStaticData'
// import { saveLiveLocationCoordsToStore } from '../redux/reduxActions/authActions'
// import { GOOGLE_PLACES_API_KEY } from '../config/ApiKeys'

// Geocoder.init(GOOGLE_PLACES_API_KEY);

export function InitAnimation() {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true)
    }
}

export function ApplyEaseOutAnimation() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
}

export const showError = message => {
    showMessage({
        type: 'danger',
        icon: 'danger',
        message: 'Error',
        description: String(message),
        style: { marginTop: moderateScale(32) },
        floating: true,
        duration: 7000,
        style: { marginTop: moderateScale(32) },
        textStyle: {
            ...commonStyles.font_16_Medium,
            color: colors.white
        },
        titleStyle: {
            ...commonStyles.font_16_bold,
            color: colors.white
        }
    })
}

export const showSuccess = (message, time = 2000) => {
    showMessage({
        message: 'Success',
        description: String(message),
        type: 'success',
        icon: 'success',
        floating: true,
        duration: time,
        style: { marginTop: moderateScale(32),backgroundColor:colors.theme,zIndex:1000 },
        textStyle: {
            ...commonStyles.font_16_Medium,
            color: colors.white
        },
        titleStyle: {
            ...commonStyles.font_16_bold,
            color: colors.white
        }
    })
}

export const ShowInfo = (message, time = 10000) => {
    showMessage({
        message: 'Info',
        description: String(message),
        type: 'none',
        icon: 'success',
        floating: true,
        duration: time,
        style: {
            marginTop: moderateScale(32),
            backgroundColor: colors.gray1
        },
        textStyle: {
            ...commonStyles.font_16_Medium,
            color: colors.white
        },
        titleStyle: {
            ...commonStyles.font_16_bold,
            color: colors.white
        }
    })
}


export function ApiError(error) {
    const _error = error?.message || error?.data?.message || strings.error
    return _error
}

export const selectSingleImageFromCamera = () =>
    new Promise(async (resolve, reject) => {
        try {
            const imagePickerOptions = {
                // compressImageQuality: 0.4,
                mediaType: 'photo',
                // width: 300,
                // height: 300,
                multiple: false,
                cropping: false
            }
            const pickedImage = await ImageCropPicker.openCamera(imagePickerOptions)
            console.log(pickedImage, 'pickedImagepickedImagepickedImagepickedImage')
            resolve(pickedImage)
        } catch (error) {
            reject(error)
            console.log('Image Picker Error: ', error)
        }
    })


export const selectSingleImageFromGallery = () =>
    new Promise(async (resolve, reject) => {
        try {
            const imagePickerOptions = {
                // compressImageQuality: 0.4,
                mediaType: 'photo',
                // width: 300,
                // height: 300,
                multiple: false,
                cropping: false
            }
            const pickedImage = await ImageCropPicker.openPicker(imagePickerOptions)
            console.log(pickedImage, 'pickedImagepickedImagepickedImagepickedImage')
            resolve(pickedImage)
        } catch (error) {
            reject(error)
            console.log('Image Picker Error: ', error)
        }
    })



export const selectSingleImage = () =>
    new Promise(async (resolve, reject) => {
        ActionSheet.showActionSheetWithOptions(
            {
                options: Platform.OS === 'ios' ? RawStaticData.BUTTONSiOS : RawStaticData.BUTTONSandroid,
                cancelButtonIndex: RawStaticData.CANCEL_INDEX,
                title: "Choose images from"
            },
            async buttonIndex => {
                try {
                    // if (buttonIndex === 0 || buttonIndex === 1) {
                    //   await requestCameraPermission(buttonIndex);
                    // }

                    const imagePickerOptions = {
                        // compressImageQuality: 0.4,
                        mediaType: 'photo',
                        // width: 300,
                        // height: 400,
                        multiple: false,
                        includeBase64: true
                    }

                    switch (buttonIndex) {
                        case 0: {
                            const pickedImage = await ImageCropPicker.openCamera(
                                imagePickerOptions
                            )
                            resolve(pickedImage)
                            break
                        }
                        case 1: {
                            const pickedImage = await ImageCropPicker.openPicker(
                                imagePickerOptions
                            )
                            resolve(pickedImage)
                            break
                        }
                        case 2: {
                            reject('Select Cancel')
                            break
                        }
                        default: {
                            reject('Select Cancel')
                            break
                        }
                    }
                } catch (error) {
                    reject(error)
                    console.log('Image Picker Error: ', error)
                }
            }
        )
    })

export const getCurrentLocation = () => {
    return new Promise(async (resolve, reject) => {
        Geolocation.getCurrentPosition(
            position => {
                const cords = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }
                saveLiveLocationCoordsToStore(cords)
                setTimeout(() => {
                    resolve(cords)
                }, 500)
            },
            error => {
                reject(error.message)
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        )
    })
}

export const GetAddressFromCoordinates = coords => {
    return new Promise((resolve, reject) => {
        console.log('coordscoordscoordscoords', coords)
        Geocoder.from(coords?.latitude, coords?.longitude)
            .then(json => {
                console.log(json, 'GetAddressFromCoordinates')
                let address = json?.results[0]?.formatted_address

                console.log(address.split(' '), 'GetAddressFromCoordinates')

                const adrr = address.split(' ')

                if (adrr[0].includes('+')) {
                    console.log('sklskslkslk')
                    address = address.replace(adrr[0], '')
                }
                // console.log(json, 'GetAddressFromCoordinates')
                resolve(address)
            })
            .catch(error => {
                reject(error)
                console.log(error, 'errorerror')
            })
    })
}