// Configuration file - Edit this file to customize the application
// All customizable data is centralized here

const CONFIG = {
  // Brand Configuration
  brand: {
    name: "Portfolio Data Collector",
    logo: "https://via.placeholder.com/150", // Replace with your logo URL
    tagline: "Professional Portfolio Builder"
  },

  // WhatsApp Configuration
  whatsapp: {
    destinationNumber: "201271476215", // WhatsApp number to send data to (without +)
    message: "Here is my portfolio configuration file"
  },

  // Pre-defined Clinical Case Categories
  caseCategories: [
    { id: "operative", en: "Operative and Esthetics", ar: "الحشو العادى والتجميلى" },
    { id: "prosthesis_fixed", en: "Prosthesis (Fixed)", ar: "تركيبات ثابتة" },
    { id: "prosthesis_removable", en: "Prosthesis (Removable)", ar: "تركيبات متحركة" },
    { id: "endodontics", en: "Endodontics", ar: "حشو العصب (علاج الجذور)" },
    { id: "oral_surgery", en: "Oral Surgery", ar: "جراحة الفم" },
    { id: "periodontics", en: "Periodontics", ar: "أمراض اللثة" },
    { id: "orthodontics", en: "Orthodontics", ar: "تقويم الأسنان" },
    { id: "pediatric", en: "Pediatric Dentistry", ar: "طب أسنان الأطفال" },
    { id: "implant", en: "Dental Implants", ar: "زراعة الأسنان" },
    { id: "cosmetic", en: "Cosmetic Dentistry", ar: "تجميل الأسنان" }
  ],

  // Timeline Milestone Types
  milestoneTypes: [
    { id: "education", en: "Education", ar: "التعليم" },
    { id: "certification", en: "Certification", ar: "شهادة" },
    { id: "employment", en: "Employment", ar: "توظيف" },
    { id: "achievement", en: "Achievement", ar: "إنجاز" },
    { id: "training", en: "Training", ar: "تدريب" }
  ],

  // UI Text - English
  ui: {
    en: {
      // Navigation
      nav: {
        personalInfo: "Personal Information",
        contact: "Contact Details",
        photo: "Profile Photo",
        skills: "Professional Skills",
        timeline: "Career Timeline",
        cases: "Clinical Cases",
        preview: "Preview & Submit"
      },

      // Form Labels
      form: {
        // Personal Information
        fullName: "Full Name",
        fullNamePlaceholder: "Dr. John Doe",
        title: "Title / Role",
        titlePlaceholder: "Dentist, Dental Student, etc.",
        graduationYear: "Graduation Year",
        university: "University",
        universityPlaceholder: "Faculty of Dentistry, University Name",

        // Contact Details
        phone: "Phone",
        phonePlaceholder: "+20123456789",
        whatsapp: "WhatsApp",
        whatsappPlaceholder: "+20123456789",
        email: "Email",
        emailPlaceholder: "email@example.com",
        website: "Website URL",
        websitePlaceholder: "https://yourwebsite.com",

        // Profile Photo
        profilePhoto: "Profile Photo",
        profilePhotoHint: "Recommended: square photo, at least 400 x 400 px",
        uploadPhoto: "Upload Photo",
        changePhoto: "Change Photo",

        // Skills
        skills: "Professional Skills",
        clinicalSkills: "Clinical Skills",
        clinicalSkillsPlaceholder: "Endodontics, Surgery, etc.",
        digitalSkills: "Digital Skills",
        digitalSkillsPlaceholder: "Dental Photography, etc.",
        softSkills: "Soft Skills",
        softSkillsPlaceholder: "Communication, Teamwork, etc.",
        skillsHint: "Separate items with commas (,) or bullet (•)",

        // Timeline
        timeline: "Career Timeline",
        timelineHint: "Add milestones shown on the Education page",
        addMilestone: "Add Milestone",
        year: "Year",
        event: "Event / Milestone",
        eventPlaceholder: "e.g., Started dental school",
        removeMilestone: "Remove",

        // Clinical Cases
        cases: "Clinical Cases",
        casesHint: "Add your clinical cases with photos",
        addCase: "Add Case",
        category: "Category",
        selectCategory: "Select a category",
        orCustom: "Or enter custom category",
        customCategoryEn: "Custom Category (English)",
        customCategoryAr: "Custom Category (Arabic)",
        caseTitleEn: "Case Title (English)",
        caseTitleEnPlaceholder: "Description of the case",
        caseTitleAr: "Case Title (Arabic)",
        caseTitleArPlaceholder: "وصف الحالة",
        uploadCasePhoto: "Upload Case Photo",
        changeCasePhoto: "Change Photo",
        removeCase: "Remove Case"
      },

      // Buttons
      buttons: {
        preview: "Preview Config File",
        sendWhatsApp: "Send via WhatsApp",
        downloadFile: "Download TOML File",
        confirm: "Confirm & Send",
        cancel: "Cancel",
        next: "Next",
        previous: "Previous",
        reset: "Reset Form"
      },

      // Messages
      messages: {
        processing: "Processing images...",
        generating: "Generating config file...",
        ready: "Your config file is ready!",
        success: "Successfully sent!",
        error: "An error occurred",
        requiredField: "This field is required",
        invalidEmail: "Please enter a valid email",
        invalidPhone: "Please enter a valid phone number",
        noPhoto: "Please upload a profile photo"
      },

      // Preview Section
      preview: {
        title: "Preview Your Config File",
        subtitle: "Review your data before sending",
        note: "Your TOML configuration file will contain all the data below"
      }
    },

    // UI Text - Arabic
    ar: {
      // Navigation
      nav: {
        personalInfo: "المعلومات الشخصية",
        contact: "بيانات الاتصال",
        photo: "صورة الملف الشخصي",
        skills: "المهارات المهنية",
        timeline: "الخط الزمني المهني",
        cases: "الحالات السريرية",
        preview: "معاينة وإرسال"
      },

      // Form Labels
      form: {
        // Personal Information
        fullName: "الاسم الكامل",
        fullNamePlaceholder: "د. محمد أحمد",
        title: "المسمى الوظيفي",
        titlePlaceholder: "طبيب أسنان، طالب، إلخ.",
        graduationYear: "سنة التخرج",
        university: "الجامعة",
        universityPlaceholder: "كلية طب الأسنان، اسم الجامعة",

        // Contact Details
        phone: "الهاتف",
        phonePlaceholder: "+20123456789",
        whatsapp: "واتساب",
        whatsappPlaceholder: "+20123456789",
        email: "البريد الإلكتروني",
        emailPlaceholder: "email@example.com",
        website: "الموقع الإلكتروني",
        websitePlaceholder: "https://yoursite.com",

        // Profile Photo
        profilePhoto: "صورة الملف الشخصي",
        profilePhotoHint: "موصى به: صورة مربعة، على الأقل 400 × 400 بكسل",
        uploadPhoto: "تحميل صورة",
        changePhoto: "تغيير الصورة",

        // Skills
        skills: "المهارات المهنية",
        clinicalSkills: "المهارات السريرية",
        clinicalSkillsPlaceholder: "علاج العصب، الجراحة، إلخ.",
        digitalSkills: "المهارات الرقمية",
        digitalSkillsPlaceholder: "التصوير الفوتوغرافي، إلخ.",
        softSkills: "المهارات الشخصية",
        softSkillsPlaceholder: "التواصل، العمل الجماعي، إلخ.",
        skillsHint: "افصل العناصر بفواصل (,) أو نقطة (•)",

        // Timeline
        timeline: "الخط الزمني المهني",
        timelineHint: "أضف معالم تظهر في صفحة التعليم",
        addMilestone: "إضافة معلم",
        year: "السنة",
        event: "الحدث / المعلم",
        eventPlaceholder: "مثال: بدء كلية طب الأسنان",
        removeMilestone: "إزالة",

        // Clinical Cases
        cases: "الحالات السريرية",
        casesHint: "أضف حالاتك السريرية مع الصور",
        addCase: "إضافة حالة",
        category: "التصنيف",
        selectCategory: "اختر تصنيف",
        orCustom: "أو أدخل تصنيف مخصص",
        customCategoryEn: "التصنيف المخصص (بالإنجليزية)",
        customCategoryAr: "التصنيف المخصص (بالعربية)",
        caseTitleEn: "عنوان الحالة (بالإنجليزية)",
        caseTitleEnPlaceholder: "وصف الحالة",
        caseTitleAr: "عنوان الحالة (بالعربية)",
        caseTitleArPlaceholder: "وصف الحالة",
        uploadCasePhoto: "تحميل صورة الحالة",
        changeCasePhoto: "تغيير الصورة",
        removeCase: "إزالة الحالة"
      },

      // Buttons
      buttons: {
        preview: "معاينة ملف الإعدادات",
        sendWhatsApp: "إرسال عبر واتساب",
        downloadFile: "تحميل ملف TOML",
        confirm: "تأكيد وإرسال",
        cancel: "إلغاء",
        next: "التالي",
        previous: "السابق",
        reset: "إعادة تعيين النموذج"
      },

      // Messages
      messages: {
        processing: "جاري معالجة الصور...",
        generating: "جاري إنشاء ملف الإعدادات...",
        ready: "ملف الإعدادات جاهز!",
        success: "تم الإرسال بنجاح!",
        error: "حدث خطأ",
        requiredField: "هذا الحقل مطلوب",
        invalidEmail: "الرجاء إدخال بريد إلكتروني صالح",
        invalidPhone: "الرجاء إدخال رقم هاتف صالح",
        noPhoto: "الرجاء تحميل صورة الملف الشخصي"
      },

      // Preview Section
      preview: {
        title: "معاينة ملف الإعدادات",
        subtitle: "راجع بياناتك قبل الإرسال",
        note: "سيحتوي ملف TOML على جميع البيانات أدناه"
      }
    }
  },

  // TOML Template Configuration
  tomlTemplate: {
    baseUrl: "https://portfoliohubs.github.io/MICKY/",
    languageCode: "en-us",
    defaultContentLanguage: "en"
  }
};

export default CONFIG;
