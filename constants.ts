

import { TimelineEvent, Achievement, ElectionResult, DocumentItem, NewsItem, GalleryItem, Responsibility, VisionItem, EventItem, SupportItem, FAQItem, CareerMilestone, BusinessRole, CommitmentItem, MovementItem } from './types';

export const NAV_LINKS = [
  { name: 'হোম', href: '/' },
  { name: 'জীবনী', href: '/biography' },
  { name: 'ভিশন', href: '/vision' },
  { name: 'এলাকা', href: '/area' },
  { name: 'গ্যালারি', href: '/Gallery' },
  { name: 'খবর', href: '/news' },
  { name: 'ভোটার স্লিপ', href: '/voter-slip' },
  { name: 'যোগাযোগ', href: '/contact' },
];

export const COMMON_KEYWORDS = [
  "Lutfur Rahman Kajal", "লুৎফুর রহমান কাজল", 
  "Kajal MP", "কাজল এমপি", 
  "Cox's Bazar-3", "কক্সবাজার-৩", 
  "BNP Cox's Bazar", "বিএনপি কক্সবাজার", 
  "MP Bangladesh", "সংসদ সদস্য",
  "Ramu", "রামু", "Eidgaon", "ঈদগাঁও",
  "Bangladesh Nationalist Party", "বাংলাদেশ জাতীয়তাবাদী দল",
  "Niribili Group", "নিরিবিলি গ্রুপ",
  "lutfur rahman kajal news", "lutfur rahman kajal biography",
  "লুৎফুর রহমান কাজল খবর", "লুৎফুর রহমান কাজল জীবনী",
  "kajal lutfur rahman", "kajal politician bangladesh",
  "lutfur rahman kajal latest news", "lutfur rahman kajal update 2026",
  "kajal bangladesh politics news", "kajal statement today",
  "kajal speech news", "লুৎফুর রহমান কাজল সর্বশেষ খবর",
  "কাজল আজকের খবর", "কাজল রাজনৈতিক আপডেট",
  "কাজল বক্তব্য আজ", "lutfur rahman kajal who is he",
  "lutfur rahman kajal political career", "kajal bangladesh leader profile",
  "kajal controversy news", "kajal interview bangla",
  "লুৎফুর রহমান কাজল কে", "কাজল কোন দলের",
  "কাজল এর রাজনৈতিক জীবন", "কাজল সম্পর্কে বিস্তারিত",
  "kajal news today", "kajal viral news",
  "kajal facebook post", "kajal latest update",
  "kajal video speech", "কাজল ভাইরাল খবর",
  "কাজল ফেসবুক পোস্ট", "কাজল ভিডিও",
  "kajal news website", "lutfur rahman kajal official",
  "kajal news portal", "kajal blog bangla",
  "kajal media", "কাজল নিউজ ওয়েবসাইট",
  "কাজল অফিসিয়াল সাইট", "coxs bazar", "mp",
  "kajal news", "kajal bangladesh", "kajal politics", "কাজল খবর", "কাজল আপডেট", "kajal biography", "kajal speech", "kajal update", "kajal latest news",
  "coxs bazar 3 mp", "coxs bazar 3 mp kajal", "lutfur rahman kajal coxs bazar 3", "kajal mp coxs bazar",
  "coxs bazar 03 mp news", "coxs bazar 3 mp latest news", "kajal coxs bazar politics", "kajal mp news today",
  "coxs bazar 3 election mp", "kajal election news", "লুৎফুর রহমান কাজল কক্সবাজার ৩", "কক্সবাজার ৩ আসনের এমপি কাজল",
  "কাজল এমপি কক্সবাজার", "কক্সবাজার ০৩ এমপি খবর", "কাজল কক্সবাজার রাজনীতি", "কাজল এমপি আপডেট",
  "কাজল নির্বাচনী খবর", "কাজল বক্তব্য কক্সবাজার", "কাজল রাজনৈতিক নেতা", "কক্সবাজার ৩ আসনের খবর",
  "kajal coxs bazar mp profile", "lutfur rahman kajal mp profile", "kajal mp biography coxs bazar",
  "kajal mp political career", "kajal mp bangladesh", "kajal leader coxs bazar", "kajal mp speech",
  "kajal mp interview", "kajal mp video", "kajal mp facebook", "কক্সবাজার ৩ আসনের রাজনীতি",
  "কক্সবাজার এমপি কাজল", "কাজল জীবনী কক্সবাজার", "কাজল রাজনৈতিক জীবন", "কাজল এমপি প্রোফাইল",
  "কাজল এমপি বক্তব্য", "কাজল সাক্ষাৎকার", "কাজল ভিডিও", "কাজল ফেসবুক পোস্ট", "কাজল লাইভ",
  "kajal coxs bazar update", "kajal coxs bazar latest news", "kajal coxs bazar today", "kajal coxs bazar speech today",
  "kajal coxs bazar viral news", "kajal coxs bazar controversy", "kajal coxs bazar election result",
  "kajal coxs bazar vote news", "kajal coxs bazar development", "kajal coxs bazar project", "কাজল কক্সবাজার আপডেট",
  "কাজল কক্সবাজার সর্বশেষ খবর", "কাজল কক্সবাজার আজকের খবর", "কাজল কক্সবাজার বক্তব্য আজ", "কাজল ভাইরাল খবর",
  "কাজল বিতর্ক", "কাজল নির্বাচনের ফলাফল", "কাজল ভোটের খবর", "কাজল উন্নয়ন কাজ", "কাজল প্রকল্প",
  "coxs bazar 3 seat mp kajal", "coxs bazar constituency 3 kajal", "kajal mp constituency coxs bazar",
  "kajal mp seat 3 bangladesh", "kajal mp district coxs bazar", "kajal mp region coxs bazar",
  "kajal mp local news", "kajal mp area update", "kajal mp development news", "kajal mp local politics",
  "কক্সবাজার ৩ আসন কাজল", "কক্সবাজার আসন ৩ এমপি", "কাজল আসন কক্সবাজার", "কাজল এমপি এলাকা",
  "কাজল এমপি জেলা কক্সবাজার", "কাজল স্থানীয় খবর", "কাজল এলাকা আপডেট", "কাজল উন্নয়ন সংবাদ",
  "কাজল স্থানীয় রাজনীতি", "কাজল জনগণের নেতা", "kajal news coxs bazar", "kajal update bangladesh",
  "kajal politics bangladesh", "kajal leader news", "kajal public meeting", "kajal rally news",
  "kajal protest news", "kajal campaign news", "kajal supporter news", "kajal team news",
  "কাজল সংবাদ কক্সবাজার", "কাজল আপডেট বাংলাদেশ", "কাজল রাজনীতি বাংলাদেশ", "কাজল নেতা খবর",
  "কাজল জনসভা", "কাজল মিছিল", "কাজল প্রতিবাদ", "কাজল প্রচারণা", "কাজল সমর্থক", "কাজল দলীয় খবর"
];

