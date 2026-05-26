/**
 * Generates a TOML configuration file from form data
 * Replaces all placeholders and embeds images as base64
 */

interface FormData {
  personalInfo: {
    fullName: string;
    fullNameAr: string;
    title: string;
    titleAr: string;
    graduationYear: string;
    university: string;
    universityAr: string;
  };
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    website: string;
  };
  profilePhoto: string | null; // base64 encoded
  skills: {
    clinical: string[];
    clinicalAr: string[];
    digital: string[];
    digitalAr: string[];
    soft: string[];
    softAr: string[];
  };
  timeline: Array<{
    year: string;
    event: string;
    eventAr: string;
  }>;
  cases: Array<{
    category: string;
    categoryAr: string;
    title: string;
    titleAr: string;
    photo: string | null; // base64 encoded
  }>;
}

function escapeTomlString(str: string): string {
  if (!str) return '""';
  return `"${str.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`;
}

function arrayToToml(arr: string[]): string {
  if (!arr || arr.length === 0) return '[]';
  return arr.map(item => escapeTomlString(item)).join(',\n      ');
}

function generateSkillsSection(skills: FormData['skills'], isArabic: boolean = false): string {
  const prefix = isArabic ? '[params.ar.skills]' : '[params.skills]';
  const clinical = isArabic ? skills.clinicalAr : skills.clinical;
  const digital = isArabic ? skills.digitalAr : skills.digital;
  const soft = isArabic ? skills.softAr : skills.soft;

  return `${prefix}
    clinical = [
      ${arrayToToml(clinical)}
    ]

    digital = [
      ${arrayToToml(digital)}
    ]

    soft = [
      ${arrayToToml(soft)}
    ]`;
}

function generateTimelineSection(timeline: FormData['timeline'], isArabic: boolean = false): string {
  if (!timeline || timeline.length === 0) return '';

  const prefix = isArabic ? 'params.ar.education' : 'params.education';
  let timelineStr = '';

  timeline.forEach(item => {
    const event = isArabic ? item.eventAr : item.event;
    timelineStr += `
    [[${prefix}.timeline]]
      year = ${escapeTomlString(item.year)}
      event = ${escapeTomlString(event)}
`;
  });

  return timelineStr;
}

function generateCasesSection(cases: FormData['cases']): string {
  if (!cases || cases.length === 0) return '';

  let casesStr = '';
  let currentCategory = '';

  // Group cases by category
  const groupedCases: { [key: string]: FormData['cases'] } = {};

  cases.forEach(c => {
    const catKey = c.category || 'Uncategorized';
    if (!groupedCases[catKey]) {
      groupedCases[catKey] = [];
    }
    groupedCases[catKey].push(c);
  });

  Object.entries(groupedCases).forEach(([category, categoryCases]) => {
    const firstCase = categoryCases[0];

    casesStr += `
  [[params.clinical_cases]]
    enabled = true
    category = ${escapeTomlString(category)}
    category_ar = ${escapeTomlString(firstCase.categoryAr || category)}
`;

    categoryCases.forEach(c => {
      const photoValue = c.photo && c.photo.trim() !== ''
        ? escapeTomlString(c.photo)
        : '""';

      casesStr += `
    [[params.clinical_cases.cases]]
      photo = ${photoValue}
      alt = ${escapeTomlString(c.title)}
      description = ${escapeTomlString(c.title)}
      alt_ar = ${escapeTomlString(c.titleAr)}
      description_ar = ${escapeTomlString(c.titleAr)}
`;
    });
  });

  return casesStr;
}

