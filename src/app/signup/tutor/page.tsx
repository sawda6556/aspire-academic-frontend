'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Avatar from '@/components/Avatar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LegalAgreement from '@/components/LegalAgreement';
import SubjectSelector from '@/components/subjects/SubjectSelector';
import DocumentUploadField from '@/components/DocumentUploadField';

const TERMS_TEXT = `By registering for an account or using the Aspire Academic Co. platform, you agree to be bound by these Terms and Conditions.
- Tutors must be at least 18 years old and pass our verification process.
- Users are responsible for maintaining the confidentiality of their account credentials.
- Aspire Academic Co. reserves the right to suspend or terminate accounts for violations.
- Ethical Commitment: No charging or payment of interest (Riba).
- All payments must be made through the Platform.`;

const PRIVACY_TEXT = `We collect information that you provide directly to us: Name, email, gender, and tutor verification data.
- The "No-Photo" Policy: Real profile photos are prohibited.
- Automatic Avatars: All users are assigned a modest avatar based on gender.
- Data Security: We implement robust measures to protect your personal data.
- Under UK GDPR, you have rights to access, rectification, and erasure.`;

const SAFEGUARDING_TEXT = `Aspire Academic Co. is committed to safeguarding children and vulnerable adults.
- All tutors undergo identity and qualification verification.
- Controlled Communication: Sharing personal contact details is strictly prohibited.
- Reporting: Use the "Report" button or email safeguarding@aspireacademic.com.
- We will report serious risks to relevant authorities.`;

const CONDUCT_TEXT = `All interactions must be conducted with professionalism and respect.
- Abusive language and harassment are strictly prohibited.
- Inappropriate behavior: No flirting or suggestive comments.
- Platform-Only Communication: All messaging must stay on the platform.
- Dress Code: Professional and modest appearance during video lessons.`;

