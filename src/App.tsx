import { useState } from 'react';
import {
  Brain,
  Mail,
  Users,
  BookOpen,
  GraduationCap,
  ArrowRight,
  Linkedin,
  MapPin,
  BadgeCheck,
  CheckCircle2,
  Loader2,
  ExternalLink,
  Building2,
} from 'lucide-react';
import { supabase } from './lib/supabase';

type Role = 'Academic' | 'Student' | '';
type Status = 'idle' | 'loading' | 'success' | 'duplicate' | 'error';

function App() {
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<Role>('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const resetStatus = () => { if (status !== 'idle') setStatus('idle'); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const { error } = await supabase
      .from('subscribers')
      .insert({
        full_name: fullName.trim(),
        role,
        email: email.trim().toLowerCase(),
      });

    if (!error) {
      setStatus('success');
      setFullName('');
      setRole('');
      setEmail('');
    } else if (error.code === '23505') {
      setStatus('duplicate');
    } else {
      setStatus('error');
    }
  };

  const inputClass =
    'w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-sm transition-colors disabled:opacity-50';

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 antialiased">

      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Brain className="h-7 w-7 text-brand-600" />
            <div className="flex items-baseline space-x-1">
              <span className="font-bold text-lg tracking-tight text-gray-900">AI Academic Skills</span>
              <span className="text-sm font-medium text-gray-400">with Zumri</span>
            </div>
          </div>
          <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-600">
            <a href="#about" className="hover:text-brand-600 transition-colors">About</a>
            <a href="#what-i-share" className="hover:text-brand-600 transition-colors">What I Share</a>
            <a href="#community" className="hover:text-brand-600 transition-colors">Join In</a>
          </nav>
          <a href="#community" className="hidden sm:inline-block text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors">
            Join the Community
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative bg-white overflow-hidden py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-brand-50 text-brand-700 border border-brand-100">
            An Educator Learning Out Loud
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
            I'm figuring out AI in higher ed.<br />
            <span className="text-brand-600">Come learn with me.</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            I'm Zumri — a lecturer at multiple UK universities, management practitioner, and certified AI enthusiast. Every week, I test new AI tools in real academic settings and share what actually works. No hype, no jargon. Just honest findings.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">

            {/* Join the Conversation - Newsletter */}
            <a href="#community" className="flex flex-col items-center p-4 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors min-w-[180px]">
              <div className="flex items-center space-x-2 text-brand-600 font-semibold">
                <Mail className="h-5 w-5" />
                <span>Join the Conversation</span>
              </div>
              <span className="text-xs text-gray-500 mt-1">Join our bi-weekly newsletter</span>
            </a>

            {/* Join the Community - Discord */}
            <a href="#community-space" className="flex flex-col items-center p-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white transition-colors min-w-[180px]">
              <div className="flex items-center space-x-2 font-semibold">
                <Users className="h-5 w-5" />
                <span>Join the Community</span>
              </div>
              <span className="text-xs text-brand-200 mt-1">Join our Discord group</span>
            </a>

          </div>
        </div>
      </section>

      {/* What I Share */}
      <section id="what-i-share" className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">What I share each week</h2>
            <p className="text-gray-500 mt-2">Honest tests, practical prompts, and real classroom experiences.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-xl p-6 bg-white hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-5 w-5 text-brand-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Tool Test Results</h3>
              <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                I spend hours testing AI tools so you don't have to. Real results from real academic use cases — what worked, what didn't, and why.
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-6 bg-white hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center mb-4">
                <GraduationCap className="h-5 w-5 text-brand-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Lesson Ideas & Prompts</h3>
              <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                Ready-to-use prompts for research, writing, and assessment. Tested in my own teaching and refined through feedback.
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-6 bg-white hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-5 w-5 text-brand-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Community Discussions</h3>
              <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                A growing space where educators and students share their own experiments, questions, and discoveries. Let's learn from each other.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Who's this for?</h2>
            <p className="text-gray-500 mt-2">If any of these sound like you, you're in the right place.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div id="educators" className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700 uppercase tracking-wide mb-4">
                Academics
              </div>
              <ul className="space-y-3 text-sm text-gray-700">
                {[
                  "You're curious about AI but don't know where to start",
                  "You want to design AI-aware assignments without banning everything",
                  "You're looking for practical, tested approaches — not theory",
                ].map((item) => (
                  <li key={item} className="flex items-start">
                    <span className="text-brand-500 mr-2 font-bold mt-0.5">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div id="students" className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold bg-purple-50 text-purple-700 uppercase tracking-wide mb-4">
                Students
              </div>
              <ul className="space-y-3 text-sm text-gray-700">
                {[
                  "You want to use AI ethically without crossing academic integrity lines",
                  "You're navigating literature reviews, research, or study strategies",
                  "You want to build real skills — not just shortcuts",
                ].map((item) => (
                  <li key={item} className="flex items-start">
                    <span className="text-brand-500 mr-2 font-bold mt-0.5">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* About Zumri */}
      <section id="about" className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-5">

              {/* Left accent panel */}
              <div className="md:col-span-2 bg-brand-900 p-8 flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                    <GraduationCap className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white leading-snug">Zumri Lahardeen</h2>
                  <p className="text-brand-200 text-sm mt-1">Lecturer · Practitioner · AI Explorer</p>

                  <div className="mt-5 space-y-2">
                    <div className="flex items-center text-brand-200 text-sm space-x-2">
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      <span>Nottingham, England</span>
                    </div>
                    <a
                      href="https://www.linkedin.com/in/zumrim"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-brand-200 hover:text-white text-sm space-x-2 transition-colors"
                    >
                      <Linkedin className="h-4 w-4 flex-shrink-0" />
                      <span>linkedin.com/in/zumrim</span>
                    </a>
                  </div>

                  <div className="mt-6 space-y-2">
                    <p className="text-xs font-semibold text-brand-300 uppercase tracking-wider">Current Role</p>
                    <div className="flex items-start space-x-2">
                      <Building2 className="h-4 w-4 text-brand-300 flex-shrink-0 mt-0.5" />
                      <span className="text-brand-100 text-sm">Associate Lecturer<br />Buckinghamshire New University</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 space-y-2">
                  <p className="text-xs font-semibold text-brand-300 uppercase tracking-wider">Certifications</p>
                  <div className="flex items-start space-x-2">
                    <BadgeCheck className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-brand-100 text-sm">AI Fluency for Educators</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <BadgeCheck className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-brand-100 text-sm">Tableau Public for Project Management</span>
                  </div>
                </div>
              </div>

              {/* Right content panel */}
              <div className="md:col-span-3 p-8 space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">My Story</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    I'm an Associate Lecturer at Buckinghamshire New University, and have previously held Partner Lecturer positions at the University of East London and Solent University (Southampton) — delivering programmes across business, management, and leadership at undergraduate and postgraduate level.
                  </p>
                  <p className="text-gray-600 leading-relaxed text-sm mt-3">
                    During the COVID-19 crisis, I served as Task Force Leader for Digital Transformation at a pioneering private higher education institution in Sri Lanka. I designed, trained, and deployed a complete digital framework from the ground up — enabling the seamless continuation of academic operations under emergency conditions. That experience taught me that technology works in education only when the people using it are genuinely supported.
                  </p>
                  <p className="text-gray-600 leading-relaxed text-sm mt-3">
                    Today, much of my work centres on professional development for academic staff: designing and delivering targeted trainings on digital teaching pedagogy, the strategic integration of AI in education, and internal software and methodology upskilling for institutional teams. When AI tools started flooding into higher education, I didn't dismiss them or blindly recommend them — I started testing them in real workflows and writing up exactly what I found. This site is where I share all of it.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">Higher Education Roles</h3>
                  <div className="space-y-3">
                    {[
                      { role: 'Associate Lecturer', org: 'Buckinghamshire New University', detail: 'Present' },
                      { role: 'Partner Lecturer', org: 'University of East London', detail: 'Business & Management programmes' },
                      { role: 'Partner Lecturer', org: 'Solent University, Southampton', detail: 'Business & Management programmes' },
                      { role: 'Senior Lecturer & Task Force Lead', org: 'BCAS Kandy Campus', detail: 'Digital Transformation · COVID-19 emergency response' },
                      { role: 'Research Project Assistant', org: 'University of Malaya', detail: 'ISI research · Literature review & analysis' },
                    ].map((item) => (
                      <div key={`${item.role}-${item.org}`} className="flex items-start space-x-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{item.role}</p>
                          <p className="text-xs text-gray-500">{item.org} · {item.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">Education</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'MSc Project Management · NTU',
                      'MBA · Wolverhampton',
                      'BSc IT & BIS · Middlesex',
                    ].map((edu) => (
                      <span key={edu} className="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
                        {edu}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Sign-up + Community */}
      <section id="community" className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

          {/* Sign-up form */}
          <div className="text-center space-y-6">
            <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto">
              <Mail className="h-7 w-7 text-brand-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Stay in the loop</h2>
            <p className="text-gray-400 max-w-lg mx-auto leading-relaxed text-sm">
              Every week or two, I send out what I've been testing — AI tool results, practical prompts, and honest reflections from real academic work. Free, no fluff, written for higher education.
            </p>

            <div className="max-w-md mx-auto text-left pt-2">
              {status === 'success' ? (
                <div className="flex items-center justify-center space-x-3 bg-emerald-900/40 border border-emerald-700 text-emerald-300 px-5 py-4 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                  <p className="text-sm font-medium">You're in! I'll be in touch soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">

                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Jane Smith"
                      required
                      value={fullName}
                      onChange={(e) => { setFullName(e.target.value); resetStatus(); }}
                      disabled={status === 'loading'}
                      className={inputClass}
                    />
                  </div>

                  {/* Academic Role */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                      I am a...
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {(['Academic', 'Student'] as Role[]).map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => { setRole(option); resetStatus(); }}
                          disabled={status === 'loading'}
                          className={`py-3 rounded-lg border text-sm font-medium transition-all ${
                            role === option
                              ? 'bg-brand-600 border-brand-500 text-white shadow-sm'
                              : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200'
                          } disabled:opacity-50`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    {/* Hidden required input to trigger browser validation if role not selected */}
                    <input
                      type="text"
                      required
                      value={role}
                      onChange={() => {}}
                      className="sr-only"
                      tabIndex={-1}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="jane@university.ac.uk"
                      required
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); resetStatus(); }}
                      disabled={status === 'loading'}
                      className={inputClass}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-brand-600 hover:bg-brand-500 disabled:opacity-60 text-white font-semibold px-6 py-3.5 rounded-lg text-sm transition-colors inline-flex items-center justify-center space-x-2 mt-1"
                  >
                    {status === 'loading' ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <span>Sign Me Up</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>

                  {status === 'duplicate' && (
                    <p className="text-sm text-amber-400 text-center pt-1">That email is already signed up — you're good!</p>
                  )}
                  {status === 'error' && (
                    <p className="text-sm text-red-400 text-center pt-1">Something went wrong. Please try again.</p>
                  )}
                </form>
              )}

              <p className="text-xs text-gray-600 mt-4 text-center">
                No spam, no sales pitches. Just thoughtful updates on AI in education.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10"></div>

          {/* Join our Higher Education Community */}
          <div id="community-space" className="text-center space-y-5">
            <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto">
              <Users className="h-7 w-7 text-brand-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Join our Higher Education Community</h2>
            <p className="text-gray-400 max-w-xl mx-auto leading-relaxed text-sm">
              This is a private, dedicated space for higher education professionals and students to network, share institutional initiatives, exchange teaching strategies, and continue the conversation beyond this newsletter. Whether you're navigating a new AI policy, designing a curriculum, or just looking for peers who get it — this community is for you.
            </p>
            <div className="pt-2">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2.5 bg-white text-gray-900 hover:bg-gray-100 font-semibold px-7 py-4 rounded-xl text-sm transition-colors shadow-sm"
              >
                <Users className="h-4 w-4 text-brand-600" />
                <span>Join the Community Space</span>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </a>
              <p className="text-xs text-gray-600 mt-3">
                Replace the link above with your Discord, LinkedIn group, or Reddit community URL.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-500 py-8 text-sm border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-brand-500" />
            <span className="text-gray-300">AI Academic Skills with Zumri</span>
          </div>
          <div className="flex space-x-6 items-center">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#what-i-share" className="hover:text-white transition-colors">What I Share</a>
            <a
              href="https://www.linkedin.com/in/zumrim"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors inline-flex items-center space-x-1.5"
            >
              <Linkedin className="h-4 w-4" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
