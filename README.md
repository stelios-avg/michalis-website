# Μιχάλης Παρασκευάς - Υποψήφιος Βουλευτής με το ALMA

Ιστοσελίδα προεκλογικής καμπάνιας για τον Μιχάλη Παρασκευά, υποψήφιο βουλευτή Λεμεσού με το κόμμα ALMA.

## Δομή

- **`/`** (`index.html`) – Αρχική με όλες τις ενότητες
- **`/biografiko/`**, **`/epikoinonia/`**, **`/oroi-xrisis/`**, **`/politiki-aporittou/`** – Ξεχωριστές σελίδες (χωρίς `.html` στο URL)
- **styles.css** – Στυλ και εμφάνιση
- **script.js** – Διαδραστικότητα (μενού, smooth scroll)

Οι παλιοί σύνδεσμοι τύπου `/biografiko.html` ανακατευθύνονται (301) προς τις νέες διαδρομές (`vercel.json`, `.htaccess`, `_redirects` για Netlify).

## Ενότητες

1. **Βιογραφικό** – Πληροφορίες για τον υποψήφιο
2. **Θέσεις** – Πολιτικές θέσεις
3. **Πράξεις** – Δράσεις και πρωτοβουλίες
4. **Ενημέρωση** – Νέα και ενημερώσεις
5. **Επικοινωνία** – Στοιχεία επικοινωνίας και social media

## Εκτέλεση

Ανοίξτε το `index.html` στο browser ή χρησιμοποιήστε έναν τοπικό server:

```bash
# Με Python
python -m http.server 8000

# Με Node.js (npx)
npx serve .
```

Μετά επισκεφθείτε: http://localhost:8000

## Βίντεο ενημέρωσης

Στην ενότητα **Ενημέρωση** τα βίντεο είναι ενσωματωμένα **TikTok** (`tiktok.com/embed/v2/…`). Για νέο βίντεο, αντιγράψτε το αριθμητικό ID από το URL του TikTok και ενημερώστε το `src` του iframe στο `index.html`.

## Deploy στο Vercel

1. Συνδέστε το repo στο [vercel.com](https://vercel.com) (Import → GitHub → επιλέξτε το project).
2. **Framework Preset**: Other (ή «Other» / χωρίς build framework). **Build Command**: αφήστε κενό. **Output**: ρίζα project (όπου είναι το `index.html`).
3. Το **`vercel.json`** (προαιρετικά) ορίζει headers για στατικά αρχεία.
4. **Στατικό site**: Δεν χρειάζεται build — το `index.html` και τα assets σερβίρονται ως έχουν.

## Προσαρμογή

- **Περιεχόμενο**: Επεξεργαστείτε το `index.html` για να αλλάξετε κείμενα, ημερομηνίες και προτάσεις
- **Χρώματα**: Τροποποιήστε τις CSS variables στο `styles.css` (π.χ. `--color-primary`, `--color-accent`)
- **Social links**: Αντικαταστήστε τα `#` στα links με τα πραγματικά URLs