export const TIMELINE_DATA: TimelineEvent[] = [
  {
    year: '১৯৬৬',
    title: 'জন্ম ও প্রারম্ভিক জীবন',
    description: '১৮ নভেম্বর ১৯৬৬ সালে কক্সবাজার জেলার পোকখালীর গোমাতলী ইউনিয়নে এক সম্ভ্রান্ত পরিবারে জন্মগ্রহণ করেন।',
  },
  {
    year: 'ছাত্রজীবন',
    title: 'ছাত্রদলের মাধ্যমে রাজনীতিতে সক্রিয়',
    description: 'ছাত্রজীবন থেকেই বাংলাদেশ জাতীয়তাবাদী ছাত্রদলের রাজনীতির সঙ্গে জড়িত ছিলেন।',
  },
  {
    year: '২০০৮',
    title: 'প্রথমবার সংসদ সদস্য নির্বাচিত',
    description: 'কক্সবাজার-০৩ আসন থেকে বিএনপির প্রার্থী হিসেবে সংসদ সদস্য নির্বাচিত হন।',
  },
  {
    year: '২০১৬',
    title: 'কেন্দ্রীয় মৎস্যজীবী বিষয়ক সম্পাদক',
    description: 'বিএনপির জাতীয় নির্বাহী কমিটির মৎস্যজীবী বিষয়ক সম্পাদক হিসেবে দায়িত্ব পালন শুরু করেন।',
  },
  {
    year: 'বর্তমান',
    title: 'নিরিবিলি গ্রুপের চেয়ারম্যান',
    description: 'বর্তমানে তিনি স্বনামধন্য নিরিবিলি গ্রুপের চেয়ারম্যান হিসেবে দায়িত্ব পালন করছেন।',
  },
  {
    year: '২০২৬',
    title: '১৩তম জাতীয় সংসদ নির্বাচনে বিজয়',
    description: 'ত্রয়োদশ জাতীয় সংসদ নির্বাচনে কক্সবাজার-০৩ আসন থেকে বিএনপি মনোনীত ধানের শীষের প্রার্থী হিসেবে বিপুল ভোটে সংসদ সদস্য নির্বাচিত হন।',
  }
];

export const RESPONSIBILITIES_DATA: Responsibility[] = [
  {
    id: 1,
    title: 'সংসদীয় দায়িত্ব',
    role: 'সংসদ সদস্য',
    description: 'সংসদে জনগণের পক্ষে কথা বলা, আইন প্রণয়নে অংশগ্রহণ, এবং এলাকার উন্নয়নমূলক প্রকল্পে বরাদ্দ নিশ্চিত করা।',
    iconName: 'Gavel',
  },
  {
    id: 2,
    title: 'রাজনৈতিক দায়িত্ব',
    role: 'মৎস্যজীবী বিষয়ক সম্পাদক, বিএনপি',
    description: 'দলের তৃণমূল পর্যায়ে সংগঠন শক্তিশালী করা, কেন্দ্রীয় কর্মসূচি বাস্তবায়ন এবং দলীয় নেতাকর্মীদের সুসংগঠিত রাখা।',
    iconName: 'Flag',
  },
  {
    id: 3,
    title: 'সামাজিক দায়িত্ব',
    role: 'সমাজসেবক',
    description: 'শিক্ষা বিস্তার, স্বাস্থ্যসেবা নিশ্চিতকরণ এবং দরিদ্র ও অসহায় মানুষের পাশে দাঁড়ানো। বিভিন্ন স্কুল ও মাদ্রাসার পৃষ্ঠপোষকতা।',
    iconName: 'Heart',
  },
  {
    id: 4,
    title: 'উদ্যোক্তা দায়িত্ব',
    role: 'প্রতিষ্ঠাতা, নিরিবিলি গ্রুপ',
    description: 'শিল্প প্রতিষ্ঠান পরিচালনার মাধ্যমে কর্মসংস্থান সৃষ্টি এবং স্থানীয় অর্থনীতিতে অবদান রাখা।',
    iconName: 'Briefcase',
  }
];

export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    id: 1,
    title: 'সড়ক ও অবকাঠামো উন্নয়ন',
    category: 'Infrastructure',
    description: 'কক্সবাজার সদর ও রামু উপজেলার প্রত্যন্ত অঞ্চলে প্রায় ১৫০ কিলোমিটার গ্রামীণ সড়ক পাকা করন।',
    iconName: 'Road',
  },
  {
    id: 2,
    title: 'শিক্ষা বিস্তার',
    category: 'Education',
    description: 'এলাকায় ৩টি নতুন কলেজ ভবন এবং ১০টি প্রাথমিক বিদ্যালয়ের নতুন ভবন নির্মাণ ও সংস্কার।',
    iconName: 'BookOpen',
  },
  {
    id: 3,
    title: 'পর্যটন সুরক্ষা',
    category: 'Development',
    description: 'কক্সবাজার সমুদ্র সৈকতের সৌন্দর্যবর্ধন ও পর্যটকদের নিরাপত্তায় বিশেষ টাস্কফোর্স গঠনে সংসদে প্রস্তাবনা।',
    iconName: 'Umbrella',
  },
  {
    id: 4,
    title: 'মৎস্যজীবীদের সহায়তা',
    category: 'Social',
    description: 'জেলেদের জন্য বিশেষ ভিজিএফ কার্ড এবং দুর্যোগকালীন সময়ে আর্থিক প্রণোদনার ব্যবস্থা গ্রহণ।',
    iconName: 'Fish',
  }
];

export const ELECTION_DATA: ElectionResult[] = [
  {
    year: '২০০৮',
    candidateVotes: 126000,
    opponentVotes: 98000,
    totalVoters: 250000,
    result: 'জয়ী',
  },
  {
    year: '২০১৮',
    candidateVotes: 85000,
    opponentVotes: 140000, 
    totalVoters: 280000,
    result: 'নিকটতম প্রতিদ্বন্দ্বী',
  },
  {
    year: '২০২৬',
    candidateVotes: 182096,
    opponentVotes: 161827,
    totalVoters: 348939,
    result: 'জয়ী',
  },
];

export const DOCUMENTS_DATA: DocumentItem[] = [
  {
    id: 1,
    title: 'নির্বাচনী হলফনামা ২০০৮',
    type: 'PDF',
    date: '০৫ জানুয়ারি, ২০০৮',
    size: '২.৫ মেগাবাইট'
  },
  {
    id: 2,
    title: 'সংসদে প্রদত্ত বাজেট বক্তৃতা ২০১২',
    type: 'PDF',
    date: '১২ জুন, ২০১২',
    size: '১.২ মেগাবাইট'
  },
  {
    id: 3,
    title: 'নির্বাচনী ইশতেহার ২০১৮',
    type: 'DOC',
    date: '১৫ ডিসেম্বর, ২০১৮',
    size: '৮০০ কিলোবাইট'
  }
];

