'use client'

import { useState, useEffect, useCallback } from 'react'

type PlanSelection = 'cost-plus' | 'free-pos' | null
type CdStructure = 'full-cd' | 'split-cd' | 'flat-rate'

interface StoredSelection {
  plan: PlanSelection
  cdStructure?: CdStructure
  timestamp: string
}

const CheckIcon = () => (
  <svg className="w-4 h-4 text-gp-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
)

const StarIcon = () => (
  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

const RadioDot = ({ active }: { active: boolean }) => (
  <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
    active ? 'border-gp-500' : 'border-stone-300'
  }`}>
    {active && <div className="w-2 h-2 rounded-full bg-gp-500" />}
  </div>
)

export default function Proposal() {
  const [plan, setPlan] = useState<PlanSelection>(null)
  const [cdStructure, setCdStructure] = useState<CdStructure>('split-cd')
  const [confirmed, setConfirmed] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('roxberry-selection')
      if (raw) {
        const stored: StoredSelection = JSON.parse(raw)
        setPlan(stored.plan)
        if (stored.cdStructure) setCdStructure(stored.cdStructure)
        setConfirmed(true)
      }
    } catch {}
    setHydrated(true)
  }, [])

  const handleSelect = useCallback((option: PlanSelection) => {
    if (confirmed) return
    setPlan(option)
    setShowModal(true)
  }, [confirmed])

  const handleConfirm = useCallback(() => {
    const data: StoredSelection = {
      plan,
      cdStructure: plan === 'free-pos' ? cdStructure : undefined,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem('roxberry-selection', JSON.stringify(data))
    setConfirmed(true)
    setShowModal(false)
  }, [plan, cdStructure])

  const handleReset = useCallback(() => {
    localStorage.removeItem('roxberry-selection')
    setPlan(null)
    setCdStructure('split-cd')
    setConfirmed(false)
  }, [])

  if (!hydrated) return null

  const costPlusDimmed = confirmed && plan !== 'cost-plus'
  const frePosDimmed = confirmed && plan !== 'free-pos'

  const planLabel = plan === 'cost-plus'
    ? 'Cost + Interchange (Flagship Match)'
    : plan === 'free-pos'
    ? 'Free POS Program'
    : ''

  const cdLabel = cdStructure === 'full-cd'
    ? 'Full Cash Discount (0% effective fee)'
    : cdStructure === 'split-cd'
    ? 'Split Cash Discount (1.75% menu / 1.75% flat rate)'
    : 'Flat Rate (3.5%)'

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
            Two paths to the full Genius POS suite. Same equipment, same integrations, same support. The difference is how the economics work. Select whichever fits best.
          </p>
        </div>

        {confirmed && (
          <div className="mb-10 text-center animate-slide-down">
            <div className="inline-flex items-center gap-2 bg-gp-50 border border-gp-200 rounded-full px-5 py-2.5 text-sm text-gp-600">
              <svg className="w-4 h-4 text-gp-500" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>
                Selection confirmed{plan === 'free-pos' ? `: ${cdLabel}` : `: ${planLabel}`}.
                Your Global Payments team will be in touch to finalize next steps.
              </span>
            </div>
            <button
              onClick={handleReset}
              className="block mx-auto mt-3 text-xs text-stone-400 hover:text-stone-600 underline underline-offset-2 transition-colors"
            >
              Change selection
            </button>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6 mb-16">

          <div
            className={`relative rounded-2xl border bg-white p-8 transition-all duration-500 animate-fade-in stagger-1 ${
              costPlusDimmed
                ? 'opacity-40 scale-[0.98] pointer-events-none'
                : confirmed && plan === 'cost-plus'
                ? 'border-gp-300 shadow-sm ring-1 ring-gp-100'
                : 'border-stone-200 hover:border-stone-300 hover:shadow-sm'
            }`}
          >
            <div className="mb-5">
              <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-stone-400">Option A</span>
              <h2 className="text-xl font-semibold text-stone-900 mt-1">Cost + Interchange</h2>
              <p className="text-sm text-stone-400 mt-1">Flagship Partnership Match</p>
            </div>

            <p className="text-sm text-stone-500 leading-relaxed mb-5">
              Traditional processing model. No menu price changes, no surcharging. You pay actual interchange cost plus a small margin, with equipment and software on a flat monthly rate.
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-stone-400 mb-1.5">Processing</p>
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-2.5 text-sm text-stone-600">
                    <CheckIcon /><span>Rates matched to your current pricing</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-sm text-stone-600">
                    <CheckIcon /><span>We own the processing side, so we set rates directly</span>
                  </li>
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
                  <li className="flex items-start gap-2.5 text-sm text-stone-600">
                    <CheckIcon /><span>~$1,000/location, handled by POS Specialists</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-sm text-stone-600">
                    <CheckIcon /><span>Covers on-site setup, configuration, training</span>
                  </li>
                  <li className="text-xs text-stone-400 ml-6 mt-1">Aggressively prorated. Cannot fully absorb on cost-plus model.</li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => handleSelect('cost-plus')}
              disabled={confirmed}
              className={`w-full py-2.5 px-5 rounded-lg text-xs font-medium tracking-wide uppercase transition-all ${
                confirmed && plan === 'cost-plus'
                  ? 'bg-gp-50 text-gp-600 border border-gp-200 cursor-default'
                  : 'border border-stone-200 text-stone-500 hover:border-gp-300 hover:text-gp-600'
              }`}
            >
              {confirmed && plan === 'cost-plus' ? '\u2713 Selected' : 'Select this option'}
            </button>
          </div>

          <div
            className={`relative rounded-2xl border bg-white p-8 transition-all duration-500 animate-fade-in stagger-2 ${
              frePosDimmed
                ? 'opacity-40 scale-[0.98] pointer-events-none'
                : confirmed && plan === 'free-pos'
                ? 'border-gp-300 shadow-sm ring-1 ring-gp-100'
                : 'border-gp-200 hover:border-gp-300 hover:shadow-sm'
            }`}
          >
            <div className="absolute -top-3 left-8">
              <span className="inline-flex items-center gap-1.5 bg-gp-500 text-white text-[10px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full">
                <StarIcon />
                Recommended
              </span>
            </div>

            <div className="mb-5 mt-2">
              <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-stone-400">Option B</span>
              <h2 className="text-xl font-semibold text-stone-900 mt-1">Free POS Program</h2>
              <p className="text-sm text-stone-400 mt-1">Cash discount model, zero hardware cost</p>
            </div>

            <p className="text-sm text-stone-500 leading-relaxed mb-5">
              Roxberry qualifies at ~$18M annual revenue. Cash discounting at 3.5% funds the entire POS deployment: equipment, software, install, and ongoing support are all covered. You choose how much of that 3.5% to absorb into menu prices vs. retain as a flat processing fee.
            </p>

            <div className="space-y-4 mb-6">
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
                <p className="text-sm text-stone-500 mb-4">
                  Choose how the 3.5% flows. More into menu prices = lower effective processing fee.
                </p>
                <div className="space-y-2">

                  <button
                    onClick={() => !confirmed && setCdStructure('full-cd')}
                    disabled={confirmed}
                    className={`w-full text-left flex items-start gap-3 p-3.5 rounded-xl border transition-all ${
                      cdStructure === 'full-cd'
                        ? 'border-gp-200 bg-gp-50'
                        : 'border-stone-100 hover:border-stone-200'
                    }`}
                  >
                    <RadioDot active={cdStructure === 'full-cd'} />
                    <div>
                      <p className="text-sm font-medium text-stone-700">Full cash discount</p>
                      <ul className="mt-1.5 space-y-1 text-xs text-stone-400">
                        <li>&bull; 3.5% absorbed into menu prices</li>
                        <li>&bull; Effective processing fee: <span className="font-semibold text-stone-600">0%</span></li>
                        <li>&bull; $7.00 smoothie &rarr; $7.25 &ensp;|&ensp; $9.00 bowl &rarr; $9.32</li>
                      </ul>
                    </div>
                  </button>

                  <button
                    onClick={() => !confirmed && setCdStructure('split-cd')}
                    disabled={confirmed}
                    className={`w-full text-left flex items-start gap-3 p-3.5 rounded-xl border transition-all ${
                      cdStructure === 'split-cd'
                        ? 'border-gp-200 bg-gp-50'
                        : 'border-stone-100 hover:border-stone-200'
                    }`}
                  >
                    <RadioDot active={cdStructure === 'split-cd'} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-stone-700">Split cash discount</p>
                        <span className="text-[9px] font-semibold tracking-wider uppercase text-gp-500 bg-gp-50 border border-gp-100 px-1.5 py-0.5 rounded">
                          Best value
                        </span>
                      </div>
                      <ul className="mt-1.5 space-y-1 text-xs text-stone-400">
                        <li>&bull; 1.75% absorbed into menu prices, 1.75% flat rate</li>
                        <li>&bull; Effective processing fee: <span className="font-semibold text-stone-600">1.75%</span></li>
                        <li>&bull; $7.00 smoothie &rarr; $7.12 &ensp;|&ensp; $9.00 bowl &rarr; $9.16</li>
                        <li>&bull; Minimal menu impact, stays on Free POS qualification</li>
                      </ul>
                    </div>
                  </button>

                  <button
                    onClick={() => !confirmed && setCdStructure('flat-rate')}
                    disabled={confirmed}
                    className={`w-full text-left flex items-start gap-3 p-3.5 rounded-xl border transition-all ${
                      cdStructure === 'flat-rate'
                        ? 'border-gp-200 bg-gp-50'
                        : 'border-stone-100 hover:border-stone-200'
                    }`}
                  >
                    <RadioDot active={cdStructure === 'flat-rate'} />
                    <div>
                      <p className="text-sm font-medium text-stone-700">Flat rate (no menu changes)</p>
                      <ul className="mt-1.5 space-y-1 text-xs text-stone-400">
                        <li>&bull; No menu price adjustments</li>
                        <li>&bull; Effective processing fee: <span className="font-semibold text-stone-600">3.5%</span></li>
                        <li>&bull; Still qualifies for free POS</li>
                        <li>&bull; Best if cash discounting feels like too much change right now</li>
                      </ul>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleSelect('free-pos')}
              disabled={confirmed}
              className={`w-full py-2.5 px-5 rounded-lg text-xs font-medium tracking-wide uppercase transition-all ${
                confirmed && plan === 'free-pos'
                  ? 'bg-gp-50 text-gp-600 border border-gp-200 cursor-default'
                  : 'border border-gp-200 text-gp-500 hover:border-gp-400 hover:text-gp-600'
              }`}
            >
              {confirmed && plan === 'free-pos' ? '\u2713 Selected' : 'Select this option'}
            </button>
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
              <p className="text-xs text-stone-400 mt-1">
                Per business referred as we grow in this market. Both options qualify.
              </p>
            </div>
          </div>
        </div>

        <footer className="text-center mt-20 pb-8 animate-fade-in stagger-4">
          <p className="text-xs text-stone-300">
            Prepared for Roxberry Juice &middot; Global Payments &middot; {new Date().getFullYear()}
          </p>
        </footer>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-stone-900/30 backdrop-blur-sm" onClick={() => { setShowModal(false); setPlan(null) }} />
          <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-8 animate-fade-in-scale">
            <h3 className="text-lg font-semibold text-stone-900 mb-2">Confirm your selection</h3>
            <p className="text-sm text-stone-500 mb-1">
              <span className="font-medium text-stone-700">{planLabel}</span>
            </p>
            {plan === 'free-pos' && (
              <p className="text-sm text-stone-500 mb-6">
                Structure: <span className="font-medium text-stone-700">{cdLabel}</span>
              </p>
            )}
            {plan === 'cost-plus' && <div className="mb-6" />}
            <p className="text-xs text-stone-400 mb-6">
              Not binding. Registers your preference so your rep can prepare next steps.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => { setShowModal(false); setPlan(null) }}
                className="flex-1 py-2.5 px-4 rounded-xl text-sm font-medium border border-stone-200 text-stone-600 hover:bg-stone-50 transition-colors"
              >
                Go back
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 py-2.5 px-4 rounded-xl text-sm font-medium bg-gp-500 text-white hover:bg-gp-600 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
