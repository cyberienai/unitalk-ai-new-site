'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const offers = [
  { id: 1, label: 'Offre Starter', price: '€99', description: 'Parfait pour débuter' },
  { id: 2, label: 'Offre Pro', price: '€299', description: 'Pour les entreprises' },
  { id: 3, label: 'Offre Entreprise', price: 'Personnalisé', description: 'Solutions sur mesure' },
]

export function LeftColumn() {
  const [selectedOffer, setSelectedOffer] = useState(1)

  return (
    <motion.div
      className="flex flex-col gap-8"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      {/* Hero Message */}
      <div className="space-y-4">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-foreground leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Transformez vos <span className="text-accent">entretiens</span>
        </motion.h1>
        <motion.p
          className="text-lg text-muted-foreground leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Avec la puissance de l&apos;IA générative, menez des entretiens plus efficaces et trouvez les meilleurs talents en moins de temps.
        </motion.p>
      </div>

      {/* Domain Input */}
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <label className="text-sm font-medium text-muted-foreground">Votre domaine</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="example.com"
            className="flex-1 px-4 py-2 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button className="px-4 py-2 rounded-lg bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors">
            Vérifier
          </button>
        </div>
      </motion.div>

      {/* Offers */}
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Offres disponibles</p>
        <div className="space-y-2">
          {offers.map((offer, index) => (
            <motion.button
              key={offer.id}
              onClick={() => setSelectedOffer(offer.id)}
              className={`w-full p-3 rounded-lg border transition-all text-left ${
                selectedOffer === offer.id
                  ? 'bg-accent/20 border-accent text-foreground'
                  : 'bg-card border-border hover:border-accent/50'
              }`}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <div className="font-medium">{offer.label}</div>
              <div className="text-xs text-muted-foreground">{offer.price}</div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