export const GALLERY_IMAGES: GalleryItem[] = [
  { 
    id: 1, 
    type: 'image', 
    category: 'Political',
    url: 'https://ik.imagekit.io/uekohag7w/bnp/%E0%A6%A8%E0%A7%87%E0%A6%A4%E0%A6%BE%E0%A6%95%E0%A6%B0%E0%A7%8D%E0%A6%AE%E0%A7%80%E0%A6%A6%E0%A7%87%E0%A6%B0%20%E0%A6%B8%E0%A6%BE%E0%A6%A5%E0%A7%87%20%E0%A6%AE%E0%A6%A4%E0%A6%AC%E0%A6%BF%E0%A6%A8%E0%A6%BF%E0%A6%AE%E0%A7%9F', 
    caption: 'নেতাকর্মীদের সাথে মতবিনিময়' 
  },
  { 
    id: 2, 
    type: 'image', 
    category: 'Development',
    url: 'https://ik.imagekit.io/uekohag7w/bnp/%E0%A6%AC%E0%A6%BF%E0%A6%8F%E0%A6%A8%E0%A6%AA%E0%A6%BF%E0%A6%B0%20%E0%A6%96%E0%A7%81%E0%A6%A8%E0%A6%BF%E0%A6%AF%E0%A6%BC%E0%A6%BE%E0%A6%AA%E0%A6%BE%E0%A6%B2%E0%A6%82%20%E0%A6%87%E0%A6%89%E0%A6%A8%E0%A6%BF%E0%A6%AF%E0%A6%BC%E0%A6%A8%20%E0%A6%85%E0%A6%AB%E0%A6%BF%E0%A6%B8%E0%A7%87%E0%A6%B0%20%E0%A6%89%E0%A6%A6%E0%A7%8D%E0%A6%AC%E0%A7%8B%E0%A6%A7%E0%A6%A8%20%E0%A6%95%E0%A6%B0%E0%A6%B2%E0%A7%87%E0%A6%A8%20%E0%A6%B2%E0%A7%81%E0%A7%8E%E0%A6%AB%E0%A6%B0%20%E0%A6%B0%E0%A6%B9%E0%A6%AE%E0%A6%BE%E0%A6%A8%20%E0%A6%95%E0%A6%BE%E0%A6%9C%E0%A6%B2', 
    caption: 'বিএনপির খুনিয়াপালং ইউনিয়ন অফিসের উদ্বোধন' 
  },
  { 
    id: 3, 
    type: 'image', 
    category: 'Social',
    url: 'https://ik.imagekit.io/uekohag7w/bnp/%E0%A6%AC%E0%A6%A8%E0%A7%8D%E0%A6%AF%E0%A6%BE%20%E0%A6%A6%E0%A7%81%E0%A6%B0%E0%A7%8D%E0%A6%97%E0%A6%A4%E0%A6%A6%E0%A7%87%E0%A6%B0%20%E0%A6%AE%E0%A6%A4%E0%A6%B2%E0%A6%BF%E0%A6%A4%E0%A7%8D%E0%A6%B0%E0%A6%BE%E0%A6%A3%20%E0%A6%AC%E0%A6%BF%E0%A6%A4%E0%A6%B0%E0%A6%A3', 
    caption: 'বন্যা দুর্গতদের মাঝে ত্রাণ বিতরণ' 
  },
  { 
    id: 4, 
    type: 'image', 
    category: 'Political',
    url: 'https://ik.imagekit.io/uekohag7w/bnp/%E0%A6%9C%E0%A6%A8%E0%A6%B8%E0%A6%AD%E0%A6%BE%E0%A7%9F%20%E0%A6%AC%E0%A6%95%E0%A7%8D%E0%A6%A4%E0%A6%AC%E0%A7%8D%E0%A6%AF%20%E0%A6%B0%E0%A6%BE%E0%A6%96%E0%A6%9B%E0%A7%87%E0%A6%A8%20%E0%A6%B2%E0%A7%81%E0%A7%8E%E0%A6%AB%E0%A7%81%E0%A6%B0%20%E0%A6%B0%E0%A6%B9%E0%A6%AE%E0%A6%BE%E0%A6%A8%20%E0%A6%95%E0%A6%BE%E0%A6%9C%E0%A6%B2', 
    caption: 'জনসভায় বক্তব্য রাখছেন লুৎফুর রহমান কাজল' 
  },
  {
    id: 5,
    type: 'image',
    category: 'Family',
    url: 'https://image.mojib.me/uploads/General/1775299892_aece70c0-28d9-4dc1-8e43-3fa8491228a3.png',
    caption: 'পারিবারিক ও ব্যক্তিগত মুহূর্ত'
  }
];

export const CONTACT_INFO = {
  dhakaAddress: 'ফ্ল্যাট: বি-১, বাসা: ১৫, রোড: ৫, সেক্টর: ১, উত্তরা মডেল টাউন, ঢাকা-১২৩০।',
  permanentAddress: 'হোটেল নিরিবিলি অর্কিড লিমিটেড, কলাতলী রোড, কক্সবাজার পৌরসভা (বর্ধিতাংশ), কক্সবাজার।',
  emails: ['kazallr@hotmail.com', 'lutfurk@yahoo.com'],
  phones: {
    cell: '০১৭২৬৫৬২৬৩২',
    office: '০৩৪১-৬৪৩২৪, ৬৪৩৩৪',
    home: '৮৯২০২০৩',
    fax: '০৩৪১-৬৪৩৩৪'
  },
  facebook: 'https://facebook.com',
  youtube: 'https://youtube.com',
};

export const VISION_DATA: VisionItem[] = [
  {
    id: 1,
    title: 'কক্সবাজার বিশ্ববিদ্যালয় স্থাপন',
    description: 'এলাকার শিক্ষার্থীদের উচ্চশিক্ষার সুযোগ সৃষ্টির লক্ষ্যে কক্সবাজারে একটি পূর্ণাঙ্গ পাবলিক বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় স্থাপন।',
    iconName: 'GraduationCap'
  },
  {
    id: 2,
    title: 'আন্তর্জাতিক পর্যটন উন্নয়ন',
    description: 'পর্যটন শিল্পকে আধুনিকায়ন, পর্যটকদের নিরাপত্তা নিশ্চিতকরণ এবং এক্সক্লুসিভ ট্যুরিস্ট জোন গড়ে তোলা।',
    iconName: 'Palmtree'
  },
  {
    id: 3,
    title: 'মৎস্য শিল্প ও ক্যাম্পাস',
    description: 'মেরিন ফিশারিজ একাডেমি ক্যাম্পাস স্থাপন এবং মৎস্য প্রক্রিয়াজাতকরণ অঞ্চল তৈরির মাধ্যমে রপ্তানি আয় বৃদ্ধি।',
    iconName: 'Fish'
  },
  {
    id: 4,
    title: 'সড়ক ও যোগাযোগ উন্নয়ন',
    description: 'মেরিন ড্রাইভ সড়ক সম্প্রসারণ, গ্রামীণ রাস্তাঘাট পাকা করন এবং কক্সবাজারের সাথে সারাদেশের রেল যোগাযোগ আরও উন্নত করা।',
    iconName: 'Truck'
  },
  {
    id: 5,
    title: 'যুব কর্মসংস্থান',
    description: 'আইটি পার্ক স্থাপন এবং কারিগরি প্রশিক্ষণের মাধ্যমে বেকার যুবকদের জন্য কর্মসংস্থান সৃষ্টি।',
    iconName: 'Briefcase'
  },
  {
    id: 6,
    title: 'উপকূল রক্ষা ও বেড়িবাঁধ',
    description: 'জলবায়ু পরিবর্তনের ঝুঁকি মোকাবেলায় টেকসই বেড়িবাঁধ নির্মাণ এবং উপকূলীয় বনায়ন কর্মসূচি।',
    iconName: 'ShieldCheck'
  }
];

