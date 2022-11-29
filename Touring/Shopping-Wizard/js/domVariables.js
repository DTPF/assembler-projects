const formsSubmit = document.getElementById('finalSubmit');
const previousButton = document.getElementById('btnPrev');
const exitButton = document.getElementById('btnExit');
const footer = document.getElementById('footer');
const allErrors = document.querySelectorAll('.error');
const allInputs = document.querySelectorAll('input');

// Progress Bar
const progress = document.getElementById("progress");
const progressSteps = document.querySelectorAll(".progress-step");

// Product page
const productPage = document.querySelector('.product-page');
const productForm = document.getElementById('productForm');
const headerMainProduct = document.querySelector('.header-main-product');
const headerMainOrder = document.querySelector('.header-main-order');
const footerMainProduct = document.querySelector('.footer-main-product');
const footerMainOrder = document.querySelector('.footer-main-order');
const productPrice = document.querySelector('#productPrice');
const productTitle = document.querySelector('#productTitle');
const thumbnails = document.getElementById('productThumbnails');
const image = document.getElementById('productImage');

// Product Form
const batterySelector = document.getElementById('batterySelect');
const colorInputs = document.getElementsByName('color');

// Profile Form
const profilePage = document.getElementById('div-profile');
const profileForm = document.getElementById('profileForm');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Address Form
const addressPage = document.getElementById('div-address');
const addressForm = document.getElementById('addressForm');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const birthday = document.getElementById('birthday');
const addressOne = document.getElementById('addressOne');
const addressTwo = document.getElementById('addressTwo');
const postalCode = document.getElementById('postalCode');
const country = document.getElementById('country');
const countryPhone = document.getElementById('countryPhone');
const phone = document.getElementById('phone');
const regularAddress = document.getElementById('regularAddress');


// Shipment Form
const shipmentPage = document.getElementById('div-shipment');
const shipmentForm = document.getElementById('shipmentForm');
const typeShip = document.getElementsByName('radioShipType');
const dateShip = document.getElementById('shipDate');
const isGift = document.getElementById('isGift');
const giftTitle = document.getElementById('giftTitle');
const giftMessage = document.getElementById('giftMessage');
const giftImageFile = document.getElementById('giftImageFile');
const giftOptions = document.getElementById('shipGiftOptions');

// Confirmation Page
const orderPage = document.querySelector('.order-form');
const confirmOrder = document.querySelector('#confirmOrder');
const orderImg = document.querySelector('#confirmOrderImg');
const orderProductName = document.querySelector('#confirmOrderProduct');
const orderBattery = document.querySelector('#confirmOrderBattery');
const orderColor = document.querySelector('#confirmOrderColor');
const orderPrice = document.querySelector('#confirmOrderPrice');
const orderShipping = document.querySelector('#confirmOrderShipping');
const orderTotalPrice = document.querySelector('#confirmOrderTotalPrice');
const confirmOrderForm = document.getElementById('confirmOrderForm');
const confirmOrderCheckbox = document.querySelector('#confirmOrderCheckbox');
const confirmOrderTermsMessage = document.querySelector('#confirmOrderTermsMessage');

// Rusume page
const thanksPage = document.getElementById('divThanksPage');
const thankImage = document.getElementById('thanksImage');
const thanksModel = document.getElementById('thanksModel');
const thanksBattery = document.getElementById('thanksBattery');
const thanksColor = document.getElementById('thanksColor');
const thanksArriveDate = document.getElementById('thanksArriveDate');
const thanksPrice = document.getElementById('thanksPrice');
const thanksShipping = document.getElementById('thanksShipping');
const thanksTotalPrice = document.getElementById('thanksTotalPrice');
const registrationMinutes = document.getElementById('registrationMinutes');
const registrationSeconds = document.getElementById('registrationSeconds');
const thanksEmail = document.getElementById('thanksEmail');
const thanksName = document.getElementById('thanksName');
const thanksPhoneNumber = document.getElementById('thanksPhoneNumber');
const thanksAddress = document.getElementById('thanksAddress');
const thanksPostalCode = document.getElementById('thanksPostalCode');
const thanksCountry = document.getElementById('thanksCountry');


const changeBatteryModel = (e) => product.changeBatteryModel(e);
const changeColor = (e) => product.changeColor(e.target.value);
const changeCountryPhoneSelect = (e) => user.changeCountryPhoneSelect(e);
const toggleGiftOptions = (e) => delivery.toggleGiftOptions(e);
const chooseShipmentType = (e) => delivery.chooseShipmentType(e);

const submitLogin = (e) => user.submitLogin(e);
const submitAddress = (e) => user.submitAddress(e);
const submitProductForm = (e) => product.submitProductForm(e);
const submitShipment = (e) => delivery.submitShipment(e);
const submitConfirmForm = (e) => delivery.submitConfirmForm(e);
const domSetHTMLValues = (e) => order.domSetHTMLValues(e);
