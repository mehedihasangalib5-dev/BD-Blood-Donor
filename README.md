# BD-Blood Donor

Two separate web apps on one Firebase project (`bd-blood-donor01`), no build step:

- `user-app/` - donors and recipients (splash, onboarding, login, home, find donor + map, requests, donations, notifications, profile, donor card, camps, blood info).
- `admin-app/` - fully self-contained admin panel with its own login, CSS, JS and assets (dashboard, donors, requests, blood inventory, users, camps, broadcast, settings).

## Run locally
Serve this folder over http (Firebase Auth does not work from file://):

    python3 -m http.server 8000

Then open http://localhost:8000/user-app/ and http://localhost:8000/admin-app/ (or the launcher at http://localhost:8000/).

## One-time Firebase setup
1. Authentication: enable Email/Password and Google. Add `localhost` and any hosting domains under Authorized domains.
2. Firestore: create the database and publish `firestore.rules` (same file in both apps; publish once).
3. First admin: in Firestore > `users` > your document add field `role` = `admin`. After that, admins can promote others in Admin > Users.

## Deploy (two separate sites)
User app (default hosting site):

    cd user-app && firebase login && firebase deploy      # https://bd-blood-donor01.web.app

Admin app (its own site and URL):

    firebase hosting:sites:create bd-blood-donor01-admin
    cd admin-app && firebase deploy --only hosting        # https://bd-blood-donor01-admin.web.app

Then (a) add `bd-blood-donor01-admin.web.app` to Authentication > Authorized domains, (b) set `ADMIN_URL` in `user-app/js/config.js` and `USER_URL` in `admin-app/js/config.js` to the full URLs, and redeploy.

## Profile
Profile is a red header with a menu card (Edit Profile, My Donations, My Requests, Settings, Help & Support, Log Out; Admin Panel for admins). Each item is its own page: `edit-profile.html`, `settings.html`, `help.html`.

## Donor card
Matches the front/back ID design: photo, donor ID (`BD-<year>-<6 chars of your uid>`), blood group, registration date, location, QR code to your donor profile. "Download PNG" renders both sides to one image (needs internet for the html2canvas library); "Print" works from any browser.

## Other notes
- Map and location: Profile > Use my location / Pick on map. Offline caching via service worker on https/localhost.
- Alerts while the app is closed need Firebase Cloud Messaging + a Cloud Function (Blaze plan): not included.
- Admin "Delete profile" removes Firestore data only; remove the sign-in account in Firebase Authentication separately.