export const NEWS_DATA: NewsItem[] = [
  {
    id: 1,
    title: 'লুৎফুর রহমান কাজল সংসদ সদস্য নির্বাচিত হওয়ায় শোকরানা সভা ও ইফতার মাহফিল',
    source: 'দৈনিক স্বাধীন সংবাদ',
    date: '৩০ মার্চ, ২০২৬',
    summary: 'কক্সবাজার-৩ আসনে বিপুল ভোটে জয়ী হওয়ার পর লুৎফুর রহমান কাজলের উদ্যোগে শোকরানা সভা ও ইফতার মাহফিল অনুষ্ঠিত হয়েছে।',
    image: 'https://dailyswadhinsangbad.com/wp-content/uploads/2026/03/image-34.png',
    link: 'https://dailyswadhinsangbad.com/%E0%A6%B2%E0%A7%81%E0%A7%8E%E0%A6%AB%E0%A7%81%E0%A6%B0-%E0%A6%B0%E0%A6%B9%E0%A6%AE%E0%A6%BE%E0%A6%A8-%E0%A6%95%E0%A6%BE%E0%A6%9C%E0%A6%B2-%E0%A6%B8%E0%A6%82%E0%A6%B8%E0%A6%A6-%E0%A6%B8%E0%A6%A6/',
    type: 'News'
  },
  {
    id: 2,
    title: 'বিপুল ভোটে জয়ী লুৎফুর রহমান কাজল',
    source: 'দৈনিক যুগান্তর',
    date: '১২ ফেব্রুয়ারি, ২০২৬',
    summary: 'কক্সবাজার-৩ আসনে ধানের শীষের প্রার্থী লুৎফুর রহমান কাজল বিপুল ভোটের ব্যবধানে জয়লাভ করেছেন।',
    image: 'https://cdn.jugantor.com/assets/news_photos/2026/02/12/photocart-1-(3)-698e0d48499e5.png',
    link: 'https://www.jugantor.com/bnp/1064873',
    type: 'News'
  },
  {
    id: 3,
    title: 'কক্সবাজার-৩ আসনে বিএনপির প্রার্থী কাজলের বড় জয়',
    source: 'সারাবাংলা',
    date: '১২ ফেব্রুয়ারি, ২০২৬',
    summary: 'ত্রয়োদশ জাতীয় সংসদ নির্বাচনে কক্সবাজার-৩ (সদর-রামু) আসনে বড় ব্যবধানে জয়ী হয়েছেন বিএনপি মনোনীত প্রার্থী লুৎফুর রহমান কাজল।',
    image: 'https://sarabangla.net/wp-content/uploads/2026/02/kajol-826x497.jpg',
    link: 'https://sarabangla.net/news/bangladesh/post-1122355/',
    type: 'News'
  },
  {
    id: 4,
    title: 'ত্রয়োদশ জাতীয় নির্বাচনে কক্সবাজার-৩ আসনে জয়ী কাজল',
    source: 'ইনস্টাগ্রাম',
    date: '১২ ফেব্রুয়ারি, ২০২৬',
    summary: 'কক্সবাজার-৩ আসনে ধানের শীষের প্রার্থী লুৎফুর রহমান কাজলের ঐতিহাসিক বিজয় উদযাপিত হচ্ছে।',
    image: 'https://d2u0ktu8omkpf6.cloudfront.net/76e74a50262ff9d770e9e6aac3f0baedaad1a0d6b3a5c6fa.jpg',
    link: 'https://www.instagram.com/p/DUqgETjD5sI/',
    type: 'News'
  },
  {
    id: 5,
    title: 'কক্সবাজারকে আন্তর্জাতিক পর্যটন নগরী করব',
    source: 'সময় নিউজ',
    date: '১৩ ফেব্রুয়ারি, ২০২৬',
    summary: 'নির্বাচিত হওয়ার পর লুৎফুর রহমান কাজল কক্সবাজারকে বিশ্বের অন্যতম সেরা পর্যটন নগরী হিসেবে গড়ে তোলার অঙ্গীকার ব্যক্ত করেছেন।',
    image: 'https://d2u0ktu8omkpf6.cloudfront.net/5e4224c3ce37a083e88d051095189405b76f575e46f1c5e2.jpg',
    link: 'https://www.somoynews.tv/news/2026-02-13/I04sXCNC',
    type: 'News'
  },
  {
    id: 6,
    title: 'বিএনপি প্রার্থী কাজলের নির্বাচনী জনসভা ও প্রচারণা জোরদার',
    source: 'ফেসবুক',
    date: '৫ ফেব্রুয়ারি, ২০২৬',
    summary: 'নির্বাচনী প্রচারণার শেষ মুহূর্তে লুৎফুর রহমান কাজলের পক্ষে গণজোয়ার সৃষ্টি হয়েছে।',
    image: 'https://ik.imagekit.io/uekohag7w/bnp/%E0%A6%9C%E0%A6%A8%E0%A6%B8%E0%A6%AD%E0%A6%BE%E0%A7%9F%20%E0%A6%AC%E0%A6%95%E0%A7%8D%E0%A6%A4%E0%A6%AC%E0%A7%8D%E0%A6%AF%20%E0%A6%B0%E0%A6%BE%E0%A6%96%E0%A6%9B%E0%A7%87%E0%A6%A8%20%E0%A6%B2%E0%A7%81%E0%A7%8E%E0%A6%AB%E0%A7%81%E0%A6%B0%20%E0%A6%B0%E0%A6%B9%E0%A6%AE%E0%A6%BE%E0%A6%A8%20%E0%A6%95%E0%A6%BE%E0%A6%9C%E0%A6%B2',
    link: 'https://www.facebook.com/reel/1222267156087768',
    type: 'News'
  },
  {
    id: 7,
    title: 'নির্বাচনি মাঠে ধানের শীষের প্রার্থী কাজলের উত্তাপ, তৃণমূলে জয়জয়কার',
    source: 'ঢাকা মেইল',
    date: '২২ জানুয়ারি, ২০২৬',
    summary: 'কক্সবাজারের প্রতিটি প্রান্তে লুৎফুর রহমান কাজলের ধানের শীষের পক্ষে ব্যাপক সমর্থন দেখা যাচ্ছে।',
    image: 'https://cdx.dhakamail.com/media/images/2026January/kajol_20260122_113456613.jpg',
    link: 'https://dhakamail.com/country/281685',
    type: 'News'
  },
  {
    id: 8,
    title: 'বিজয়োল্লাস নয়, দেশজুড়ে দোয়া ও প্রার্থনার ডাক দিল বিএনপি',
    source: 'দেশ রূপান্তর',
    date: '১১ নভেম্বর, ২০২৫',
    summary: 'বিজয় উদযাপনের পরিবর্তে দেশ ও জাতির কল্যাণে দোয়া মাহফিলের আয়োজন করার নির্দেশ দিয়েছে বিএনপি।',
    image: 'https://cdn.deshrupantor.net/contents/cache/images/900x505x1/uploads/media/2025/11/11/75cf31221281948e6a92d559afd47ab2-6912bb30bbe7a.jpg?jadewits_media_id=151248',
    link: 'https://www.deshrupantor.com/664358/%E0%A6%AC%E0%A6%BF%E0%A6%9C%E0%A7%9F%E0%A7%8B%E0%A6%B2%E0%A7%8D%E0%A6%B2%E0%A6%BE%E0%A6%B8-%E0%A6%A8%E0%A7%9F-%E0%A6%A6%E0%A7%87%E0%A6%B6%E0%A6%9C%E0%A7%81%E0%A7%9C%E0%A7%87-%E0%A6%A6%E0%A7%8B%E0%A7%9F%E0%A6%BE-%E0%A6%93-%E0%A6%AA%E0%A7%8D%E0%A6%B0%E0%A6%BE%E0%A6%B0%E0%A7%8D%E0%A6%A5%E0%A6%A8%E0%A6%BE%E0%A6%B0-%E0%A6%A1%E0%A6%BE%E0%A6%95-%E0%A6%A6%E0%A6%BF%E0%A6%B2',
    type: 'News'
  },
  {
    id: 9,
    title: 'সমৃদ্ধ কক্সবাজার বিনির্মাণে বিএনপির বহুমুখী উন্নয়ন অঙ্গীকার',
    source: 'নিউজ বাংলা ২৪',
    date: '৬ ফেব্রুয়ারি, ২০২৬',
    summary: 'কক্সবাজারের সার্বিক উন্নয়নে বিএনপির পক্ষ থেকে একগুচ্ছ উন্নয়ন পরিকল্পনা তুলে ধরা হয়েছে।',
    image: 'https://www.newsbangla24.com/assets/news_images/2026/02/06/Portal_Image_DN_-_2026-02-06T210431.164.jpg',
    link: 'https://www.newsbangla24.com/politics/266834/BNPs-multifaceted-development-commitment-to-build-a-prosperous-Coxs-Bazar',
    type: 'News'
  },
  {
    id: 10,
    title: 'চ্যানেল আই-এ বিশেষ সাক্ষাৎকার',
    source: 'চ্যানেল আই',
    date: '১০ ফেব্রুয়ারি, ২০২৫',
    summary: 'দেশের বর্তমান রাজনৈতিক পরিস্থিতি এবং কক্সবাজারের উন্নয়ন ভাবনা নিয়ে বিশেষ সাক্ষাৎকারে কথা বলেছেন লুৎফুর রহমান কাজল।',
    image: 'https://image.mojib.me/uploads/General/1775299892_aece70c0-28d9-4dc1-8e43-3fa8491228a3.png',
    link: '#',
    type: 'Interview'
  },
  {
    id: 11,
    title: 'বন্যা পরিস্থিতি নিয়ে প্রেস বিজ্ঞপ্তি',
    source: 'প্রেস উইং',
    date: '১৫ জুলাই, ২০২৪',
    summary: 'কক্সবাজারের নিম্নাঞ্চলে বন্যা দুর্গতদের দ্রুত ত্রাণ সহায়তা পৌঁছানোর দাবি জানিয়ে গণমাধ্যমে বিবৃতি প্রদান।',
    image: 'https://ik.imagekit.io/uekohag7w/bnp/%E0%A6%AC%E0%A6%A8%E0%A7%8D%E0%A6%AF%E0%A6%BE%20%E0%A6%A6%E0%A7%81%E0%A6%B0%E0%A7%8D%E0%A6%97%E0%A6%A4%E0%A6%A6%E0%A7%87%E0%A6%B0%20%E0%A6%AE%E0%A6%BE%E0%A6%9D%E0%A7%87%20%E0%A6%A4%E0%A7%8D%E0%A6%B0%E0%A6%BE%E0%A6%A3%20%E0%A6%AC%E0%A6%BF%E0%A6%A4%E0%A6%B0%E0%A6%A3',
    link: '#',
    type: 'PressNote'
  }
];

