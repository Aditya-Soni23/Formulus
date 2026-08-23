# Formulus

Formulus is a mobile-first, active-recall formula revision app for JEE preparation. The flow is deliberately simple: **hint → recall → tap to reveal → rate → next**.

## Run locally

Serve this folder with any static web server (for example, VS Code Live Server or `npx serve`). Do not open `index.html` directly: Firebase Authentication requires an allowed HTTP(S) origin.

## Firebase setup

The Firebase project configuration is in `firebase/config.js`. In the Firebase console:

1. Enable **Google** under Authentication → Sign-in method.
2. Add your local and production domains under Authentication → Settings → Authorized domains.
3. Create the Realtime Database if it is not already enabled.
4. Paste/deploy [database.rules.json](database.rules.json) as its Realtime Database rules.

`adityasonihyderabad@gmail.com` is the owner account. From Admin → **Admin access**, the owner can grant or revoke other admins. Additional admins can manage formulas but cannot change admin access. A person must sign in once before their email can be granted access, which lets the app securely associate the email with their Firebase account ID.

## Data layout

- `/formulas/{subject}/{chapterKey}/{formulaId}`: shared formula sets
- `/users/{uid}`: minimal account profile
- `/admins/{uid}`: owner-managed list of additional formula administrators
- `/userProgress/{uid}/{formulaId}`: personal status and attempts
- `/userStats/{uid}`: maintained revision counts and streak

The importer retains the human-readable `chapter` on every formula. It turns Firebase-invalid chapter key characters into `_` only for the path.

## Importing a chapter

Sign in as the admin and use Admin → Formula management. Select a subject, enter the chapter name, and paste a JSON array such as:

```json
[{"title":"General Form","hint":"General first-order differential equation","formula":"F(x,y,y')=0","conditions":""}]
```

Validation happens before import; an existing chapter offers explicit **Add** or **Replace** choices. Formula LaTeX is rendered with KaTeX in revision and editor preview.

## Deployment and PWA path

Deploy as a static site (Firebase Hosting, Netlify, GitHub Pages, etc.). Add its domain to Firebase Auth. The application has relative module and asset paths; a manifest and service worker can be added later without restructuring.

## Notes

- Place the supplied logo at `assets/logo.png`; the UI shows a compact text mark if it is absent.
- Analytics is initialized when the browser supports it. Add selected `logEvent` calls if you want product-event reporting.