export default function TutorSignup() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    gender: 'FEMALE' as 'MALE' | 'FEMALE',
    country: '',
    selectedSubjectIds: [] as string[],
    qualifications: '',
    bio: '',
    idDocumentUrl: '',
    addressProofUrl: '',
    certDocumentUrl: '',
    dbsCertificateUrl: '',
    dbsCertificateNumber: '',
    isOnUpdateService: false,
    termsAccepted: false,
    privacyAccepted: false,
    safeguardingAccepted: false,
    conductAccepted: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step === 1) {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters');
        return;
      }
    }
    if (step === 3) {
      if (!formData.idDocumentUrl || !formData.addressProofUrl) {
        setError('ID Document and Proof of Address are mandatory.');
        return;
      }
      if (formData.country === 'United Kingdom' && !formData.dbsCertificateUrl) {
        setError('Enhanced DBS Certificate is mandatory for UK-based tutors.');
        return;
      }
    }
    setError('');
    setStep(step + 1);
  };
  
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.termsAccepted || !formData.privacyAccepted || !formData.safeguardingAccepted || !formData.conductAccepted) {
      setError('You must accept all policies to continue.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          full_name: formData.fullName,
          gender: formData.gender,
          user_type: 'TUTOR',
          profile_data: {
            country: formData.country,
            subjects: formData.selectedSubjectIds,
            qualifications: formData.qualifications,
            bio: formData.bio,
            id_document_url: formData.idDocumentUrl,
            address_proof_url: formData.addressProofUrl,
            cert_document_url: formData.certDocumentUrl,
            dbs_certificate_url: formData.dbsCertificateUrl,
            dbs_certificate_number: formData.dbsCertificateNumber,
            is_on_update_service: formData.isOnUpdateService,
          }
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      router.push('/login?registered=true');
    } catch (err: any) {
      setError(err.message || 'An error occurred during registration.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl w-full bg-white p-8 rounded-3xl shadow-xl ring-1 ring-surface">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-heading">Tutor Onboarding</h1>
            <p className="text-muted text-sm mt-2">Step {step} of 4</p>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4 text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-heading mb-4">Account Information</h2>
                <div>
                  <label className="block text-sm font-medium text-muted mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border-surface focus:border-primary focus:ring-primary py-2 px-3 border"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full rounded-lg border-surface focus:border-primary focus:ring-primary py-2 px-3 border"
                    placeholder="Min 8 characters"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted mb-1">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full rounded-lg border-surface focus:border-primary focus:ring-primary py-2 px-3 border"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!formData.email || !formData.password || !formData.confirmPassword}
                  className="w-full rounded-lg bg-primary py-3 text-sm font-bold text-white hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-heading">Personal Details</h2>
                
                <div className="flex flex-col items-center mb-6 p-4 bg-background rounded-2xl">
                  <Avatar gender={formData.gender} size={96} className="mb-4" />
                  <p className="text-xs text-muted text-center">Assigned avatar based on gender. No personal photos allowed.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-muted mb-1">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full rounded-lg border-surface focus:border-primary focus:ring-primary py-2 px-3 border"
                      placeholder="Legal name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted mb-1">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full rounded-lg border-surface focus:border-primary focus:ring-primary py-2 px-3 border"
                    >
                      <option value="FEMALE">Female</option>
                      <option value="MALE">Male</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted mb-1">Country of Residence</label>
                  <input
                    name="country"
                    type="text"
                    required
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full rounded-lg border-surface focus:border-primary focus:ring-primary py-2 px-3 border"
                  />
                </div>

                <SubjectSelector 
                  selectedSubjectIds={formData.selectedSubjectIds}
                  onChange={(ids) => setFormData(prev => ({ ...prev, selectedSubjectIds: ids }))}
                  min={1}
                  max={3}
                />

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 rounded-lg border border-surface py-3 text-sm font-bold text-heading hover:bg-surface transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!formData.fullName || !formData.country}
                    className="flex-1 rounded-lg bg-primary py-3 text-sm font-bold text-white hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-heading">Identity Verification</h2>
                <p className="text-sm text-muted">Please upload the following documents for manual verification.</p>
                
                <DocumentUploadField 
                  label="Government ID / Passport"
                  description="A clear photo or scan of your government-issued identity document."
                  required
                  onUploadSuccess={(url) => setFormData(p => ({...p, idDocumentUrl: url}))}
                />

                <DocumentUploadField 
                  label="Proof of Address"
                  description="Utility bill or bank statement (less than 3 months old)."
                  required
                  onUploadSuccess={(url) => setFormData(p => ({...p, addressProofUrl: url}))}
                />

                {formData.country === 'United Kingdom' && (
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 space-y-4">
                    <DocumentUploadField 
                      label="Enhanced DBS Certificate"
                      description="As you are based in the UK and teaching children, a valid Enhanced DBS Certificate is required."
                      required
                      onUploadSuccess={(url) => setFormData(p => ({...p, dbsCertificateUrl: url}))}
                    />
                    
                    <div className="flex items-start gap-2">
                      <input 
                        type="checkbox"
                        id="isOnUpdateService"
                        checked={formData.isOnUpdateService}
                        onChange={(e) => setFormData(p => ({...p, isOnUpdateService: e.target.checked}))}
                        className="mt-1"
                      />
                      <label htmlFor="isOnUpdateService" className="text-sm text-muted">
                        I am registered with the DBS Update Service
                      </label>
                    </div>

                    {formData.isOnUpdateService && (
                      <div>
                        <label className="block text-sm font-medium text-muted mb-1">DBS Certificate Number</label>
                        <input
                          type="text"
                          value={formData.dbsCertificateNumber}
                          onChange={(e) => setFormData(p => ({...p, dbsCertificateNumber: e.target.value}))}
                          className="w-full rounded-lg border-surface focus:border-primary focus:ring-primary py-2 px-3 border text-sm"
                          placeholder="Enter your certificate number"
                        />
                      </div>
                    )}
                  </div>
                )}

                <DocumentUploadField 
                  label="Educational Certificates"
                  description="Proof of your qualifications (optional but recommended)."
                  onUploadSuccess={(url) => setFormData(p => ({...p, certDocumentUrl: url}))}
                />

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 rounded-lg border border-surface py-3 text-sm font-bold text-heading hover:bg-surface transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex-1 rounded-lg bg-primary py-3 text-sm font-bold text-white hover:bg-primary/90 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-heading">Legal Framework & Policies</h2>
                
                <div className="space-y-6">
                  <LegalAgreement 
                    title="Terms and Conditions" 
                    content={TERMS_TEXT} 
                    checked={formData.termsAccepted}
                    onAccept={(val) => setFormData(p => ({...p, termsAccepted: val}))}
                  />
                  <LegalAgreement 
                    title="Privacy Policy" 
                    content={PRIVACY_TEXT} 
                    checked={formData.privacyAccepted}
                    onAccept={(val) => setFormData(p => ({...p, privacyAccepted: val}))}
                  />
                  <LegalAgreement 
                    title="Safeguarding Policy" 
                    content={SAFEGUARDING_TEXT} 
                    checked={formData.safeguardingAccepted}
                    onAccept={(val) => setFormData(p => ({...p, safeguardingAccepted: val}))}
                  />
                  <LegalAgreement 
                    title="Code of Conduct" 
                    content={CONDUCT_TEXT} 
                    checked={formData.conductAccepted}
                    onAccept={(val) => setFormData(p => ({...p, conductAccepted: val}))}
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 rounded-lg border border-surface py-3 text-sm font-bold text-heading hover:bg-surface transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 rounded-lg bg-gold py-3 text-sm font-bold text-white hover:bg-gold/90 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? 'Creating Account...' : 'Complete Signup'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