export const MESSAGE_DATA = {
  title: 'জনগণের জন্য বার্তা',
  content: 'প্রিয় কক্সবাজারবাসী, আসসালামু আলাইকুম। আমি আপনাদের সন্তান। আমার রাজনীতি আপনাদের কল্যাণ ও কক্সবাজারের উন্নয়নের জন্য। বিগত দিনে আপনারা আমাকে যে ভালোবাসা দিয়েছেন, তার জন্য আমি কৃতজ্ঞ। আগামী দিনে একটি আধুনিক, নিরাপদ ও সমৃদ্ধ কক্সবাজার গড়তে আমি আপনাদের দোয়া ও সমর্থন চাই। আসুন, ভেদাভেদ ভুলে আমরা সবাই মিলে আমাদের প্রিয় কক্সবাজারকে এগিয়ে নিয়ে যাই।',
  author: 'লুৎফুর রহমান কাজল'
};

export const EVENTS_DATA: EventItem[] = [
  {
    id: 1,
    title: 'কর্মী সমাবেশ ও মতবিনিময়',
    date: '১৫ মার্চ, ২০২৫',
    location: 'পাবলিক লাইব্রেরী মাঠ, কক্সবাজার',
    type: 'Upcoming',
    description: 'আসন্ন নির্বাচন উপলক্ষে তৃণমূল কর্মীদের সাথে বিশেষ মতবিনিময় সভা।'
  },
  {
    id: 2,
    title: 'ঈদ পুনর্মিলনী অনুষ্ঠান',
    date: '১০ এপ্রিল, ২০২৫',
    location: 'হোটেল নিরিবিলি, কক্সবাজার',
    type: 'Upcoming',
    description: 'দলীয় নেতাকর্মী ও শুভানুধ্যায়ীদের সাথে ঈদ পরবর্তী শুভেচ্ছা বিনিময়।'
  },
  {
    id: 3,
    title: 'শীতবস্ত্র বিতরণ কর্মসূচি',
    date: '১৫ জানুয়ারি, ২০২৫',
    location: 'রামু উপজেলা চত্বর',
    type: 'Past',
    description: 'অসহায় ও দরিদ্র মানুষের মাঝে শীতবস্ত্র বিতরণ কার্যক্রম।'
  }
];

