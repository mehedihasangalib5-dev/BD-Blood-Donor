# BD-Blood Donor

Two separate web apps on one Firebase project (`bd-blood-donor01`), no build step:

- `user-app/` - donors and recipients (splash, onboarding, login, home, find donor + map, requests, donations, notifications, profile, donor card, camps, blood info).
- `admin-app/` - fully self-contained admin panel with its own login, CSS, JS and assets (dashboard, donors, requests, blood inventory, users, camps, broadcast, settings).

## Run locally
Serve this folder over http (Firebase Auth does not work from file://):

    python3 -m http.server 8000

Then open http://localhost:8000/ - it goes straight to the main app. There is no admin button for regular users: people with the `admin` role see an **Admin Panel** item in their sidebar and Profile menu, which opens `admin-app/` (the sign-in carries over when both are on the same site). Admins can also open `admin-app/login.html` directly.

## One-time Firebase setup
1. Authentication: enable Email/Password and Google. Add `localhost` and any hosting domains under Authorized domains.
2. Firestore: create the database and publish `firestore.rules` (same file in both apps; publish once).
3. First admin: in Firestore > `users` > your document add field `role` = `admin`. After that, admins can promote others in Admin > Users.

## Deploy (one command, works on every device)
From this folder:

    firebase login
    firebase deploy        # hosting + Firestore rules -> https://bd-blood-donor01.web.app

The main app is at `/` (redirects to `/user-app/`) and the admin panel at `/admin-app/` on the same site, so the Admin Panel links work everywhere and the sign-in is shared.
Admin access is stored in Firestore (`users/{uid}.role = admin`), not on a device: signing in with that account on any phone, tablet or computer shows the Admin Panel item (sidebar on tablet/desktop; Home tile and Profile menu on mobile).

Optional: deploy the admin app as its own site (`firebase hosting:sites:create bd-blood-donor01-admin`, then `cd admin-app && firebase deploy --only hosting`), add that domain to Authentication > Authorized domains and set the full URLs in `user-app/js/config.js` and `admin-app/js/config.js`.

## Onboarding art
The three onboarding illustrations are vector SVGs (`user-app/assets/onboarding-1.svg` to `-3.svg`) that open and edit in Adobe Illustrator, Figma or Inkscape.

## Donor card
Matches the front/back ID design: photo, donor ID (`BD-<year>-<6 chars of your uid>`), blood group, registration date, location, QR code to your donor profile. "Download PNG" renders both sides to one image (needs internet for the html2canvas library); "Print" works from any browser.

## Other notes
- Map and location: Profile > Use my location / Pick on map. Offline caching via service worker on https/localhost.
- Alerts while the app is closed need Firebase Cloud Messaging + a Cloud Function (Blaze plan): not included.
- Admin "Delete profile" removes Firestore data only; remove the sign-in account in Firebase Authentication separately.
