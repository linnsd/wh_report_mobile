import * as Localization from "expo-localization";
import i18n from "i18n-js";

//import Services
import { getItem } from "@services/Storage";

//English Language
const EN = {
  //login
  login: "LOGIN",
  loginId: "Login Id",
  password: "Password",
  btn_login: "Login",

  //home
  main: "Main",
  licence_no: "Licence No",
  expire_date: "Expire Date",
  fuel_balance_at: "Fuel Balance At",
  fuel_type: "Fuel Type",
  max_capacity: "Max Capacity",
  balance: "Balance",
  gal: "gal",
  avg_capacity:"Average Balance",
  remain_day:"Available Days",
  day:"Days",

  //drawer
  create_report: "Create Report",
  daily_report: "Daily Report",
  fuel_order: "Order History",
  language: "Language",
  change_password: "Change Password",
  logout: "Logout",

  //create report
  select_report_time: "Select Report Time",
  select_fuel_type: "Select Fuel Type",
  previous_balance: "Previous Balance",
  remaining_day: "Remaining Day",
  current_balance: "Current Balance",
  enter_bal_capacity: "Enter Balance Capacity",
  fuel_order: "Fuel Order",
  fuel_received: "Fuel Received",
  yes: "Yes",
  no: "No",
  supplier: "Supplier",
  terminal: "Terminal",
  bowser_no: "Bowser No",
  arrival_date: "Arrival Date",
  capacity: "Capacity",
  remark: "Remark",
  save: "Save",
  no_data: "No Data",

  //report detail
  report_detail: "Report Detail",
  date: "Date",
  remain_balance: "Balance Capacity",
  sale_capacity: "Sale Capacity",
  avg_sale_capacity: "Average Sale Capacity",
  stock_avail_day: "Stock Available Day",
  storage_capacity: "Storage Capacity",
  bal_capacity: "Balance Capacity",

  //order detail
  order_detail: "Order Detail",
  order_date: "Order Date",
  order_status: "Order Status",
  received_date: "Received Date",

  //language
  translation: "Translation",
  choose_lang: "Choose Language",
  myanmar: "Myanmar",
  english: "English",

  //change password
  current_password: "Current Password",
  new_password: "New Password",
  confirm_password: "Confirm Password",

  //profile
  profile: "Profile",
  owner: "Owner",
  state_division: "State Division",
  township: "Township",
  address: "Address",
  issue_date: "Issue Date",
  expire_date: "Expire Date",
  lat:"Latitude",
  lng:"Longitude",

  //notification
  notification: "Notification",
  noti_detail: "Notification Detail",

  //logout
  logout: "Logout",
  logging_out: "Logging Out",
  are_you_sure: "Are you sure you want to logout?",
  ok: "Ok",
  cancel: "Cancel",
};
const MM = {
  //login
  login: "လော့ဂ်အင်",
  loginId: "လော့ဂ်အင် အိုင်ဒီ",
  password: "လျှို့ဝှက်နံပါတ်",
  btn_login: "လော့ဂ်အင်",

  //home
  main: "ပင်မ",
  licence_no: "လိုင်စင်နံပါတ်",
  expire_date: "သက်တမ်းကုန်ဆုံးရက်",
  fuel_balance_at: "ဆီလက်ကျန်ဖြည့်သည့်အချိန်",
  fuel_type: "ဆီအမျိုးအစား",
  max_capacity: "အများဆုံးပမာဏ",
  balance: "လက်ကျန်",
  gal: "ဂါလန်",
  avg_capacity:"ပျမ်းမျှအရောင်း",
  remain_day:"ရောင်းချနိုင်မည့်ရက်",
  day:"ရက်",

  //drawer
  create_report: "မှတ်တမ်းပြုလုပ်မည်",
  daily_report: "နေ့စဉ်မှတ်တမ်း",
  fuel_order: "ဆီမှာယူထားမှု",
  language: "ဘာသာစကား",
  change_password: "လျှို့ဝှက်နံပါတ်ပြောင်းမည်",
  logout: "အကောင့်မှထွက်မည်",

  //create report
  select_report_time: "မှတ်တမ်းတင်ရန် အချိန်ရွေးချယ်ပါ",
  select_fuel_type: "ဆီအမျိုးအစား ရွေးချယ်ပါ",
  previous_balance: "ယခင်လက်ကျန်",
  remaining_day: "ရောင်းချနိုင်မည့်ရက်",
  current_balance: "လက်ရှိပမာဏ",
  enter_bal_capacity: "လက်ရှိပမာဏရိုက်ထည့်ပါ",
  fuel_order: "ဆီမှာယူထားမှု",
  fuel_received: "ဆီလက်ခံရရှိမှု",
  yes: "ရှိပါသည်",
  no: "မရှိပါ",
  supplier: "မှာယူထားသည့် ကုမ္ပဏီ",
  terminal: "သိုလှောင်ကန်စခန်း",
  bowser_no: "ဘောက်စာ နံပါတ်",
  arrival_date: "ရောက်ရှိမည့်ရက်",
  capacity: "ပမာဏ",
  remark: "မှတ်ချက်",
  save: "သိမ်းမည်",
  no_data: "မှတ်တမ်း မရှိပါ",

  //report detail
  report_detail: "မှတ်တမ်းအသေးစိတ်",
  date: "ရက်စွဲ",
  remain_balance: "လက်ကျန်ပမာဏ",
  sale_capacity: "ရောင်းအားပမာဏ",
  avg_sale_capacity: "ပျမ်းမျှရောင်းအား",
  stock_avail_day: "ရောင်းချနိုင်မည့်ရက်",
  storage_capacity: "သိုလှောင်နိုင်မှုပမာဏ",
  bal_capacity: "လက်ကျန် ပမာဏ",

  //order detail
  order_detail: "မှာယူထားမှုအသေးစိတ်",
  order_date: "မှာယူသည့်ရက်စွဲ",
  order_status: "မှာယူထားရှိမှုအခြေအနေ",
  received_date: "ရောက်ရှိသည့်ရက်စွဲ",

  //language
  translation: "ဘာသာစကားပြောင်းလဲမည်",
  choose_lang: "ဘာသာစကားရွေးချယ်ပါ",
  myanmar: "မြန်မာ",
  english: "အင်္ဂလိပ်",

  //change password
  current_password: "လက်ရှိ စကားဝှက်",
  new_password: "စကားဝှက် အသစ်",
  confirm_password: "အတည်ပြု စကားဝှက်",

  //profile
  profile: "ကိုယ်ရေးအကျဉ်း",
  owner: "ပိုင်ရှင်အမည်",
  state_division: "ပြည်နယ်/တိုင်း",
  township: "မြို့နယ်",
  address: "လိပ်စာ",
  issue_date: "ထုတ်ပေးသည့်ရက်စွဲ",
  expire_date: "သက်တမ်းကုန်ဆုံးရက်",
  lat:"လတ္တီတွဒ်",
  lng:"လောင်ဂျီကျု",

  //notification
  notification: "အကြောင်းကြားစာ",
  noti_detail: "အကြောင်းကြားစာ အသေးစိတ်",

  //logout
  logout: "အကောင့်မှထွက်မည်",
  logging_out: "အကောင့်မှထွက်မည်",
  are_you_sure: "အကောင့်မှ ထွက်မှာ သေချာပါသလား?",
  ok: "အိုကေ",
  cancel: "မလုပ်ပါ",
};
i18n.fallbacks = true;
i18n.translations = { EN, MM };
i18n.locale = Localization.locale;
// console.log(i18n.locale)
export const t = (scope, locale) => {
  // console.log(locale)
  return i18n.t(scope, { locale: locale });
};

export const getLang = async () => {
  // console.log(await Localization.getLocalizationAsync());
  return new Promise((resolve, reject) => {
    getItem("language")
      .then((res) => {
        if (res) {
          // console.log(res)
          resolve(res);
        } else {
          resolve("MM");
        }
      })
      .catch((err) => reject(err));
  });
};