export const SUPPORT_DATA: SupportItem = {
  title: 'আপনার সমর্থন আমাদের শক্তি',
  description: 'দেশের গণতন্ত্র পুনরুদ্ধার এবং কক্সবাজারের কাঙ্ক্ষিত উন্নয়নে লুৎফুর রহমান কাজলের পাশে থাকুন। আপনার মতামত, পরামর্শ এবং সক্রিয় অংশগ্রহণ আমাদের পথচলাকে ত্বরান্বিত করবে।',
  actionText: 'দলে যোগ দিন',
  link: '/contact'
};

export const FAQ_DATA: FAQItem[] = [
  {
    id: 1,
    question: 'লুৎফুর রহমান কাজল কে?',
    answer: 'লুৎফুর রহমান কাজল হলেন একজন বিশিষ্ট বাংলাদেশী রাজনীতিবিদ এবং শিল্প উদ্যোক্তা। তিনি কক্সবাজার-৩ আসনের নির্বাচিত সংসদ সদস্য (১৩তম জাতীয় সংসদ) এবং বর্তমানে বিএনপির জাতীয় নির্বাহী কমিটির মৎস্যজীবী বিষয়ক সম্পাদক।'
  },
  {
    id: 2,
    question: 'কক্সবাজারের উন্নয়নে তাঁর প্রধান পরিকল্পনাগুলো কী কী?',
    answer: 'তাঁর প্রধান পরিকল্পনাগুলোর মধ্যে রয়েছে কক্সবাজারকে আধুনিক পর্যটন নগরী হিসেবে গড়ে তোলা, পাবলিক বিশ্ববিদ্যালয় স্থাপন, টেকসই বেড়িবাঁধ নির্মাণ এবং যুবসমাজের কর্মসংস্থান সৃষ্টি।'
  },
  {
    id: 3,
    question: 'তাঁর সাথে সরাসরি যোগাযোগের উপায় কী?',
    answer: 'আপনি ঢাকার উত্তরা অফিস অথবা কক্সবাজারের কলাতলীস্থ অফিসে সরাসরি যোগাযোগ করতে পারেন। এছাড়া ওয়েবসাইটের যোগাযোগ ফর্ম, ইমেইল অথবা ফোনের মাধ্যমেও যোগাযোগ করা সম্ভব।'
  },
  {
    id: 4,
    question: 'তিনি বর্তমানে কোন রাজনৈতিক পদে আছেন?',
    answer: 'তিনি বর্তমানে বাংলাদেশ জাতীয়তাবাদী দল (বিএনপি)-এর কেন্দ্রীয় নির্বাহী কমিটির মৎস্যজীবী বিষয়ক সম্পাদক হিসেবে দায়িত্ব পালন করছেন।'
  },
  {
    id: 5,
    question: 'আমি কিভাবে দলীয় কার্যক্রমে যুক্ত হতে পারি?',
    answer: 'আপনি স্থানীয় বিএনপি অফিসে যোগাযোগ করে অথবা এই ওয়েবসাইটের "যোগাযোগ" সেকশনে আপনার তথ্য দিয়ে দলীয় কার্যক্রমে অংশগ্রহণের আগ্রহ প্রকাশ করতে পারেন।'
  }
];

export const POLITICAL_CAREER_DATA: CareerMilestone[] = [
  {
    id: 1,
    period: '১৯৮০',
    organization: 'জাতীয়তাবাদী ছাত্রদল',
    role: 'ছাত্রদলে যোগদান',
    description: '১৯৮০ সালে ছাত্রদলের মাধ্যমে রাজনীতিতে পদার্পণ।'
  },
  {
    id: 2,
    period: '১৯৮৩–১৯৮৬',
    organization: 'জাতীয়তাবাদী ছাত্রদল, কক্সবাজার জেলা শাখা',
    role: 'যুগ্ম আহ্বায়ক',
  },
  {
    id: 3,
    period: '১৯৮৬–১৯৮৭',
    organization: 'জাতীয়তাবাদী ছাত্রদল, কক্সবাজার জেলা শাখা',
    role: 'আহ্বায়ক',
  },
  {
    id: 4,
    period: '১৯৮৭–১৯৯১',
    organization: 'জাতীয়তাবাদী যুবদল, কক্সবাজার জেলা শাখা',
    role: 'যুগ্ম আহ্বায়ক',
  },
  {
    id: 5,
    period: '১৯৯১–১৯৯৬',
    organization: 'জাতীয়তাবাদী যুবদল, কক্সবাজার জেলা শাখা',
    role: 'সাধারণ সম্পাদক',
  },
  {
    id: 6,
    period: '২০০৭–২০১০',
    organization: 'জাতীয়তাবাদী যুবদল, কক্সবাজার জেলা শাখা',
    role: 'সভাপতি',
  },
  {
    id: 7,
    period: '২০০৮–বর্তমান',
    organization: 'বাংলাদেশ জাতীয়তাবাদী দল (বিএনপি), কক্সবাজার জেলা শাখা',
    role: 'সাংগঠনিক সম্পাদক',
  },
  {
    id: 8,
    period: '১৯৯৭–২০০৩',
    organization: 'জাতীয়তাবাদী যুবদল, কেন্দ্রীয় কমিটি',
    role: 'সদস্য',
  },
  {
    id: 9,
    period: '২০০৪',
    organization: 'জাতীয়তাবাদী যুবদল, কেন্দ্রীয় কমিটি',
    role: 'যুগ্ম সাধারণ সম্পাদক',
  },
  {
    id: 10,
    period: '২০০৮',
    organization: 'বাংলাদেশ জাতীয়তাবাদী দল (বিএনপি), কেন্দ্রীয় নির্বাহী কমিটি',
    role: 'নির্বাহী সদস্য',
  },
  {
    id: 11,
    period: 'বর্তমান',
    organization: 'বিএনপি জাতীয় নির্বাহী কমিটি',
    role: 'মৎস্যজীবী বিষয়ক সম্পাদক',
  }
];

export const BUSINESS_LEADERSHIP_DATA: BusinessRole[] = [
  {
    id: 1,
    organization: 'বাংলাদেশ শ্রিম্প হ্যাচারি অ্যাসোসিয়েশন অব বাংলাদেশ (বিএসএইচএবি)',
    period: '১৯৯৩–২০০৭',
    role: 'সভাপতি'
  },
  {
    id: 2,
    organization: 'বাংলাদেশ শ্রিম্প হ্যাচারি অ্যাসোসিয়েশন অব বাংলাদেশ (বিএসএইচএবি)',
    period: '২০২৪–বর্তমান',
    role: 'সভাপতি'
  },
  {
    id: 3,
    organization: 'লবণ মিল মালিক সমিতি, কক্সবাজার জেলা',
    period: '১৯৯৮–২০০০',
    role: 'সভাপতি'
  },
  {
    id: 4,
    organization: 'হোটেল-মোটেল জোন মালিক সমিতি, কক্সবাজার জেলা',
    period: '২০০৫–২০০৭',
    role: 'সভাপতি'
  },
  {
    id: 5,
    organization: 'বিসিক শিল্পনগরী মিল মালিক সমিতি',
    period: '২০০৭–বর্তমান',
    role: 'সভাপতি'
  }
];

