// import { isMobile } from "react-device-detect";
// import Translate from "@identitybuilding/idb-react-translations";

const initialState = {
  lang: "nl",
  current_establishment: {
    active: true,
    accept_GDPR: true,
    last_accepted_GDPR: "2022-08-18",
    accept_terms: true,
    address: {
      extra: "",
      long: "",
      lat: "",
      municipality: "",
      city: "",
      postal_code: "",
      box: "",
      number: "",
      street: "",
    },
    last_accepted_terms: "2022-08-18",
    accept_share_with_municipality: true,
    support_city_meaning: 0,
    enter_competition: true,
    first_name: "Erik",
    last_name: "Vercruysse",
    personal_mobile_phone: "0497579777",
    personal_fixed_phone: "053810777",
    personal_email: "office@identitybuilding.be",
    paid_version: true,
    fsma: null,
    itaa: null,
    apb: null,
    commercial_name_nl: "identityBuilding",
    commercial_name_fr: null,
    commercial_name_de: null,
    commercial_name_en: null,
    business_mobile_phone_nl: null,
    business_mobile_phone_fr: null,
    business_mobile_phone_de: null,
    business_mobile_phone_en: null,
    business_fixed_phone_nl: null,
    business_fixed_phone_fr: null,
    business_fixed_phone_de: null,
    business_fixed_phone_en: null,
    business_email_nl: null,
    business_email_fr: null,
    business_email_de: null,
    business_email_en: null,
    business_fax_nl: null,
    business_fax_fr: null,
    business_fax_de: null,
    business_fax_en: null,
    trade_with_consumers: true,
    offering: 0,
    contact_me_for_logo_proposition: true,
    contact_digital_agancy: true,
    digital_agancy_name: "test",
    digital_agancy_phone: "0479057136",
    digital_agancy_email: "yorben.verhoest@outlook.com",
    business_website_nl: null,
    business_website_fr: null,
    business_website_de: null,
    business_website_en: null,
    business_facebook_nl: null,
    business_facebook_fr: null,
    business_facebook_de: null,
    business_facebook_en: null,
    business_instagram_nl: null,
    business_instagram_fr: null,
    business_instagram_de: null,
    business_instagram_en: null,
    business_youtube_nl: null,
    business_youtube_fr: null,
    business_youtube_de: null,
    business_youtube_en: null,
    business_linkedin_nl: null,
    business_linkedin_fr: null,
    business_linkedin_de: null,
    business_linkedin_en: null,
    business_twitter_nl: null,
    business_twitter_fr: null,
    business_twitter_de: null,
    business_twitter_en: null,
    business_tiktok_nl: null,
    business_tiktok_fr: null,
    business_tiktok_de: null,
    business_tiktok_en: null,
    business_snapchat_nl: null,
    business_snapchat_fr: null,
    business_snapchat_de: null,
    business_snapchat_en: null,
    business_spotify_nl: null,
    business_spotify_fr: null,
    business_spotify_de: null,
    business_spotify_en: null,
    bon: {
      info_text:
        "Zo worden de handelszaken ondersteunt én verhogen we een beetje de koopkracht van elke inwoner.",
      info_title: "Een kadobon van € 5 of € 20 kan online aangekocht worden.",
      intro_text:
        "Koop Lokaal is meer dan ooit nodig! De gemeentelijke kadobon is een initiatief van UNIZO.",
      link: "https://www.unizo-erpe-mere.be/kadobon/online-bestellen/",
      municipality: "Erpe-Mere",
      name: "Erpe-Mere kadobon",
    },
    contact_info: [
      {
        score: 10,
        datasource: "KBO",
        contact_method: {
          medium: "Fixed",
          value: "053 81 07 77",
          name: "",
        },
      },
      {
        score: 10,
        datasource: "KBO",
        contact_method: {
          medium: "Facebook",
          value: "https://www.facebook.com/identityBuildingBelgium/",
          name: "",
        },
      },
      {
        score: 10,
        datasource: "OSN",
        contact_method: {
          medium: "Facebook",
          value: "https://www.facebook.com/vlaanderen100procentlokaal",
          name: "",
        },
      },
      {
        score: 10,
        datasource: "OSN",
        contact_method: {
          medium: "Instagram",
          value: "https://www.instagram.com/identitybuilding/",
          name: "",
        },
      },
      {
        score: 10,
        datasource: "OSN",
        contact_method: {
          medium: "Email",
          value: 571841,
          name: "",
        },
      },
      {
        score: 10,
        datasource: "OSN",
        contact_method: {
          medium: "Website",
          value: "https://shoppa.world/",
          name: "Shoppa",
        },
      },
      {
        score: 10,
        datasource: "KBO",
        contact_method: {
          medium: "Website",
          value: "http://www.identityBuilding.be",
          name: "identityBuilding",
        },
      },
      {
        score: 10,
        datasource: "CUSTOMER",
        contact_method: {
          medium: "Fax",
          value: "053 78 07 77",
          name: "",
        },
      },
    ],
    contact_persons: [
      {
        contact_person: {
          first_name: "Erik",
          last_name: "Vercruysse",
          birthday: "2022-08-27",
          language: {
            dutch: false,
            french: false,
            german: false,
            english: false,
          },
          biv: null,
          epc: null,
          personal_contact_methods: [
            {
              medium: "Email",
              value: "office@identitybuilding.be",
            },
            {
              medium: "Mobile",
              value: "0497 579 777",
            },
            {
              medium: "Fixed",
              value: "053 78 07 77",
            },
          ],
          avatar:
            "https://zappa-tlaqv351d.s3.amazonaws.com/media/images/BE0718600051_Erik-Vercruysse.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAY5JVQWUVO3MN3PUW%2F20220830%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20220830T063521Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=c8b27cee16784d0c66e1afa087169136d6086a455b963a1beb5a4cb5dcfa7781",
        },
        business_contact_methods: [],
        function_title: "Bestuurder",
        section: "Bestuurder",
        avatar: "",
      },
    ],
    allow_local_voucher: true,
    payment_methods: [13, 11, 17, 18, 2, 5, 10, 1],
    other_payment_methods: "test",
    facilities: [21, 19, 22, 26],
    other_facilities: "test, test",
    timetables: [
      {
        score: 1,
        timetable: {
          timetable_type: {
            title: "Feestdagen",
          },
          appointment_only: false,
          is_24_7: false,
          records: [
            {
              appointment: false,
              valid_days: ["0"],
              timeslots: [
                {
                  from_time: "13:00:00",
                  to_time: "20:00:00",
                  message: null,
                },
                {
                  from_time: "07:00:00",
                  to_time: "12:00:00",
                  message: null,
                },
              ],
              messages: [],
            },
            {
              appointment: false,
              valid_days: ["7"],
              timeslots: [],
              messages: [],
            },
          ],
          messages: [],
        },
      },
      {
        score: 1,
        timetable: {
          timetable_type: {
            title: "Kantoor",
          },
          appointment_only: false,
          is_24_7: false,
          records: [
            {
              appointment: false,
              valid_days: ["0"],
              timeslots: [
                {
                  from_time: "13:00:00",
                  to_time: "20:00:00",
                  message: null,
                },
                {
                  from_time: "06:30:00",
                  to_time: "12:30:00",
                  message: null,
                },
              ],
              messages: [],
            },
            {
              appointment: false,
              valid_days: ["7"],
              timeslots: [],
              messages: [],
            },
          ],
          messages: [],
        },
      },
    ],
    interest_in_businesspage: true,
    contact_me: true,
    contact_me_question: "dit is een vraag?",
  },
  correctOTP: false,
  email: "",
  password: "",
  logged_in: true,
};

const GeneralReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_LANG":
      return { ...state, lang: action.lang };

    case "UPDATE_CURRENT_ESTABLISHMENT":
      return { ...state, current_establishment: action.establishment };

    case "UPDATE_CORRECT_OTP":
      return { ...state, correctOTP: action.value };

    case "UPDATE_EMAIL":
      return { ...state, email: action.value };

    case "UPDATE_PASSWORD":
      return { ...state, password: action.value };

    default:
      return state;
  }
};

export default GeneralReducer;
