/* GENERATED from config.json by build/build_data.py — do not edit. */
window.CFG = {
  "_note": "The ONLY file to edit for contact details and the mail route. whatsapp = digits only with country code, no + and no spaces (e.g. 9647XXXXXXXXX). maps = a full Google Maps URL. Leave any value empty and its row hides itself. contact.email = the firm's real shared mailbox on Microsoft 365 (info@alaminlegal.com).",
  "firm": {
    "ar": "الأمين للمحاماة والاستشارات القانونية",
    "en": "Al-Amin Advocates & Legal Consultants"
  },
  "contact": {
    "email": "info@alaminlegal.com",
    "phone": "+964 781 432 9186",
    "whatsapp": "",
    "city": {
      "ar": "بغداد — العراق",
      "en": "Baghdad — Iraq"
    },
    "address": {
      "ar": "بغداد — الكرادة",
      "en": "Baghdad — Karrada"
    },
    "phone2": "",
    "hours": {
      "ar": "٩:٠٠ ص – ٥:٠٠ م",
      "en": "9:00 AM – 5:00 PM"
    },
    "maps": "https://maps.google.com/?q=Baghdad"
  },
  "mail": {
    "_providers": "worker | formsubmit | web3forms | supabase | mailto",
    "_worker": "the firm's own route: POST to 'endpoint' (Cloudflare Worker alamin-forms) which sends through Microsoft 365 into info@. No third party sees the enquiry.",
    "endpoint": "https://forms.alaminlegal.com/contact",
    "_formsubmit": "zero signup. Put the destination in contact.email, submit once, then click the confirmation link that arrives at that address. Live from then on.",
    "_web3forms": "paste the access key from web3forms.com into 'key'.",
    "_supabase": "the private route — set url + anonKey + table; the DB trigger mails it. Use this for production: confidential intake never leaves the firm's own store.",
    "provider": "worker",
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
