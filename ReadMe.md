# FitSpot

FitSpot is a cross-platform fitness class scheduling and management app built with React Native and Expo. It allows users to sign up as trainees or trainers, view and manage fitness classes, and keep track of their schedules.

## Features

### For Trainees (Regular Users)
- **Sign Up & Login:** Register or log in as a trainee.
- **Dashboard:** View upcoming classes you are enrolled in.
- **Schedule:** Browse all available classes in a calendar view. Register for classes, cancel your registration, or join the waiting list if a class is full.
- **Profile:** Manage your user profile.

### For Trainers
- **Sign Up & Login:** Register or log in as a trainer.
- **Trainer Dashboard:** 
  - View a calendar of all scheduled classes.
  - Add new classes with details such as name, date, time, and participant limits.
- **Class Management:** Set minimum and maximum participants, and manage class rosters.

## Main Screens

- **Auth Screens:** Login and Signup for both trainees and trainers.
- **Dashboard:** 
  - Trainees see their upcoming classes.
  - Trainers see a schedule and can add new classes.
- **Schedule:** Calendar view of all classes, filterable by date.
- **Profile:** User profile management.

## Tech Stack

- **React Native** (with Expo)
- **Firebase** (authentication and data storage)
- **React Navigation** (navigation and tab management)
- **Zustand** (state management)
- **React Query** (data fetching and caching)
- **UI Libraries:** React Native Paper, React Native Vector Icons, and others

## Project Structure

```
FitSpot/
  ├── App.tsx                # App entry point, navigation, and theme setup
  ├── app.json               # Expo configuration
  ├── src/
  │   ├── components/        # Reusable UI components (forms, class items, etc.)
  │   ├── screens/           # App screens (auth, dashboard, schedule, profile)
  │   ├── navigation/        # Navigation setup
  │   ├── services/          # Firebase config, API services, styles
  │   └── stores/            # Zustand stores for user and class state
  └── assets/                # Images, fonts, and icons
```

## How to Run

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the Expo development server:**
   ```bash
   npm start
   ```
3. **Run on your device:**
   - Use the Expo Go app on your phone, or
   - Run on an emulator with `npm run android` or `npm run ios`

## Customization

- **Firebase:** Update `src/services/firebase-config.ts` with your own Firebase project credentials.
- **Assets:** Replace images and icons in the `assets/` folder as needed.

## License

This project is for educational purposes.
