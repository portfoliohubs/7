import { useState, useRef, useCallback } from 'react';
import { ArrowLeft, ArrowRight, Check, Download, Send, Plus, X, Image as ImageIcon, Loader } from 'lucide-react';
import CONFIG from './config.js';
import { generateToml, downloadToml } from './tomlGenerator';
import { processImageToWebP, validateImage } from './imageProcessor';

type Language = 'en' | 'ar';
type Section = 'personal' | 'contact' | 'photo' | 'skills' | 'timeline' | 'cases' | 'preview';

interface Milestone {
  year: string;
  event: string;
  eventAr: string;
}

interface ClinicalCase {
  category: string;
  categoryAr: string;
  customCategoryEn: string;
  customCategoryAr: string;
  title: string;
  titleAr: string;
  photo: string | null;
  photoPreview: string | null;
}

interface FormData {
  personal: {
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
  profilePhoto: string | null;
  profilePhotoPreview: string | null;
  skills: {
    clinical: string[];
    clinicalAr: string[];
    digital: string[];
    digitalAr: string[];
    soft: string[];
    softAr: string[];
  };
  timeline: Milestone[];
  cases: ClinicalCase[];
}

const initialFormData: FormData = {
  personal: {
    fullName: '',
    fullNameAr: '',
    title: '',
    titleAr: '',
    graduationYear: '',
    university: '',
    universityAr: '',
  },
  contact: {
    phone: '',
    whatsapp: '',
    email: '',
    website: '',
  },
  profilePhoto: null,
  profilePhotoPreview: null,
  skills: {
    clinical: [],
    clinicalAr: [],
    digital: [],
    digitalAr: [],
    soft: [],
    softAr: [],
  },
  timeline: [],
  cases: [],
};

const sections: Section[] = ['personal', 'contact', 'photo', 'skills', 'timeline', 'cases', 'preview'];
const sectionNames = {
  en: {
    personal: 'Personal Information',
    contact: 'Contact Details',
    photo: 'Profile Photo',
    skills: 'Professional Skills',
    timeline: 'Career Timeline',
    cases: 'Clinical Cases',
    preview: 'Preview & Submit',
  },
  ar: {
    personal: 'المعلومات الشخصية',
    contact: 'بيانات الاتصال',
    photo: 'صورة الملف الشخصي',
    skills: 'المهارات المهنية',
    timeline: 'الخط الزمني المهني',
    cases: 'الحالات السريرية',
    preview: 'معاينة وإرسال',
  },
};

function App() {
  const [lang, setLang] = useState<Language>('en');
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [tomlOutput, setTomlOutput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const caseFileInputRef = useRef<HTMLInputElement>(null);
  const [currentCaseIndex, setCurrentCaseIndex] = useState<number | null>(null);

  const t = CONFIG.ui[lang];
  const isRTL = lang === 'ar';

  const updateFormData = (section: keyof FormData, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section] as any,
        [field]: value,
      },
    }));
  };

  const handleProfilePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = await validateImage(file);
    if (!validation.valid) {
      alert(validation.error);
      return;
    }

    setIsLoading(true);
    setLoadingMessage(t.messages.processing);

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const preview = event.target?.result as string;
        const base64 = await processImageToWebP(file);
        setFormData(prev => ({
          ...prev,
          profilePhoto: base64,
          profilePhotoPreview: preview,
        }));
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error processing image:', error);
      alert(t.messages.error);
      setIsLoading(false);
    }
  };

  const handleCasePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || currentCaseIndex === null) return;

    const validation = await validateImage(file);
    if (!validation.valid) {
      alert(validation.error);
      return;
    }

    setIsLoading(true);
    setLoadingMessage(t.messages.processing);

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const preview = event.target?.result as string;
        const base64 = await processImageToWebP(file);
        setFormData(prev => {
          const cases = [...prev.cases];
          cases[currentCaseIndex] = {
            ...cases[currentCaseIndex],
            photo: base64,
            photoPreview: preview,
          };
          return { ...prev, cases };
        });
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error processing image:', error);
      alert(t.messages.error);
      setIsLoading(false);
    }
  };

  const addMilestone = () => {
    setFormData(prev => ({
      ...prev,
      timeline: [...prev.timeline, { year: '', event: '', eventAr: '' }],
    }));
  };

  const removeMilestone = (index: number) => {
    setFormData(prev => ({
      ...prev,
      timeline: prev.timeline.filter((_, i) => i !== index),
    }));
  };

  const updateMilestone = (index: number, field: keyof Milestone, value: string) => {
    setFormData(prev => {
      const timeline = [...prev.timeline];
      timeline[index] = { ...timeline[index], [field]: value };
      return { ...prev, timeline };
    });
  };

  const addCase = () => {
    setFormData(prev => ({
      ...prev,
      cases: [
        ...prev.cases,
        {
          category: '',
          categoryAr: '',
          customCategoryEn: '',
          customCategoryAr: '',
          title: '',
          titleAr: '',
          photo: null,
          photoPreview: null,
        },
      ],
    }));
  };

  const removeCase = (index: number) => {
    setFormData(prev => ({
      ...prev,
      cases: prev.cases.filter((_, i) => i !== index),
    }));
  };

  const updateCase = (index: number, field: keyof ClinicalCase, value: any) => {
    setFormData(prev => {
      const cases = [...prev.cases];
      cases[index] = { ...cases[index], [field]: value };

      // Update categoryAr if category is selected from dropdown
      if (field === 'category') {
        const selectedCat = CONFIG.caseCategories.find(c => c.id === value);
        if (selectedCat) {
          cases[index].categoryAr = selectedCat.ar;
        }
      }

      return { ...prev, cases };
    });
  };

  const parseSkillsArray = (value: string): string[] => {
    return value
      .split(/[•,]/)
      .map(s => s.trim())
      .filter(s => s.length > 0);
  };

  const handleGeneratePreview = async () => {
    setIsLoading(true);
    setLoadingMessage(t.messages.generating);

    try {
      // Process cases to determine final categories
      const processedCases = formData.cases.map(c => ({
        category: c.category === 'custom' ? c.customCategoryEn : c.category,
        categoryAr: c.category === 'custom' ? c.customCategoryAr : c.categoryAr,
        title: c.title,
        titleAr: c.titleAr,
        photo: c.photo,
      }));

      const tomlData = {
        personalInfo: {
          fullName: formData.personal.fullName,
          fullNameAr: formData.personal.fullNameAr,
          title: formData.personal.title,
          titleAr: formData.personal.titleAr,
          graduationYear: formData.personal.graduationYear,
          university: formData.personal.university,
          universityAr: formData.personal.universityAr,
        },
        contact: formData.contact,
        profilePhoto: formData.profilePhoto,
        skills: formData.skills,
        timeline: formData.timeline,
        cases: processedCases,
      };

      const toml = generateToml(tomlData);
      setTomlOutput(toml);
      setShowPreview(true);
      setIsLoading(false);
    } catch (error) {
      console.error('Error generating TOML:', error);
      alert(t.messages.error);
      setIsLoading(false);
    }
  };

  const handleSendWhatsApp = () => {
    const phoneNumber = CONFIG.whatsapp.destinationNumber;
    const message = encodeURIComponent(CONFIG.whatsapp.message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Also download the TOML file for the user to attach
    downloadToml(tomlOutput, 'config.toml');
  };

  const handleDownload = () => {
    downloadToml(tomlOutput, 'config.toml');
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const renderSection = () => {
    switch (sections[currentSection]) {
      case 'personal':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">{t.form.fullName}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.form.fullName} (English) *
                </label>
                <input
                  type="text"
                  value={formData.personal.fullName}
                  onChange={(e) => updateFormData('personal', 'fullName', e.target.value)}
                  placeholder={t.form.fullNamePlaceholder}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.form.fullName} (Arabic)
                </label>
                <input
                  type="text"
                  value={formData.personal.fullNameAr}
                  onChange={(e) => updateFormData('personal', 'fullNameAr', e.target.value)}
                  placeholder={t.form.fullNamePlaceholder}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  dir="rtl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.form.title} (English)
                </label>
                <input
                  type="text"
                  value={formData.personal.title}
                  onChange={(e) => updateFormData('personal', 'title', e.target.value)}
                  placeholder={t.form.titlePlaceholder}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.form.title} (Arabic)
                </label>
                <input
                  type="text"
                  value={formData.personal.titleAr}
                  onChange={(e) => updateFormData('personal', 'titleAr', e.target.value)}
                  placeholder={t.form.titlePlaceholder}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  dir="rtl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.form.graduationYear}
                </label>
                <input
                  type="text"
                  value={formData.personal.graduationYear}
                  onChange={(e) => updateFormData('personal', 'graduationYear', e.target.value)}
                  placeholder="2024"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.form.university} (English)
                </label>
                <input
                  type="text"
                  value={formData.personal.university}
                  onChange={(e) => updateFormData('personal', 'university', e.target.value)}
                  placeholder={t.form.universityPlaceholder}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.form.university} (Arabic)
                </label>
                <input
                  type="text"
                  value={formData.personal.universityAr}
                  onChange={(e) => updateFormData('personal', 'universityAr', e.target.value)}
                  placeholder={t.form.universityPlaceholder}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  dir="rtl"
                />
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">{t.nav.contact}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.form.phone}
                </label>
                <input
                  type="tel"
                  value={formData.contact.phone}
                  onChange={(e) => updateFormData('contact', 'phone', e.target.value)}
                  placeholder={t.form.phonePlaceholder}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.form.whatsapp}
                </label>
                <input
                  type="tel"
                  value={formData.contact.whatsapp}
                  onChange={(e) => updateFormData('contact', 'whatsapp', e.target.value)}
                  placeholder={t.form.whatsappPlaceholder}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.form.email}
                </label>
                <input
                  type="email"
                  value={formData.contact.email}
                  onChange={(e) => updateFormData('contact', 'email', e.target.value)}
                  placeholder={t.form.emailPlaceholder}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.form.website}
                </label>
                <input
                  type="url"
                  value={formData.contact.website}
                  onChange={(e) => updateFormData('contact', 'website', e.target.value)}
                  placeholder={t.form.websitePlaceholder}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        );

      case 'photo':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">{t.form.profilePhoto}</h2>
            <p className="text-gray-600">{t.form.profilePhotoHint}</p>

            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8">
              {formData.profilePhotoPreview ? (
                <div className="relative">
                  <img
                    src={formData.profilePhotoPreview}
                    alt="Profile"
                    className="w-48 h-48 object-cover rounded-full"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {t.form.changePhoto}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center p-8"
                >
                  <ImageIcon className="w-16 h-16 text-gray-400 mb-4" />
                  <span className="text-gray-600">{t.form.uploadPhoto}</span>
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleProfilePhotoUpload}
                className="hidden"
              />
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">{t.form.skills}</h2>
            <p className="text-gray-600">{t.form.skillsHint}</p>

            {[
              { key: 'clinical', labelEn: t.form.clinicalSkills, labelAr: t.form.clinicalSkills, placeholder: t.form.clinicalSkillsPlaceholder },
              { key: 'digital', labelEn: t.form.digitalSkills, labelAr: t.form.digitalSkills, placeholder: t.form.digitalSkillsPlaceholder },
              { key: 'soft', labelEn: t.form.softSkills, labelAr: t.form.softSkills, placeholder: t.form.softSkillsPlaceholder },
            ].map(skillType => (
              <div key={skillType.key} className="space-y-4">
                <label className="block text-lg font-medium text-gray-700">
                  {skillType.labelEn}
                </label>
                <textarea
                  value={(formData.skills as any)[skillType.key].join(', ')}
                  onChange={(e) => {
                    const skills = parseSkillsArray(e.target.value);
                    setFormData(prev => ({
                      ...prev,
                      skills: {
                        ...prev.skills,
                        [skillType.key]: skills,
                        [`${skillType.key}Ar`]: skills,
                      },
                    }));
                  }}
                  placeholder={skillType.placeholder}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            ))}
          </div>
        );

      case 'timeline':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold">{t.form.timeline}</h2>
                <p className="text-gray-600">{t.form.timelineHint}</p>
              </div>
              <button
                onClick={addMilestone}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-5 h-5" />
                {t.form.addMilestone}
              </button>
            </div>

            {formData.timeline.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No milestones added yet</p>
              </div>
            ) : (
              formData.timeline.map((milestone, index) => (
                <div key={index} className="border border-gray-300 rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-gray-500">
                      Milestone #{index + 1}
                    </span>
                    <button
                      onClick={() => removeMilestone(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t.form.year}
                      </label>
                      <input
                        type="text"
                        value={milestone.year}
                        onChange={(e) => updateMilestone(index, 'year', e.target.value)}
                        placeholder="2024"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t.form.event} (English)
                      </label>
                      <input
                        type="text"
                        value={milestone.event}
                        onChange={(e) => updateMilestone(index, 'event', e.target.value)}
                        placeholder={t.form.eventPlaceholder}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t.form.event} (Arabic)
                      </label>
                      <input
                        type="text"
                        value={milestone.eventAr}
                        onChange={(e) => updateMilestone(index, 'eventAr', e.target.value)}
                        placeholder={t.form.eventPlaceholder}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        dir="rtl"
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        );

      case 'cases':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold">{t.form.cases}</h2>
                <p className="text-gray-600">{t.form.casesHint}</p>
              </div>
              <button
                onClick={addCase}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-5 h-5" />
                {t.form.addCase}
              </button>
            </div>

            {formData.cases.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No clinical cases added yet</p>
              </div>
            ) : (
              formData.cases.map((caseItem, index) => (
                <div key={index} className="border border-gray-300 rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-gray-500">
                      Case #{index + 1}
                    </span>
                    <button
                      onClick={() => removeCase(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t.form.category}
                      </label>
                      <select
                        value={caseItem.category}
                        onChange={(e) => updateCase(index, 'category', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">{t.form.selectCategory}</option>
                        {CONFIG.caseCategories.map(cat => (
                          <option key={cat.id} value={cat.id}>
                            {cat.en}
                          </option>
                        ))}
                        <option value="custom">{t.form.orCustom}</option>
                      </select>
                    </div>

                    {caseItem.category === 'custom' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {t.form.customCategoryEn}
                          </label>
                          <input
                            type="text"
                            value={caseItem.customCategoryEn}
                            onChange={(e) => updateCase(index, 'customCategoryEn', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {t.form.customCategoryAr}
                          </label>
                          <input
                            type="text"
                            value={caseItem.customCategoryAr}
                            onChange={(e) => updateCase(index, 'customCategoryAr', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            dir="rtl"
                          />
                        </div>
                      </>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t.form.caseTitleEn}
                      </label>
                      <input
                        type="text"
                        value={caseItem.title}
                        onChange={(e) => updateCase(index, 'title', e.target.value)}
                        placeholder={t.form.caseTitleEnPlaceholder}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t.form.caseTitleAr}
                      </label>
                      <input
                        type="text"
                        value={caseItem.titleAr}
                        onChange={(e) => updateCase(index, 'titleAr', e.target.value)}
                        placeholder={t.form.caseTitleArPlaceholder}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        dir="rtl"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4">
                    {caseItem.photoPreview ? (
                      <div className="relative">
                        <img
                          src={caseItem.photoPreview}
                          alt={caseItem.title}
                          className="w-48 h-32 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => {
                            setCurrentCaseIndex(index);
                            setTimeout(() => caseFileInputRef.current?.click(), 100);
                          }}
                          className="mt-2 px-4 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                        >
                          {t.form.changeCasePhoto}
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setCurrentCaseIndex(index);
                          setTimeout(() => caseFileInputRef.current?.click(), 100);
                        }}
                        className="flex flex-col items-center justify-center p-4"
                      >
                        <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
                        <span className="text-gray-600 text-sm">{t.form.uploadCasePhoto}</span>
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
            <input
              ref={caseFileInputRef}
              type="file"
              accept="image/*"
              onChange={handleCasePhotoUpload}
              className="hidden"
            />
          </div>
        );

      case 'preview':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">{t.preview.title}</h2>
              <p className="text-gray-600">{t.preview.subtitle}</p>
              <p className="text-sm text-gray-500 mt-2">{t.preview.note}</p>
            </div>

            <div className="flex flex-col gap-4 max-w-md mx-auto">
              <button
                onClick={handleGeneratePreview}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Check className="w-5 h-5" />
                {t.buttons.preview}
              </button>
            </div>

            {showPreview && tomlOutput && (
              <div className="space-y-4">
                <div className="bg-gray-100 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <pre className="text-xs text-gray-800 whitespace-pre-wrap">{tomlOutput}</pre>
                </div>

                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <button
                    onClick={handleDownload}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <Download className="w-5 h-5" />
                    {t.buttons.downloadFile}
                  </button>

                  <button
                    onClick={handleSendWhatsApp}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    <Send className="w-5 h-5" />
                    {t.buttons.sendWhatsApp}
                  </button>
                </div>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-white ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center">
            <Loader className="w-12 h-12 text-blue-600 animate-spin mb-4" />
            <p className="text-gray-700">{loadingMessage}</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={CONFIG.brand.logo}
              alt={CONFIG.brand.name}
              className="h-10 w-10 rounded-full"
            />
            <div>
              <h1 className="text-lg font-bold text-gray-900">{CONFIG.brand.name}</h1>
              <p className="text-xs text-gray-600">{CONFIG.brand.tagline}</p>
            </div>
          </div>

          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center gap-2"
          >
            {lang === 'en' ? 'العربية' : 'English'}
          </button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-2">
            {sections.map((section, index) => (
              <div
                key={section}
                className={`flex items-center ${index < currentSection ? 'text-blue-600' : index === currentSection ? 'text-blue-600 font-bold' : 'text-gray-400'}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index < currentSection
                      ? 'bg-blue-600 text-white'
                      : index === currentSection
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {index < currentSection ? <Check className="w-5 h-5" /> : index + 1}
                </div>
                <span className="hidden md:block ml-2 text-sm">{sectionNames[lang][section]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          {renderSection()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={prevSection}
            disabled={currentSection === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg ${
              currentSection === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            {t.buttons.previous}
          </button>

          {currentSection < sections.length - 1 ? (
            <button
              onClick={nextSection}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {t.buttons.next}
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : null}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} {CONFIG.brand.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
