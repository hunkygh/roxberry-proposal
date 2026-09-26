'use client'

import { useState } from 'react'

const CheckIcon = () => (
  <svg className="w-4 h-4 text-gp-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
)

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg className={`w-4 h-4 text-stone-400 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
)

export default function Proposal() {
  const [openDrawer, setOpenDrawer] = useState<string | null>('split-cd')

  const toggle = (id: string) => setOpenDrawer(prev => prev === id ? null : id)

  return (
    <main className="min-h-screen px-4 py-12 sm:py-20">
      <div className="max-w-5xl mx-auto">

        <header className="text-center mb-10 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900 mb-3">
            Proposal &ndash; Roxberry Juice
          </h1>
          <p className="text-stone-400 text-sm">
            23 Locations &middot; ~$18M Annual Revenue &middot; Prepared by Global Payments
          </p>
        </header>

        <div className="max-w-2xl mx-auto mb-12 animate-fade-in text-center">
          <p className="text-sm text-stone-500 leading-relaxed">
            Two paths to the full Genius POS suite. Same equipment, same integrations, same support. The difference is how the economics work.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">

          <div className="rounded-2xl border border-stone-200 bg-white p-8 animate-fade-in stagger-1">
            <div className="mb-5">
              <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-stone-400">Option A</span>
              <h2 className="text-xl font-semibold text-stone-900 mt-1">Cost + Interchange</h2>
              <p className="text-sm text-stone-400 mt-1">Flagship Partnership Match</p>
            </div>

            <p className="text-sm text-stone-500 leading-relaxed mb-5">
              Traditional processing model. No menu price changes, no surcharging. Actual interchange cost plus a small margin, with equipment and software on a flat monthly rate.
            </p>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-stone-400 mb-1.5">Processing</p>
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-2.5 text-sm text-stone-600"><CheckIcon /><span>Rates matched to current pricing</span></li>
                  <li className="flex items-start gap-2.5 text-sm text-stone-600"><CheckIcon /><span>Set directly by us as processor + technology provider</span></li>
                </ul>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-stone-400 mb-1.5">Equipment &amp; Software</p>
                <p className="text-2xl font-semibold text-stone-900">$125<span className="text-sm font-normal text-stone-400">/mo per location</span></p>
                <p className="text-xs text-stone-400 mt-1">Special approval pricing. Reflects the strategic value of this partnership.</p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-stone-400 mb-1.5">Included per location</p>
                <ul className="space-y-1.5">
                  {['Countertop terminal', 'Handheld device(s)', 'Kiosk (where desired)', 'Enhanced reporting & integrations'].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-stone-600">
                      <CheckIcon /><span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-stone-100">
                <p className="text-xs font-medium uppercase tracking-wider text-stone-400 mb-1.5">Installation</p>
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-2.5 text-sm text-stone-600"><CheckIcon /><span>~$1,000/location via POS Specialists</span></li>
                  <li className="flex items-start gap-2.5 text-sm text-stone-600"><CheckIcon /><span>On-site setup, configuration, training</span></li>
                  <li className="text-xs text-stone-400 ml-6 mt-1">Aggressively prorated. Cannot fully absorb on cost-plus model.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gp-200 bg-white p-8 animate-fade-in stagger-2">
            <div className="mb-5">
              <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-stone-400">Option B</span>
              <h2 className="text-xl font-semibold text-stone-900 mt-1">Free POS Program</h2>
              <p className="text-sm text-stone-400 mt-1">Cash discount model, zero hardware cost</p>
            </div>

            <p className="text-sm text-stone-500 leading-relaxed mb-5">
              Revenue-qualified at ~$18M/yr. Cash discounting at 3.5% funds the entire POS deployment. Equipment, software, install, and ongoing support are all covered at no additional cost.
            </p>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-stone-400 mb-2">What&rsquo;s covered</p>
                <div className="grid grid-cols-2 gap-2">
                  {['Equipment', 'Software', 'Installation', 'POS Support'].map((label) => (
                    <div key={label} className="bg-gp-50 rounded-lg p-2.5">
                      <p className="text-base font-semibold text-stone-900">$0</p>
                      <p className="text-[11px] text-stone-500">{label}</p>
                    </div>
                  ))}
                </div>
                <ul className="mt-3 space-y-1.5">
                  <li className="flex items-start gap-2.5 text-sm text-stone-600"><CheckIcon /><span>Countertop + handhelds + kiosks</span></li>
                  <li className="flex items-start gap-2.5 text-sm text-stone-600"><CheckIcon /><span>Full Genius software suite + integrations</span></li>
                  <li className="flex items-start gap-2.5 text-sm text-stone-600"><CheckIcon /><span>On-site install &amp; training by POS Specialists</span></li>
                  <li className="flex items-start gap-2.5 text-sm text-stone-600"><CheckIcon /><span>Ongoing tech support included</span></li>
                </ul>
              </div>

              <div className="pt-3 border-t border-stone-100">
                <p className="text-xs font-medium uppercase tracking-wider text-stone-400 mb-2">Cash discount structure</p>
                <p className="text-sm text-stone-500 mb-3">
                  The 3.5% can be allocated across menu pricing and flat-rate fee in different proportions. Three common structures:
                </p>

                <div className="space-y-1">
                  <div className="rounded-xl border border-stone-100 overflow-hidden">
                    <button onClick={() => toggle('full-cd')} className="w-full flex items-center justify-between gap-3 p-3.5 text-left hover:bg-stone-50 transition-colors">
                      <div>
                        <p className="text-sm font-medium text-stone-700">Full cash discount</p>
                        <p className="text-xs text-stone-400 mt-0.5">3.5% into menu prices &middot; 0% effective fee</p>
                      </div>
                      <ChevronIcon open={openDrawer === 'full-cd'} />
                    </button>
                    {openDrawer === 'full-cd' && (
                      <div className="px-3.5 pb-3.5 animate-slide-down">
                        <ul className="space-y-1 text-xs text-stone-500">
                          <li>&bull; Entire 3.5% absorbed into menu prices</li>
                          <li>&bull; Roxberry&rsquo;s effective processing fee: <span className="font-semibold text-stone-700">0%</span></li>
                          <li>&bull; Menu impact examples:</li>
                        </ul>
                        <div className="mt-2 grid grid-cols-3 gap-2">
                          <div className="bg-stone-50 rounded-lg p-2 text-center">
                            <p className="text-[11px] text-stone-400">Smoothie</p>
                            <p className="text-xs text-stone-600">$7.00 &rarr; <span className="font-semibold">$7.25</span></p>
                          </div>
                          <div className="bg-stone-50 rounded-lg p-2 text-center">
                            <p className="text-[11px] text-stone-400">Bowl</p>
                            <p className="text-xs text-stone-600">$9.00 &rarr; <span className="font-semibold">$9.32</span></p>
                          </div>
                          <div className="bg-stone-50 rounded-lg p-2 text-center">
                            <p className="text-[11px] text-stone-400">Combo</p>
                            <p className="text-xs text-stone-600">$12.00 &rarr; <span className="font-semibold">$12.42</span></p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="rounded-xl border border-stone-100 overflow-hidden">
                    <button onClick={() => toggle('split-cd')} className="w-full flex items-center justify-between gap-3 p-3.5 text-left hover:bg-stone-50 transition-colors">
                      <div>
                        <p className="text-sm font-medium text-stone-700">Split cash discount</p>
                        <p className="text-xs text-stone-400 mt-0.5">1.75% into menu prices &middot; 1.75% effective fee</p>
                      </div>
                      <ChevronIcon open={openDrawer === 'split-cd'} />
                    </button>
                    {openDrawer === 'split-cd' && (
                      <div className="px-3.5 pb-3.5 animate-slide-down">
                        <ul className="space-y-1 text-xs text-stone-500">
                          <li>&bull; Half the rate (1.75%) absorbed into menu prices</li>
                          <li>&bull; Remaining 1.75% is Roxberry&rsquo;s flat-rate processing fee</li>
                          <li>&bull; Stays fully qualified for Free POS Program</li>
                          <li>&bull; Menu impact examples:</li>
                        </ul>
                        <div className="mt-2 grid grid-cols-3 gap-2">
                          <div className="bg-stone-50 rounded-lg p-2 text-center">
                            <p className="text-[11px] text-stone-400">Smoothie</p>
                            <p className="text-xs text-stone-600">$7.00 &rarr; <span className="font-semibold">$7.12</span></p>
                          </div>
                          <div className="bg-stone-50 rounded-lg p-2 text-center">
                            <p className="text-[11px] text-stone-400">Bowl</p>
                            <p className="text-xs text-stone-600">$9.00 &rarr; <span className="font-semibold">$9.16</span></p>
                          </div>
                          <div className="bg-stone-50 rounded-lg p-2 text-center">
                            <p className="text-[11px] text-stone-400">Combo</p>
                            <p className="text-xs text-stone-600">$12.00 &rarr; <span className="font-semibold">$12.21</span></p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="rounded-xl border border-stone-100 overflow-hidden">
                    <button onClick={() => toggle('flat-rate')} className="w-full flex items-center justify-between gap-3 p-3.5 text-left hover:bg-stone-50 transition-colors">
                      <div>
                        <p className="text-sm font-medium text-stone-700">Flat rate (no menu changes)</p>
                        <p className="text-xs text-stone-400 mt-0.5">No menu adjustment &middot; 3.5% effective fee</p>
                      </div>
                      <ChevronIcon open={openDrawer === 'flat-rate'} />
                    </button>
                    {openDrawer === 'flat-rate' && (
                      <div className="px-3.5 pb-3.5 animate-slide-down">
                        <ul className="space-y-1 text-xs text-stone-500">
                          <li>&bull; No menu price adjustments at all</li>
                          <li>&bull; Roxberry pays 3.5% as a standard flat processing fee</li>
                          <li>&bull; Still qualifies for free POS</li>
                          <li>&bull; Most straightforward if cash discounting isn&rsquo;t the right fit</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto animate-fade-in stagger-3">
          <div className="flex items-start gap-4 bg-white rounded-2xl border border-stone-200 p-6">
            <div className="w-10 h-10 rounded-full bg-gp-50 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-gp-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-stone-700">$1,000 Referral Bonus</p>
              <p className="text-xs text-stone-400 mt-1">Per business referred as we grow in this market. Both options qualify.</p>
            </div>
          </div>
        </div>

        <footer className="text-center mt-20 pb-8 animate-fade-in stagger-4">
          <p className="text-xs text-stone-300">
            Prepared for Roxberry Juice &middot; Global Payments &middot; {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </main>
  )
}
