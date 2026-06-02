import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: {
    nav: {
      blogs: 'Blogs',
      conferences: 'Conferences',
      initiatives: 'Initiatives',
      resources: 'Resources',
      about: 'About',
      join: 'Join Us',
    },
    hero: {
      title: 'ନମସ୍କାର 🙏🏼',
      subtitle: 'Uniting Odias in AI — across the globe',
      desc: 'A not-for-profit global initiative creating a space for idea sharing, fostering collaborations, and increasing the presence of Odia people in the field of Artificial Intelligence.',
      join: 'Join the Community',
      mission: 'Our Mission',
    },
    stats: {
      years: 'Years of Impact',
      members: 'Global Members',
      chapters: 'Chapter Countries',
      conf: 'Annual Conferences',
    },
    home: {
      eventsLabel: 'Annual Events',
      eventsTitle: 'Conferences',
      initiativesLabel: 'What We Do',
      initiativesTitle: 'Key Initiatives',
      missionLabel: 'Our Mission',
      missionTitle: 'Bridging Odias to the World of AI',
      missionDesc: "As Utkala Gouraba Madhusudan Das's Utkala Sammilani was created in 1903 to campaign for the unification of all Odia people into the state of Odisha — we intend to unite all Odias in the domain of AI, across the world, under a single Odias in AI banner.",
      missionStory: 'Read Our Story',
      missionExplore: 'Explore Resources',
      blogLabel: 'Community Voices',
      blogTitle: 'From the Blog',
      blogAction: 'Read Article',
      joinLabel: 'Global Community',
      joinTitle: 'Ready to Join Us?',
      joinDesc: 'Connect with hundreds of Odia AI professionals, researchers, and enthusiasts across 16+ countries.',
      joinAction: 'Join WhatsApp Group',
      joinTeam: 'Meet the Team',
    },
    about: {
      label: 'Who We Are',
      heroTitle: 'About Odisha AI',
      desc: 'The Odisha AI community is a global initiative creating a space for idea sharing, fostering collaborations, and increasing the presence of Odia people in the field of Artificial Intelligence.',
      vision: 'Vision',
      visionDesc: 'Odias in AI is a global initiative creating a space for idea sharing, fostering collaborations, and discussing initiatives to increase the presence of Odia people in the field of AI. To this end, we run mentoring programs and maintain various fora for fostering partnerships and collaborations with industry and investors.',
      mission: 'Mission',
      missionDesc: 'Odias in AI will help leverage the power of artificial intelligence and machine learning for the overall development of Odisha and Odia language through a platform for collaboration among Odia technologists, academicians, executives, policymakers, and the broader community.',
      journeyLabel: 'Our Journey',
      journeyTitle: 'Since 2020',
      helpLabel: 'How We Help',
      helpTitle: 'Our Activities',
      activities: [
        'Celebrating the achievements of Odias in AI/ML',
        'Enhancing skills through structured learning programs',
        'Creating entrepreneurial and career opportunities',
        'Catalyzing AI/ML adoption by engaging with policymakers',
        'Building a knowledge repository in AI/ML',
        'Connecting with global technology leaders'
      ],
      detailedAct: 'For our detailed activities, please visit the initiatives page.',
      milestonesLabel: 'Milestones',
      milestonesTitle: 'Key Challenges Addressed',
      milestone1: 'Shua — the spiritual predecessor — helped bring Machine Translation to Odia Language.',
      milestone2: 'United Odias across the world in AI/ML across professional, academic, investor, entrepreneur, and policymaker levels.',
      teamLabel: 'Core Team',
      teamTitle: 'Task Force Members',
      advisorsLabel: 'Guidance',
      advisorsTitle: 'Advisors',
      chaptersLabel: 'Global Presence',
      chaptersTitle: 'Chapter Leaders',
      alpha: '// In Alphabetical Order',
    },
    conferences: {
      label: 'Global Gathering',
      title: 'Odisha AI Conferences',
      desc: 'Our annual flagship events bringing together the best minds in AI.',
      upcoming: 'Upcoming Events',
      past: 'Previous Conferences',
    },
    initiatives: {
      label: 'Projects',
      title: 'Our Initiatives',
      desc: 'Diverse programs focused on research, education, and community growth.',
    },
    resources: {
      label: 'Knowledge',
      title: 'Community Resources',
      desc: 'Essential links, documents, and tools for the Odia AI ecosystem.',
    },
    join: {
      label: 'Connect',
      title: 'Join Our Ecosystem',
      desc: 'Choose your platform and start contributing to the community.',
    },
    footer: {
      brandDesc: 'The Artificial Intelligence global community of Odias — uniting technologists, academics, investors, and policymakers worldwide.',
      pages: 'Pages',
      community: 'Community',
      resources: 'Resources',
      madeBy: 'Made by',
      viewSource: 'View source',
    },
    common: {
      learnMore: 'Learn More',
      backConferences: 'Back to Conferences',
      backInitiatives: 'Back to Initiatives',
      theme: 'Theme',
      about: 'About',
      committee: 'Organizing Committee',
      speakers: 'Invited Speakers',
      started: 'Started',
      category: 'Category',
      links: 'Links',
      notFound: 'Not Found',
      viewAll: 'View All',
      back: 'Back',
    }
  },
  or: {
    nav: {
      blogs: 'ବ୍ଲଗ୍',
      conferences: 'ସମ୍ମିଳନୀ',
      initiatives: 'ପଦକ୍ଷେପ',
      resources: 'ସମ୍ବଳ',
      about: 'ଆମ ବିଷୟରେ',
      join: 'ସାମିଲ ହୁଅନ୍ତୁ',
    },
    hero: {
      title: 'ନମସ୍କାର 🙏🏼',
      subtitle: 'ସାରା ବିଶ୍ୱରେ AI କ୍ଷେତ୍ରରେ ଓଡ଼ିଆଙ୍କୁ ଏକତ୍ରିତ କରିବା',
      desc: 'ଏହା ଏକ ଅଣ-ଲାଭକାରୀ ବିଶ୍ୱସ୍ତରୀୟ ପଦକ୍ଷେପ ଯାହା ବିଚାର ବିନିମୟ, ସହଯୋଗ ବୃଦ୍ଧି ଏବଂ କୃତ୍ରିମ ବୁଦ୍ଧିମତା (AI) କ୍ଷେତ୍ରରେ ଓଡ଼ିଆଙ୍କ ଉପସ୍ଥିତି ବୃଦ୍ଧି ପାଇଁ ଏକ ସ୍ଥାନ ସୃଷ୍ଟି କରେ।',
      join: 'ସମୁଦାୟରେ ଯୋଗ ଦିଅନ୍ତୁ',
      mission: 'ଆମର ଲକ୍ଷ୍ୟ',
    },
    stats: {
      years: 'ବର୍ଷର ପ୍ରଭାବ',
      members: 'ବିଶ୍ୱସ୍ତରୀୟ ସଦସ୍ୟ',
      chapters: 'ଶାଖା ଦେଶ',
      conf: 'ବାର୍ଷିକ ସମ୍ମିଳନୀ',
    },
    home: {
      eventsLabel: 'ବାର୍ଷିକ କାର୍ଯ୍ୟକ୍ରମ',
      eventsTitle: 'ସମ୍ମିଳନୀ',
      initiativesLabel: 'ଆମେ କଣ କରୁ',
      initiativesTitle: 'ପ୍ରମୁଖ ପଦକ୍ଷେପ',
      missionLabel: 'ଆମର ଲକ୍ଷ୍ୟ',
      missionTitle: 'ଓଡ଼ିଆଙ୍କୁ AI ଦୁନିଆ ସହ ଯୋଡିବା',
      missionDesc: "୧୯୦୩ ମସିହାରେ ସମସ୍ତ ଓଡ଼ିଆ ଭାଷାଭାଷୀ ଅଞ୍ଚଳକୁ ଏକତ୍ରିତ କରି ଓଡ଼ିଶା ଗଠନ ପାଇଁ ଉତ୍କଳ ଗୌରବ ମଧୁସୂଦନ ଦାସଙ୍କ ଦ୍ୱାରା 'ଉତ୍କଳ ସମ୍ମିଳନୀ' ଗଠନ କରାଯାଇଥିଲା - ସେହିପରି ଆମେ ସାରା ବିଶ୍ୱରେ AI କ୍ଷେତ୍ରରେ କାର୍ଯ୍ୟରତ ସମସ୍ତ ଓଡ଼ିଆଙ୍କୁ ଏକତ୍ରିତ କରିବାକୁ ଚାହୁଁ।",
      missionStory: 'ଆମ କାହାଣୀ ପଢନ୍ତୁ',
      missionExplore: 'ସମ୍ବଳ ଅନୁସନ୍ଧାନ କରନ୍ତୁ',
      blogLabel: 'ସମୁଦାୟର ସ୍ୱର',
      blogTitle: 'ବ୍ଲଗ୍ ରୁ',
      blogAction: 'ଆର୍ଟିକିଲ୍ ପଢନ୍ତୁ',
      joinLabel: 'ବିଶ୍ୱସ୍ତରୀୟ ସମୁଦାୟ',
      joinTitle: 'ଆପଣ ସାମିଲ ହେବାକୁ ପ୍ରସ୍ତୁତ କି?',
      joinDesc: '୧୬ରୁ ଅଧିକ ଦେଶରେ ଥିବା ଶତାଧିକ ଓଡ଼ିଆ AI ବୃତ୍ତିଧାରୀ ଏବଂ ଗବେଷକଙ୍କ ସହ ଯୋଡି ହୁଅନ୍ତୁ।',
      joinAction: 'WhatsApp ଗ୍ରୁପରେ ଯୋଗ ଦିଅନ୍ତୁ',
      joinTeam: 'ଆମ ଟିମ୍ କୁ ଭେଟନ୍ତୁ',
    },
    about: {
      label: 'ଆମେ କିଏ',
      heroTitle: 'ଓଡ଼ିଶା AI ବିଷୟରେ',
      desc: 'ଓଡ଼ିଶା AI ସମୁଦାୟ ହେଉଛି ଏକ ବିଶ୍ୱସ୍ତରୀୟ ପଦକ୍ଷେପ ଯାହା ବିଚାର ବିନିମୟ, ସହଯୋଗ ବୃଦ୍ଧି ଏବଂ କୃତ୍ରିମ ବୁଦ୍ଧିମତା (AI) କ୍ଷେତ୍ରରେ ଓଡ଼ିଆଙ୍କ ଉପସ୍ଥିତି ବୃଦ୍ଧି ପାଇଁ ଏକ ସ୍ଥାନ ସୃଷ୍ଟି କରେ।',
      vision: 'ଦୂରଦୃଷ୍ଟି (Vision)',
      visionDesc: "AI କ୍ଷେତ୍ରରେ ଓଡ଼ିଆଙ୍କ ଉପସ୍ଥିତି ବୃଦ୍ଧି କରିବା ପାଇଁ ଏକ ବିଶ୍ୱସ୍ତରୀୟ ପଦକ୍ଷେପ। ଆମେ ଶିଳ୍ପ ଏବଂ ନିବେଶକଙ୍କ ସହ ସହଭାଗିତା ବୃଦ୍ଧି ପାଇଁ ବିଭିନ୍ନ କାର୍ଯ୍ୟକ୍ରମ ଏବଂ ପରାମର୍ଶ ଶିବିର ପରିଚାଳନା କରୁ।",
      mission: 'ଲକ୍ଷ୍ୟ (Mission)',
      missionDesc: 'ଓଡ଼ିଆ ବୃତ୍ତିଧାରୀ, ଶିକ୍ଷାବିତ୍, ନୀତି ନିର୍ଦ୍ଧାରକ ଏବଂ ସମୁଦାୟ ମଧ୍ୟରେ ସହଯୋଗ ମାଧ୍ୟମରେ ଓଡ଼ିଶା ଏବଂ ଓଡ଼ିଆ ଭାଷାର ସାମଗ୍ରିକ ବିକାଶ ପାଇଁ AI ଏବଂ ML ର ଶକ୍ତିକୁ ବ୍ୟବହାର କରିବା।',
      journeyLabel: 'ଆମର ଯାତ୍ରା',
      journeyTitle: '୨୦୨୦ ରୁ',
      helpLabel: 'ଆମେ କିପରି ସାହାଯ୍ୟ କରୁ',
      helpTitle: 'ଆମର କାର୍ଯ୍ୟକଳାପ',
      activities: [
        'AI/ML କ୍ଷେତ୍ରରେ ଓଡ଼ିଆଙ୍କ ସଫଳତାକୁ ସେଲିବ୍ରେଟ୍ କରିବା',
        'ସଂଗଠିତ ଶିକ୍ଷା କାର୍ଯ୍ୟକ୍ରମ ମାଧ୍ୟମରେ ଦକ୍ଷତା ବୃଦ୍ଧି',
        'ଉଦ୍ୟୋଗୀ ଏବଂ କ୍ୟାରିୟର ସୁଯୋଗ ସୃଷ୍ଟି କରିବା',
        'ନୀତି ନିର୍ଦ୍ଧାରକଙ୍କ ସହ ଜଡିତ ହୋଇ AI/ML ଗ୍ରହଣକୁ ତ୍ୱରାନ୍ୱିତ କରିବା',
        'AI/ML କ୍ଷେତ୍ରରେ ଏକ ଜ୍ଞାନ ଭଣ୍ଡାର ଗଠନ କରିବା',
        'ବିଶ୍ୱସ୍ତରୀୟ ପ୍ରଯୁକ୍ତିବିଦ୍ୟା ନେତାଙ୍କ ସହ ଯୋଗାଯୋଗ କରିବା'
      ],
      detailedAct: 'ଆମର ବିସ୍ତୃତ କାର୍ଯ୍ୟକଳାପ ପାଇଁ, ଦୟାକରି ପଦକ୍ଷେପ (initiatives) ପୃଷ୍ଠା ପରିଦର୍ଶନ କରନ୍ତୁ।',
      milestonesLabel: 'ସଫଳତା',
      milestonesTitle: 'ସମାଧାନ କରାଯାଇଥିବା ପ୍ରମୁଖ ଆହ୍ୱାନ',
      milestone1: "'ଶୁଆ' (Shua) - ଓଡ଼ିଆ ଭାଷାରେ ମେସିନ୍ ଅନୁବାଦ ଆଣିବାରେ ସାହାଯ୍ୟ କରିଥିଲା।",
      milestone2: 'ବୃତ୍ତିଧାରୀ, ଶିକ୍ଷାବିତ୍, ନିବେଶକ, ଉଦ୍ୟୋଗୀ ଏବଂ ନୀତି ନିର୍ଦ୍ଧାରକ ସ୍ତରରେ ବିଶ୍ୱର ସମସ୍ତ ଓଡ଼ିଆଙ୍କୁ ଏକତ୍ରିତ କରିବା।',
      teamLabel: 'ମୁଖ୍ୟ ଦଳ',
      teamTitle: 'ଟାସ୍କ ଫୋର୍ସ ସଦସ୍ୟ',
      advisorsLabel: 'ମାର୍ଗଦର୍ଶନ',
      advisorsTitle: 'ଉପଦେଷ୍ଟା',
      chaptersLabel: 'ବିଶ୍ୱସ୍ତରୀୟ ଉପସ୍ଥିତି',
      chaptersTitle: 'ଶାଖା ନେତୃତ୍ୱ',
      alpha: '// ବର୍ଣ୍ଣମାଳା ଅନୁକ୍ରମରେ',
    },
    conferences: {
      label: 'ବିଶ୍ୱସ୍ତରୀୟ ମିଳନ',
      title: 'ଓଡ଼ିଶା AI ସମ୍ମିଳନୀ',
      desc: 'ଆମର ବାର୍ଷିକ ପ୍ରମୁଖ କାର୍ଯ୍ୟକ୍ରମ ଯାହା AI କ୍ଷେତ୍ରର ସର୍ବଶ୍ରେଷ୍ଠ ବ୍ୟକ୍ତିତ୍ୱଙ୍କୁ ଏକାଠି କରେ।',
      upcoming: 'ଆଗାମୀ କାର୍ଯ୍ୟକ୍ରମ',
      past: 'ପୂର୍ବ ସମ୍ମିଳନୀ',
    },
    initiatives: {
      label: 'ପ୍ରକଳ୍ପ',
      title: 'ଆମର ପଦକ୍ଷେପ',
      desc: 'ଗବେଷଣା, ଶିକ୍ଷା ଏବଂ ସମୁଦାୟର ଅଭିବୃଦ୍ଧି ଉପରେ କେନ୍ଦ୍ରିତ ବିଭିନ୍ନ କାର୍ଯ୍ୟକ୍ରମ।',
    },
    resources: {
      label: 'ଜ୍ଞାନ',
      title: 'ସମୁଦାୟ ସମ୍ବଳ',
      desc: 'ଓଡ଼ିଶା AI ବ୍ୟବସ୍ଥା ପାଇଁ ଆବଶ୍ୟକୀୟ ଲିଙ୍କ୍, ଦସ୍ତାବିଜ ଏବଂ ଉପକରଣ।',
    },
    join: {
      label: 'ଯୋଗାଯୋଗ',
      title: 'ଆମ ସମୁଦାୟରେ ଯୋଗ ଦିଅନ୍ତୁ',
      desc: 'ଆପଣଙ୍କ ପସନ୍ଦର ପ୍ଲାଟଫର୍ମ ବାଛନ୍ତୁ ଏବଂ ସମୁଦାୟରେ ଅବଦାନ ଦେବା ଆରମ୍ଭ କରନ୍ତୁ।',
    },
    footer: {
      brandDesc: 'ସାରା ବିଶ୍ୱରେ AI କ୍ଷେତ୍ରରେ ଓଡ଼ିଆଙ୍କୁ ଏକତ୍ରିତ କରୁଥିବା ଏକ ବିଶ୍ୱସ୍ତରୀୟ ସମୁଦାୟ।',
      pages: 'ପୃଷ୍ଠାଗୁଡ଼ିକ',
      community: 'ସମୁଦାୟ',
      resources: 'ସମ୍ବଳ',
      madeBy: 'ଦ୍ୱାରା ନିର୍ମିତ',
      viewSource: 'ସୋର୍ସ ଦେଖନ୍ତୁ',
    },
    common: {
      learnMore: 'ଅଧିକ ଜାଣନ୍ତୁ',
      backConferences: 'ସମ୍ମିଳନୀକୁ ଫେରିଯାଅ',
      backInitiatives: 'ପଦକ୍ଷେପକୁ ଫେରିଯାଅ',
      theme: 'ଥିମ୍',
      about: 'ବିଷୟରେ',
      committee: 'ଆୟୋଜନ କମିଟି',
      speakers: 'ନିମନ୍ତ୍ରିତ ବକ୍ତା',
      started: 'ଆରମ୍ଭ',
      category: 'ବର୍ଗ',
      links: 'ଲିଙ୍କ୍',
      notFound: 'ମିଳିଲା ନାହିଁ',
      viewAll: 'ସମସ୍ତ ଦେଖନ୍ତୁ',
      back: 'ପଛକୁ',
    }
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(localStorage.getItem('preferred_lang') || 'en');

  useEffect(() => {
    localStorage.setItem('preferred_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (keyPath) => {
    const keys = keyPath.split('.');
    let result = translations[lang];
    for (const key of keys) {
      if (result && result[key]) {
        result = result[key];
      } else {
        return key; // fallback to key name
      }
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
