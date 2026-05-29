import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      
      <main className="flex-grow container mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-heading mb-4">Transparent Pricing</h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">No hidden fees. Know exactly what you pay.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Fee Breakdown */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm ring-1 ring-surface">
              <h2 className="text-xl font-bold text-heading mb-6 flex items-center gap-2">
                <span className="text-primary text-2xl">📊</span> Platform Fee Breakdown
              </h2>
              
              <div className="space-y-6">
                <div className="p-4 bg-surface/30 rounded-xl border border-surface">
                  <h3 className="font-bold text-heading mb-2">Lesson Pricing</h3>
                  <ul className="text-sm text-muted space-y-1">
                    <li>• Tutor sets their own hourly rate</li>
                    <li>• typically £15 - £60 per hour</li>
                    <li>• You pay what the tutor charges</li>
                  </ul>
                </div>

                <div className="p-4 bg-surface/30 rounded-xl border border-surface">
                  <h3 className="font-bold text-heading mb-2">Platform Service Fee (15%)</h3>
                  <ul className="text-sm text-muted space-y-1">
                    <li>• Included in the total lesson price</li>
                    <li>• Covers: Payment processing, Customer support</li>
                    <li>• Platform maintenance & Security features</li>
                  </ul>
                </div>

                <div className="bg-teal/5 p-4 rounded-xl border border-teal/20 flex items-start gap-3">
                  <span className="text-teal text-xl">✅</span>
                  <div>
                    <h3 className="font-bold text-heading text-sm">No Interest Policy</h3>
                    <p className="text-xs text-muted leading-relaxed">
                      We never charge interest on payments. All transactions are processed securely via Stripe.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Example Calculation */}
          <div className="bg-primary text-white p-8 rounded-2xl shadow-lg ring-1 ring-primary/20">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="text-2xl">🧮</span> Example Calculation
            </h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between py-3 border-b border-white/10">
                <span>Tutor rate (per hour)</span>
                <span className="font-bold">£40.00</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/10">
                <span>Platform fee (15%)</span>
                <span className="font-bold">£6.00</span>
              </div>
              <div className="flex justify-between py-4 text-xl font-extrabold text-gold">
                <span>Total paid by student</span>
                <span>£46.00</span>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-6 mb-8">
              <h3 className="font-bold mb-2 text-sm text-gold">How it's split:</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Tutor receives</span>
                  <span className="font-bold">£40.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Aspire Academic receives</span>
                  <span className="font-bold">£6.00</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-white/60 leading-relaxed italic">
              Note: The total price you see on the tutor's profile is the final amount you will pay. We include the platform fee in the display price for full transparency.
            </p>
          </div>
        </div>

        <div className="mt-20 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-surface">
          <table className="w-full text-left">
            <thead className="bg-surface/50">
              <tr>
                <th className="px-6 py-4 text-sm font-bold text-heading uppercase tracking-wider">Item</th>
                <th className="px-6 py-4 text-sm font-bold text-heading uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-sm font-bold text-heading uppercase tracking-wider">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface">
              {[
                { item: "Tutor Hourly Rate", amount: "£15 - £100", notes: "Set by tutor" },
                { item: "Platform Fee", amount: "15%", notes: "Of lesson price" },
                { item: "Payment Processing", amount: "Included", notes: "Via Stripe" },
                { item: "Trial Lessons (10m)", amount: "FREE", notes: "At tutor's discretion" }
              ].map((row, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 text-sm font-medium text-heading">{row.item}</td>
                  <td className="px-6 py-4 text-sm text-muted font-bold">{row.amount}</td>
                  <td className="px-6 py-4 text-sm text-muted">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <Footer />
    </div>
  );
}