export const COMMITMENTS_DATA: CommitmentItem[] = [
  {
    id: 1,
    title: 'মাদক ও ইয়াবামুক্ত সুস্থ সমাজ',
    description: 'মাদক ও ইয়াবার ভয়াবহ ক্ষতি থেকে কক্সবাজার এর যুবসমাজকে রক্ষা করে একটি সুস্থ, নিরাপদ ও নৈতিক সমাজ প্রতিষ্ঠা করা।',
    iconName: 'ShieldAlert',
    points: [
      'সচেতনতা বৃদ্ধি করে সবার মাঝে ইতিবাচক মানসিকতা গড়ে তোলা।',
      'আইন শৃঙ্খলা জোরদার করা।',
      'ওয়ার্ড বা ইউনিয়ন ভিত্তিক মাদকবিরোধি নাগরিক কমিটি গঠন করা।',
      'খেলাধুলা, সংস্কৃতি ও সৃজনশীল কর্মকাণ্ডের বিস্তার ঘটানো।',
      'সামাজিক সংগঠন ও স্বেচ্ছাসেবীদের সম্পৃক্ত করা।',
      'মাদকাসক্তদের জন্য মানবিক চিকিৎসা ও পুনর্বাসন সহায়তা প্রদান।'
    ]
  },
  {
    id: 2,
    title: 'লবণ শিল্পের উন্নয়ন',
    description: 'আধুনিক প্রযুক্তি, ন্যায্যমূল্য নিশ্চিতকরণ এবং চাষিদের আর্থ–সামাজিক সহায়তার মাধ্যমে লবণ শিল্পকে টেকসই ও লাভজনক খাতে রূপান্তর।',
    iconName: 'Waves',
    points: [
      'আধুনিক প্রযুক্তি ব্যবহার, প্রশিক্ষণ ও অবকাঠামো উন্নয়নের মাধ্যমে উৎপাদন বৃদ্ধি।',
      'লবণ চাষিদের সহজ শর্তে ঋণ, আর্থিক প্রণোদনা ও প্রাকৃতিক দুর্যোগে ক্ষতিপূরণ প্রদান।',
      'বিদেশি লবণ আমদানি নিয়ন্ত্রণ করে দেশীয় লবণ শিল্প সুরক্ষা।',
      'লবণ শ্রমিকদের স্বাস্থ্যসেবা ও নিরাপদ কর্মপরিবেশ নিশ্চিতকরণ।',
      'গবেষণা ও মানোন্নয়নের জন্য বিশেষ লবণ গবেষণা কেন্দ্র প্রতিষ্ঠা।',
      'প্রাকৃতিক দুর্যোগ পরবর্তী ক্ষতিগ্রস্ত চাষিদের সরকারীভাবে অনুদানের ব্যবস্থা।'
    ]
  },
  {
    id: 3,
    title: 'সবুজ ও সুন্দর নগরী',
    description: 'বন সংরক্ষণ, সবুজায়ন বৃদ্ধি, দূষণ নিয়ন্ত্রণ এবং স্মার্ট নগর পরিকল্পনার মাধ্যমে কক্সবাজারকে একটি আধুনিক, স্বাস্থ্যকর ও সবুজ নগরী হিসেবে গড়ে তোলা।',
    iconName: 'Leaf',
    points: [
      'বনভূমি ধ্বংস প্রতিরোধে কঠোর আইন প্রয়োগ ও এর বাস্তবায়ন।',
      'উপকূলীয় এলাকায় বৃক্ষরোপণ ও ক্ষতিগ্রস্ত বন পুনরুদ্ধার।',
      'জীববৈচিত্র্য ও বিপন্ন প্রজাতি সংরক্ষণ উদ্যোগ।',
      'নদী–খাল পরিষ্কার রাখা ও বর্জ্য ব্যবস্থাপনা উন্নয়ন।',
      'নবায়নযোগ্য জ্বালানির ব্যবহার বৃদ্ধি (সৌর, বায়ু, বায়োগ্যাস)।',
      'পার্ক, উদ্যান ও খোলা সবুজ স্থানের সংখ্যা বৃদ্ধি।'
    ]
  },
  {
    id: 4,
    title: 'দক্ষ জনবল ও কর্মসংস্থান',
    description: 'পরিকল্পিত প্রশিক্ষণ, প্রযুক্তিগত জ্ঞান ও উদ্যোক্তা মানসিকতা গড়ে তোলার মাধ্যমে স্থানীয় অর্থনীতি শক্তিশালী করা।',
    iconName: 'Users',
    points: [
      'কারিগরি, পর্যটন, মৎস্য ও কৃষি খাতে প্রশিক্ষণের মাধ্যমে কর্মসংস্থান সৃষ্টি।',
      'ভাষা শিক্ষা ও ফ্রিল্যান্সিং খাতে আন্তর্জাতিক মানের প্রশিক্ষণ।',
      'তরুণদের উদ্যোক্তা তৈরি ও ক্ষুদ্র-মাঝারি ব্যবসা গড়ে তুলতে সহায়তা।',
      'নারী, প্রতিবন্ধী ও প্রান্তিক জনগোষ্ঠীর জন্য বিশেষ কর্মসূচি।',
      'নিরাপদ কর্ম পরিবেশ ও ন্যায্য মজুরি নিশ্চিত করা।'
    ]
  },
  {
    id: 5,
    title: 'মৎস্য খাতে উন্নয়ন',
    description: 'পরিকল্পিত উন্নয়ন, আধুনিক প্রযুক্তি ও দক্ষ মানবসম্পদের সঠিক প্রয়োগে একটি শক্তিশালী ও আধুনিক মৎস্যখাত গড়ে তোলা।',
    iconName: 'Fish',
    points: [
      'সামুদ্রিক সম্পদের সঠিক ব্যবহার ও সংরক্ষণ।',
      'আধুনিক মৎস্য প্রক্রিয়াজাতকরণ কেন্দ্র স্থাপন।',
      'জেলেদের জীবনমান উন্নয়ন ও সুরক্ষা।'
    ]
  },
  {
    id: 6,
    title: 'নিরাপদ কক্সবাজার',
    description: 'অপরাধ দমন, সামাজিক নিরাপত্তা নিশ্চিত করা এবং পর্যটনবান্ধব পরিবেশ তৈরির মাধ্যমে নিরাপদ জীবনযাপন নিশ্চিত করা।',
    iconName: 'Lock',
    points: [
      'মাদক ও মানবপাচার প্রতিরোধ।',
      'সড়ক দুর্ঘটনা হ্রাসে কার্যকর পদক্ষেপ।',
      'নারী ও শিশু নির্যাতন প্রতিরোধে কঠোর ব্যবস্থা।',
      'আইন-শৃঙ্খলা রক্ষাকারী বাহিনীর দক্ষতা বৃদ্ধি।'
    ]
  },
  {
    id: 7,
    title: 'আন্তর্জাতিক বিমানবন্দর ও পর্যটন',
    description: 'কক্সবাজার বিমানবন্দরকে আন্তর্জাতিক মানে উন্নীত করে বিশ্বমানের পর্যটন নগরী হিসেবে প্রতিষ্ঠা করা।',
    iconName: 'Plane',
    points: [
      'বিদেশি পর্যটকদের জন্য সরাসরি যাতায়াত ব্যবস্থা।',
      'স্থানীয় মানুষের কর্মসংস্থান বৃদ্ধি।',
      'ব্যবসা-বাণিজ্য সম্প্রসারণ ও অর্থনীতি শক্তিশালীকরণ।'
    ]
  },
  {
    id: 8,
    title: 'ক্ষুদ্র ও মাঝারি কুটির শিল্প',
    description: 'বেকারত্ব দূরীকরণ এবং গ্রামীণ অর্থনীতি শক্তিশালী করতে কুটির শিল্পের প্রসারণ।',
    iconName: 'Store',
    points: [
      'নতুন কর্মসংস্থান সৃষ্টি ও নারীদের আর্থিক ক্ষমতায়ন।',
      'স্থানীয় পণ্যকে জাতীয় ও আন্তর্জাতিক বাজারে তুলে ধরা।',
      'কক্সবাজারকে কুটির শিল্পের শক্তিশালী জেলায় রূপান্তর।'
    ]
  },
  {
    id: 9,
    title: 'নবায়নযোগ্য জ্বালানি',
    description: 'সৌর, বায়ু ও জলবিদ্যুৎ উৎপাদনের মাধ্যমে বিদ্যুৎ ঘাটতি পূরণ ও পরিবেশবান্ধব উন্নয়ন।',
    iconName: 'Zap',
    points: [
      'উপকূলীয় জেলা হিসেবে সমুদ্র বাতাসের সঠিক ব্যবহার।',
      'সৌর শক্তি ও বায়ু বিদ্যুৎ প্রকল্পের বাস্তবায়ন।',
      'শিল্প ও পর্যটন খাতে নিরবচ্ছিন্ন বিদ্যুৎ সরবরাহ।'
    ]
  },
  {
    id: 10,
    title: 'পানি ও বন্যা ব্যবস্থাপনা',
    description: 'ভূগর্ভস্থ পানির টেকসই ব্যবস্থাপনা এবং বন্যা মোকাবিলায় স্থায়ী সমাধান।',
    iconName: 'Droplets',
    points: [
      'পাহাড়ি ও সামুদ্রিক অঞ্চলে পানির সমস্যা নিরসন।',
      'বন্যা মোকাবিলায় আগাম সতর্কতা ও অবকাঠামোগত উন্নয়ন।',
      'ক্ষতিগ্রস্ত জনগণের পুনর্বাসন ও সরকারি জমি বরাদ্দ নিশ্চিতকরণ।'
    ]
  }
];

