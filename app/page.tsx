'use client'

import { useState, useEffect, useCallback } from 'react'

type PlanSelection = 'cost-plus' | 'free-pos' | null
type CdStructure = 'menu-absorb' | 'split-cd' | 'flat-rate'

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

  const cdLabel = cdStructure === 'menu-absorb'
    ? 'Menu Price Absorption (0% effective fee)'
    : cdStructure === 'split-cd'
    ? 'Split Cash Discount (1.75% menu / 1.75% flat rate)'
    : 'Full Flat Rate (3.5%)'

  return (
    <main className="min-h-screen px-4 py-12 sm:py-20">
      <div className="max-w-5xl mx-auto">

        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900 mb-3">
            Proposal &ndash; Roxberry Juice
          </h1>
          <p className="text-stone-400 text-sm">
            23 Locations &middot; ~$18M Annual Revenue &middot; Prepared by Global Payments
          </p>
        </header>

        <div className="max-w-2xl mx-auto mb-14 animate-fade-in text-center">
          <p className="text-sm text-stone-500 leading-relaxed">
            We&rsquo;ve structured two paths based on our conversations and what we understand about where Roxberry is today. Both deliver the full Genius POS suite (countertop terminals, handhelds, kiosks for locations that want them, and the reporting and integration improvements we discussed). The difference is in how we get there financially. Select whichever option you&rsquo;d like to move forward with, and we&rsquo;ll be in touch to finalize the details.
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
              <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-stone-400">
                Option A
              </span>
              <h2 className="text-xl font-semibold text-stone-900 mt-1">
                Cost + Interchange
              </h2>
              <p className="text-sm text-stone-400 mt-1">Flagship Partnership Match</p>
            </div>

            <p className="text-sm text-stone-500 leading-relaxed mb-6">
              This path is designed for operators who prefer to keep their processing model straightforward: you pay the actual cost of interchange plus a small margin, and your equipment and software run on a flat monthly rate. No surcharging, no menu restructuring, and no changes to how your customers experience pricing at the register.
            </p>

            <div className="space-y-5 mb-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-stone-400 mb-2">Processing</p>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Your processing rates are matched to where you are today. As both the processor and the technology provider, we have the flexibility to set these directly rather than going through a third party, which is how we&rsquo;re able to meet your current pricing without compromise.
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-stone-400 mb-2">Equipment &amp; Software</p>
                <p className="text-2xl font-semibold text-stone-900">$125<span className="text-sm font-normal text-stone-400">/mo per location</span></p>
                <p className="text-sm text-stone-500 leading-relaxed mt-2">
                  This is a specially approved rate. We&rsquo;re bringing this number down significantly because we see Roxberry as a flagship partnership for Genius in the juice and QSR space. The standard rate is considerably higher; this pricing reflects the strategic value of the relationship, not just the transaction volume.
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-stone-400 mb-3">Included at every location</p>
                <ul className="space-y-2.5">
                  {['Countertop terminal', 'Handheld device(s)', 'Kiosk for locations that want one', 'Enhanced reporting & integrations'].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-stone-600">
                      <CheckIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-stone-100">
                <p className="text-xs font-medium uppercase tracking-wider text-stone-400 mb-2">Installation</p>
                <p className="text-sm text-stone-500 leading-relaxed">
                  Roughly $1,000 per location, handled end-to-end by our POS Specialists. This covers on-site setup, configuration, and training. The rate is aggressively prorated for this partnership; it&rsquo;s a cost we can&rsquo;t fully absorb on cost-plus, but we&rsquo;ve brought it as low as we can.
                </p>
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
              <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-stone-400">
                Option B
              </span>
              <h2 className="text-xl font-semibold text-stone-900 mt-1">
                Free POS Program
              </h2>
              <p className="text-sm text-stone-400 mt-1">Revenue-qualified, zero hardware cost</p>
            </div>

            <p className="text-sm text-stone-500 leading-relaxed mb-6">
              At ~$18M in annual revenue, Roxberry qualifies for our Free POS Program outright. The concept is simple: instead of paying separately for equipment, software, installation, and support, everything rolls into a single flat processing rate of 3.5%. There are no separate line items and nothing to finance. The equipment is yours, fully supported, at no additional cost. The tradeoff is in how you structure that 3.5% rate, and you have options.
            </p>

            <div className="space-y-5 mb-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-stone-400 mb-3">Everything included, free</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    ['Equipment', 'All hardware'],
                    ['Software', 'Full suite'],
                    ['POS Support', 'Specialist team'],
                    ['Installation', 'All locations'],
                  ].map(([label]) => (
                    <div key={label} className="bg-gp-50 rounded-lg p-3">
                      <p className="text-lg font-semibold text-stone-900">$0</p>
                      <p className="text-xs text-stone-500">{label}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-stone-400 mt-3 leading-relaxed">
                  This includes countertop terminals, handhelds, kiosks where desired, full software licensing, on-site installation by POS Specialists, and ongoing support. No install fees, no monthly equipment charges, no separate software subscriptions.
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-stone-400 mb-2">How the 3.5% works</p>
                <p className="text-sm text-stone-500 leading-relaxed mb-4">
                  The flat 3.5% rate is the single cost that covers everything. How that rate flows through your business is up to you. There are three ways to structure it, each with different implications for your menu pricing and your effective processing cost. Choose the structure that fits best:
                </p>
                <div className="space-y-2">
                  <button
                    onClick={() => !confirmed && setCdStructure('menu-absorb')}
                    disabled={confirmed}
                    className={`w-full text-left flex items-start gap-3 p-3.5 rounded-xl border transition-all ${
                      cdStructure === 'menu-absorb'
                        ? 'border-gp-200 bg-gp-50'
                        : 'border-stone-100 hover:border-stone-200'
                    }`}
                  >
                    <RadioDot active={cdStructure === 'menu-absorb'} />
                    <div>
                      <p className="text-sm font-medium text-stone-700">Menu price absorption</p>
                      <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                        The full 3.5% is built into your menu prices, so your effective processing fee becomes 0%. Customers see slightly higher menu prices (roughly 3.5% across the board) but never encounter a surcharge or line-item fee. Clean from an operational standpoint, though it does mean a more noticeable menu price adjustment.
                      </p>
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
                      <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                        Half the rate (1.75%) is absorbed into menu prices, and the remaining 1.75% is your effective flat-rate processing fee. This is the balance point: the menu price increase is modest enough that most customers won&rsquo;t notice, your effective processing cost drops well below 2%, and you stay fully qualified for the Free POS Program. It&rsquo;s the approach we&rsquo;d recommend.
                      </p>
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
                      <p className="text-sm font-medium text-stone-700">Full flat rate</p>
                      <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                        No menu price changes at all. Roxberry simply pays 3.5% as a flat processing fee. This is the most straightforward option and still includes everything at zero equipment cost; the tradeoff is that 3.5% is your full effective rate rather than splitting it. Best for operators who want to avoid any menu adjustments entirely.
                      </p>
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

        <div className="max-w-2xl mx-auto space-y-6 animate-fade-in stagger-3">
          <div className="flex items-start gap-4 bg-white rounded-2xl border border-stone-200 p-6">
            <div className="w-10 h-10 rounded-full bg-gp-50 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-gp-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-stone-700">$1,000 Referral Bonus</p>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                As we grow into this vertical, any business you refer to us earns Roxberry a $1,000 bonus per referral. We see this partnership as the beginning of something broader, and that referral structure is our way of making sure it&rsquo;s mutually valuable as we scale.
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
                Fee structure: <span className="font-medium text-stone-700">{cdLabel}</span>
              </p>
            )}
            {plan === 'cost-plus' && <div className="mb-6" />}
            <p className="text-xs text-stone-400 mb-6">
              This registers your preferred option with our team. Nothing is binding at this stage; your Global Payments rep will follow up to walk through the details and next steps.
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
                Confirm selection
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
