/* GENERATED from config.json by build/build_data.py — do not edit. */
window.CFG = {
  "_note": "The ONLY file to edit for contact details and the mail route. whatsapp = digits only with country code, no + and no spaces (e.g. 9647XXXXXXXXX). maps = a full Google Maps URL. Leave any value empty and its row hides itself. contact.email is EMPTY on purpose: the firm has no mailbox yet, and a plausible-looking fake address on a law firm site is worse than none.",
  "firm": {
    "ar": "الأمين للمحاماة والاستشارات القانونية",
    "en": "Al-Amin Advocates & Legal Consultants"
  },
  "contact": {
    "email": "",
    "phone": "",
    "whatsapp": "",
    "city": {
      "ar": "بغداد — العراق",
      "en": "Baghdad — Iraq"
    },
    "address": {
      "ar": "",
      "en": ""
    },
    "phone2": "",
    "hours": {
      "ar": "٩:٠٠ ص – ٥:٠٠ م",
      "en": "9:00 AM – 5:00 PM"
    },
    "maps": ""
  },
  "mail": {
    "_providers": "formsubmit | web3forms | supabase | mailto",
    "_formsubmit": "zero signup. Put the destination in contact.email, submit once, then click the confirmation link that arrives at that address. Live from then on.",
    "_web3forms": "paste the access key from web3forms.com into 'key'.",
    "_supabase": "the private route — set url + anonKey + table; the DB trigger mails it. Use this for production: confidential intake never leaves the firm's own store.",
    "provider": "formsubmit",
    "key": "",
    "supabase": {
      "url": "",
      "anonKey": "",
      "table": "consultation_requests"
    },
    "subject": {
      "ar": "طلب استشارة جديد من الموقع",
      "en": "New consultation request from the website"
    }
  }
};
