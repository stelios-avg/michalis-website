# Μιχάλης Παρασκευάς - Υποψήφιος Βουλευτής με το ALMA

Ιστοσελίδα προεκλογικής καμπάνιας για τον Μιχάλη Παρασκευά, υποψήφιο βουλευτή Λεμεσού με το κόμμα ALMA.

## Δομή

- **index.html** – Κύριο σελίδα με όλες τις ενότητες
- **styles.css** – Στυλ και εμφάνιση
- **script.js** – Διαδραστικότητα (μενού, smooth scroll)

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

## Βίντεο ενημέρωσης (μεγάλο αρχείο)

Το `assets/enimerosi-paraskevas-1.mp4` **δεν ανεβαίνει στο GitHub** (όριο ~100MB ανά αρχείο). **Στο live site το πρώτο βίντεο δεν θα παίζει** αν δεν ανεβάσετε χειροκίνητα αυτό το αρχείο στο hosting, στον ίδιο δρόμο: `assets/enimerosi-paraskevas-1.mp4` (δίπλα στα υπόλοιπα assets).

Εναλλακτικά: συμπίεση του mp4 κάτω από ~95MB και commit χωρίς gitignore, ή αντικατάσταση του `src` στο `<video>` με URL από YouTube/Vimeo/Cloudinary.

### Ανέβασα το mp4 αλλά δεν παίζει στο site

1. **Διαδρομή**: Το αρχείο πρέπει να είναι ακριβώς `assets/enimerosi-paraskevas-1.mp4` (ίδιο όνομα, **μικρά γράμματα** σε Linux servers).
2. **Έλεγχος URL**: Ανοίξτε στον browser `https://το-domain-σας/assets/enimerosi-paraskevas-1.mp4` — αν δεν κατεβαίνει/δεν παίζει, το αρχείο δεν είναι στο σωστό μέρος ή λείπει.
3. **MIME (Apache)**: Ανεβάστε και το **`.htaccess`** από το repo (ρίχνει το σωστό `video/mp4`).
4. **Netlify**: Χρησιμοποιείται το **`_headers`** από το repo.
5. **Vercel**: Χρησιμοποιείται το **`vercel.json`** (headers για `video/mp4`). Δείτε παρακάτω.
6. **Πολύ μεγάλο αρχείο**: Αν χρειάζεται πολύ χρόνο να ξεκινήσει, κάντε re-encode με **fast start** (π.χ. `ffmpeg -i input.mp4 -c copy -movflags +faststart output.mp4`).

## Deploy στο Vercel

1. Συνδέστε το repo στο [vercel.com](https://vercel.com) (Import → GitHub → επιλέξτε το project).
2. **Framework Preset**: Other (ή «Other» / χωρίς build framework). **Build Command**: αφήστε κενό. **Output**: ρίζα project (όπου είναι το `index.html`).
3. Το **`vercel.json`** ορίζει σωστά headers για τα `.mp4` κάτω από `/assets/`.
4. **Μεγάλο βίντεο**: Αν το mp4 **δεν** είναι στο Git (λόγω `.gitignore`), το deploy από το Git **δεν** θα το περιλαμβάνει — είτε μειώστε το αρχείο (< ~95MB) και κάντε commit, είτε ανεβάστε το σε **Vercel Blob** / CDN και αλλάξτε το `src` στο `<video>`, είτε χρησιμοποιήστε embed από YouTube/Vimeo.

## Προσαρμογή

- **Περιεχόμενο**: Επεξεργαστείτε το `index.html` για να αλλάξετε κείμενα, ημερομηνίες και προτάσεις
- **Χρώματα**: Τροποποιήστε τις CSS variables στο `styles.css` (π.χ. `--color-primary`, `--color-accent`)
- **Social links**: Αντικαταστήστε τα `#` στα links με τα πραγματικά URLs
