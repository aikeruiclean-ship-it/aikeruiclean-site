import { MapPin, Phone, Mail, Truck } from "@/lib/icons";
import { DUBAI } from "@/i18n/home";
import type { HomeDict } from "@/i18n/home";

// Dubai (UAE) warehouse presence block (for credibility).
// Shows partner company + office address only — contact routes to OUR team.
const OUR_EMAIL = "info@aikeruiclean.com";
const OUR_WHATSAPP = "8619965236428";

export function DubaiWarehouse({ dict }: { dict: HomeDict["dubai"] }) {
  return (
    <section className="py-14 bg-gradient-to-r from-primary to-primary-light text-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/90 text-white text-sm font-semibold rounded-full mb-4">
            <Truck size={14} /> {dict.title}
          </span>
          <p className="text-gray-200 max-w-2xl mx-auto">{dict.sub}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Partner & office address (credibility only — no direct contact) */}
          <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/15">
            <p className="text-xs uppercase tracking-wider text-gray-300 mb-1">{dict.partner}</p>
            <p className="font-bold text-lg mb-4">{DUBAI.company}</p>

            <div className="flex items-start gap-3 text-sm">
              <MapPin size={16} className="text-accent shrink-0 mt-0.5" />
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-300 mb-0.5">{dict.address}</p>
                <p className="text-gray-100 leading-relaxed">{DUBAI.address}</p>
              </div>
            </div>
          </div>

          {/* Contact routes to OUR team */}
          <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/15 flex flex-col justify-between">
            <div>
              <div className="flex items-start gap-3 text-sm mb-4">
                <Mail size={16} className="text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-300 mb-0.5">{dict.contact}</p>
                  <a href={`mailto:${OUR_EMAIL}`} className="text-gray-100 hover:text-accent break-all">
                    {OUR_EMAIL}
                  </a>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{dict.note}</p>
            </div>
            <a
              href={`https://api.whatsapp.com/send?phone=${OUR_WHATSAPP}&text=Hi%2C%20I%27m%20interested%20in%20floor%20scrubber%20pricing%20(Middle%20East).`}
              className="mt-5 inline-flex items-center justify-center gap-2 px-5 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg transition-colors"
            >
              <Phone size={16} /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