export function generateToml(data: FormData): string {
  const name = data.personalInfo.fullName || 'Your Name';
  const nameAr = data.personalInfo.fullNameAr || name;
  const title = data.personalInfo.title || 'Professional';
  const titleAr = data.personalInfo.titleAr || title;
  const university = data.personalInfo.university || 'Your University';
  const universityAr = data.personalInfo.universityAr || university;
  const gradYear = data.personalInfo.graduationYear || '2024';

  const profileImage = data.profilePhoto || '';

  const toml = `baseURL = "https://portfoliohubs.github.io/MICKY/"
languageCode = "en-us"
title = "${name}"
defaultContentLanguage = "en"

[params]
  # Hero Section
  [params.hero]
    name = ${escapeTomlString(name)}
    tagline = ${escapeTomlString(title)}
    graduation = ${escapeTomlString(`Graduated ${gradYear} - ${university}`)}
    profile_image = ${escapeTomlString(profileImage)}
    profile_image_alt = ${escapeTomlString(`Profile photo of ${name}`)}

    [params.hero.current_position]
      role = ${escapeTomlString(title)}
      clinic = ${escapeTomlString(`${title} at ${university}`)}

  [params.seo]
    description = ${escapeTomlString(`Professional portfolio of ${name}`)}
    doctor_name_en = ${escapeTomlString(name)}
    doctor_name_ar = ${escapeTomlString(nameAr)}
    site_name = ${escapeTomlString(name)}
    og_image = ${escapeTomlString(profileImage)}
    favicon_image = ""
    twitter_handle = ""
    keywords = [
      "portfolio",
      "professional",
      ${escapeTomlString(name)}
    ]
    keywords_ar = [
      "محفظة",
      "م محترف",
      ${escapeTomlString(nameAr)}
    ]

  [params.integrations]
    google_search_console_verification = ""
    google_analytics_measurement_id = ""

  [params.ui]
    [params.ui.nav]
      profile = "Profile"
      skills = "Skills"
      education = "Education"
      clinical_cases = "Clinical Cases"
      cases_short = "Cases"
      blog = "Blog"
      contact = "Contact"

    [params.ui.skills]
      title = "Professional Skills"
      clinical_title = "Clinical Skills"
      digital_title = "Digital Skills"
      soft_title = "Soft Skills"

    [params.ui.education]
      title = "Education & Timeline"
      graduated_label = "Graduated"
      career_timeline_title = "Career Timeline"
      courses_title = "Courses & Certifications"

    [params.ui.cases]
      title = "Clinical Cases"
      subtitle = "Clinical Cases Gallery"

    [params.ui.blog]
      title = "Latest Articles"
      subtitle = "Insights and Knowledge"
      empty_text = "No blog posts yet"

    [params.ui.contact]
      title = "Get In Touch"
      subtitle = "Let's connect and collaborate"
      follow_me_title = "Follow Me"

    [params.ui.labels]
      now_working_as = "Now working as"
      at = "at"
      phone = "Phone"
      whatsapp = "WhatsApp"
      email = "Email"
      location = "Location"
      get_directions = "Get Directions"
      masters_degree = "Master's Degree"
      phd_degree = "PhD Degree"
      rights_reserved = "All rights reserved"

  # Skills Section
  ${generateSkillsSection(data.skills)}

  # Education Section
  [params.education]
    university = ${escapeTomlString(university)}
    graduation_year = ${escapeTomlString(gradYear)}

    [params.education.master]
      obtained = false
      title = "Master in Oral Medicine"
      year = ""

    [params.education.phd]
      obtained = false
      title = "PhD in Dental Sciences"
      year = ""

    ${generateTimelineSection(data.timeline)}

  # Clinical Cases Section
  ${generateCasesSection(data.cases)}

  # Contact Section
  [params.contact]
    phone = ${escapeTomlString(data.contact.phone)}
    whatsapp = ${escapeTomlString(data.contact.whatsapp)}
    email = ${escapeTomlString(data.contact.email)}
    instagram = ""
    facebook = ""
    linkedin = ""

    [params.contact.location]
      enabled = false
      address = ""
      latitude = ""
      longitude = ""

# Arabic Translations
[params.ar]
  [params.ar.hero]
    name = ${escapeTomlString(nameAr)}
    tagline = ${escapeTomlString(titleAr)}
    graduation = ${escapeTomlString(`تخرج ${gradYear} - ${universityAr}`)}
    profile_image_alt = ${escapeTomlString(`صورة الملف الشخصي لـ ${nameAr}`)}

    [params.ar.hero.current_position]
      role = ${escapeTomlString(titleAr)}
      clinic = ${escapeTomlString(`${titleAr} في ${universityAr}`)}

  ${generateSkillsSection(data.skills, true)}

  [params.ar.education]
    university = ${escapeTomlString(universityAr)}

    [params.ar.education.master]
      title = "ماجستير في طب الفم"

    [params.ar.education.phd]
      title = "دكتوراه في علوم الأسنان"

    ${generateTimelineSection(data.timeline, true)}

  [params.ar.contact.location]
    address = ""

  [params.ar.ui]
    [params.ar.ui.nav]
      profile = "الملف الشخصي"
      skills = "المهارات"
      education = "التعليم"
      clinical_cases = "الحالات السريرية"
      cases_short = "الحالات"
      blog = "المدونة"
      contact = "التواصل"

    [params.ar.ui.skills]
      title = "المهارات المهنية"
      clinical_title = "المهارات السريرية"
      digital_title = "المهارات الرقمية"
      soft_title = "المهارات الشخصية"

    [params.ar.ui.education]
      title = "التعليم والخط الزمني"
      graduated_label = "تخرج"
      career_timeline_title = "الخط الزمني المهني"
      courses_title = "الدورات والشهادات"

    [params.ar.ui.cases]
      title = "الحالات السريرية"
      subtitle = "معرض الحالات السريرية"

    [params.ar.ui.blog]
      title = "أحدث المقالات"
      subtitle = "رؤى ومعرفة"
      empty_text = "لا توجد مقالات بعد"

    [params.ar.ui.contact]
      title = "تواصل معي"
      subtitle = "لنتواصل ونتعاون"
      follow_me_title = "تابعني"

    [params.ar.ui.labels]
      now_working_as = "أعمل حالياً ك"
      at = "في"
      phone = "الهاتف"
      whatsapp = "واتساب"
      email = "البريد"
      location = "الموقع"
      get_directions = "احصل على الاتجاهات"
      masters_degree = "درجة الماجستير"
      phd_degree = "درجة الدكتوراه"
      rights_reserved = "جميع الحقوق محفوظة"
`;

  return toml;
}

export function downloadToml(tomlContent: string, filename: string = 'config.toml'): void {
  const blob = new Blob([tomlContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
