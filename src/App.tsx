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
} from 'lucide-react';
import { supabase } from './lib/supabase';

function App() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'duplicate' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const { error } = await supabase
      .from('subscribers')
      .insert({ email: email.trim().toLowerCase() });

    if (!error) {
      setStatus('success');
      setEmail('');
    } else if (error.code === '23505') {
      setStatus('duplicate');
    } else {
      setStatus('error');
    }
  };

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
            I'm Zumri — a lecturer, management practitioner, and certified AI enthusiast. Every week, I test new AI tools in real academic settings and share what actually works. No hype, no jargon. Just honest findings.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <a href="#community" className="inline-flex items-center space-x-2 bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-xl font-medium shadow-sm transition-colors">
              <span>Join the Conversation</span>
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#about" className="inline-flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium transition-colors">
              <span>Who's Zumri?</span>
            </a>
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
                  <p className="text-brand-200 text-sm mt-1">Educator · Practitioner · AI Explorer</p>

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
                    I've spent over 12 years working across education, management practice, and digital strategy — from lecturing business and leadership programs at BCAS Kandy to supporting research at the University of Malaya. Today I work at Afterskills on data literacy, where I see daily how important practical skills are over theory.
                  </p>
                  <p className="text-gray-600 leading-relaxed text-sm mt-3">
                    When AI tools started flooding into higher education, I didn't ban them or blindly embrace them. I got curious. I started testing them — in research workflows, in lesson planning, in grading — and writing up what I found. This site is where I share all of it, openly, with anyone who'll find it useful.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">Background</h3>
                  <div className="space-y-3">
                    {[
                      { role: 'Senior Lecturer & Trainer', org: 'BCAS Kandy Campus', detail: '7+ years · Leadership, Management, Digital Skills' },
                      { role: 'Research Project Assistant', org: 'University of Malaya', detail: 'ISI research · Literature review & analysis' },
                      { role: 'Business Development Executive', org: 'Afterskills', detail: 'Data literacy for all · Present' },
                    ].map((item) => (
                      <div key={item.org} className="flex items-start space-x-3">
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

      {/* What I Share */}
      <section id="what-i-share" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">What I share each week</h2>
            <p className="text-gray-500 mt-2">Honest tests, practical prompts, and real classroom experiences.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-xl p-6 bg-gray-50 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-5 w-5 text-brand-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Tool Test Results</h3>
              <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                I spend hours testing AI tools so you don't have to. Real results from real academic use cases—what worked, what didn't, and why.
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-6 bg-gray-50 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center mb-4">
                <GraduationCap className="h-5 w-5 text-brand-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Lesson Ideas & Prompts</h3>
              <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                Ready-to-use prompts for research, writing, and assessment. Tested in my own teaching and refined through feedback.
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-6 bg-gray-50 hover:shadow-md transition-shadow">
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
      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Who's this for?</h2>
            <p className="text-gray-500 mt-2">If any of these sound like you, you're in the right place.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div id="educators" className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700 uppercase tracking-wide mb-4">
                Educators
              </div>
              <ul className="space-y-3 text-sm text-gray-700">
                {[
                  "You're curious about AI but don't know where to start",
                  "You want to design AI-aware assignments without banning everything",
                  "You're looking for practical, tested approaches—not theory",
                ].map((item) => (
                  <li key={item} className="flex items-start">
                    <span className="text-brand-500 mr-2 font-bold mt-0.5">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div id="students" className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold bg-purple-50 text-purple-700 uppercase tracking-wide mb-4">
                Students
              </div>
              <ul className="space-y-3 text-sm text-gray-700">
                {[
                  "You want to use AI ethically without crossing academic integrity lines",
                  "You're navigating literature reviews, research, or study strategies",
                  "You want to build real skills—not just shortcuts",
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

      {/* Community CTA */}
      <section id="community" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto">
            <Mail className="h-7 w-7 text-brand-600" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Join the community</h2>
          <p className="text-gray-600 max-w-lg mx-auto leading-relaxed">
            Every week or two, I send out what I've learned — an AI tool test, a few useful prompts, and reflections from my own work in education. It's free, practical, and written for real academic life.
          </p>
          <div className="max-w-md mx-auto pt-2">
            {status === 'success' ? (
              <div className="flex items-center justify-center space-x-3 bg-emerald-50 border border-emerald-200 text-emerald-800 px-5 py-4 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                <p className="text-sm font-medium">You're in! I'll be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="sm:flex gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== 'idle') setStatus('idle');
                  }}
                  disabled={status === 'loading'}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-600 focus:border-brand-600 outline-none text-sm disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full sm:w-auto mt-2 sm:mt-0 bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-medium px-6 py-3 rounded-lg text-sm whitespace-nowrap transition-colors inline-flex items-center justify-center space-x-2"
                >
                  {status === 'loading' ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <span>Sign Up</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
            {status === 'duplicate' && (
              <p className="text-sm text-amber-600 mt-2">That email is already signed up — you're good!</p>
            )}
            {status === 'error' && (
              <p className="text-sm text-red-500 mt-2">Something went wrong. Please try again.</p>
            )}
            {status === 'idle' && (
              <p className="text-xs text-gray-400 mt-3">
                No spam, no sales pitches. Just thoughtful updates on AI in education.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 text-sm border-t border-gray-800">
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