export const MOVEMENTS_DATA: MovementItem[] = [
  {
    id: 1,
    title: '১৯৯০ সালের স্বৈরাচারবিরোধী আন্দোলন',
    period: '১৯৯০',
    role: 'নেতৃত্বদানকারী ছাত্রনেতা',
    description: 'কক্সবাজার সরকারি কলেজ ছাত্র সংসদের জিএস থাকাকালীন সর্বদলীয় ছাত্র সংগ্রাম পরিষদ গঠনে অগ্রণী ভূমিকা পালন করেন।'
  },
  {
    id: 2,
    title: 'ফ্যাসিবাদবিরোধী আন্দোলন',
    period: '২০০৯–২০২৪',
    role: 'সক্রিয় রাজপথের নেতা',
    description: 'সংসদে ও সংসদের বাইরে একদলীয় শাসনের বিরুদ্ধে সোচ্চার ভূমিকা পালন এবং নেতাকর্মীদের আইনি ও আর্থিক সহায়তা প্রদান।'
  },
  {
    id: 3,
    title: '২০২৪ এর ছাত্র গণঅভ্যুত্থান',
    period: '২০২৪',
    role: 'সংহতি ও সমর্থন',
    description: 'ছাত্রদের যৌক্তিক আন্দোলনে পূর্ণ সমর্থন এবং রাজপথে সক্রিয় অংশগ্রহণ।'
  }
];

export const DEVELOPMENT_WORKS_DATA = [
  {
    id: 1,
    title: 'অবকাঠামো উন্নয়ন',
    description: 'রাস্তা, ব্রিজ, কালভার্ট, শিক্ষাপ্রতিষ্ঠানসহ অন্যান্য গুরুত্বপূর্ণ অবকাঠামো উন্নয়নে বিশেষ ভূমিকা রাখা।',
    iconName: 'Construction'
  },
  {
    id: 2,
    title: 'শিক্ষা উন্নয়ন',
    description: 'শিক্ষা প্রতিষ্ঠান উন্নয়ন ও গ্রামীণ দরিদ্র জনগোষ্ঠীর শিক্ষা নিশ্চিতকরণে সরকারি অনুদান এর প্রতি বিশেষ মনোযাগ প্রদান।',
    iconName: 'GraduationCap'
  },
  {
    id: 3,
    title: 'স্বাস্থ্য সেবা',
    description: 'হাসপাতাল, ক্লিনিক ও স্বাস্থ্য সেবা উন্নয়নে নিরলস কাজ করে যাওয়া।',
    iconName: 'Stethoscope'
  },
  {
    id: 4,
    title: 'কৃষি উন্নয়ন',
    description: 'কৃষি প্রকল্প ও কৃষক সহায়তায় বিভিন্ন উদ্যোগ গ্রহণ ও বাস্তবায়ন।',
    iconName: 'Sprout'
  },
  {
    id: 5,
    title: 'পানি সরবরাহ',
    description: 'বিশুদ্ধ পানি সরবরাহ প্রকল্প ও টিউবওয়েল স্থাপনের মাধ্যমে সুপেয় পানির নিশ্চয়তা।',
    iconName: 'Droplets'
  },
  {
    id: 6,
    title: 'বিদ্যুৎ উন্নয়ন',
    description: 'বিদ্যুৎ সংযোগ ও সোলার প্যানেল স্থাপনের মাধ্যমে অন্ধকার দূরীকরণ।',
    iconName: 'Zap'
  },
  {
    id: 7,
    title: 'সামাজিক কল্যাণ',
    description: 'দরিদ্র সহায়তা ও সামাজিক কল্যাণমূলক কর্মকাণ্ডে অংশগ্রহণ।',
    iconName: 'HeartHandshake'
  },
  {
    id: 8,
    title: 'যুব উন্নয়ন',
    description: 'যুব প্রশিক্ষণ ও কর্মসংস্থান সৃষ্টির লক্ষ্যে বিভিন্ন কর্মসূচি গ্রহণ।',
    iconName: 'UserPlus'
  }
];
