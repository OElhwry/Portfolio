import type { StaticImageData } from "next/image";

import aphelionCompleteView from "@/public/images/projects/Aphelion/AphlionExploreViewCOmplete.png";
import aphelionHome from "@/public/images/projects/Aphelion/AphelionHome.png";
import aphelionPlanetInformation from "@/public/images/projects/Aphelion/AphelionPlanetInformationExploreView.png";
import aphelionQuizCorrectAnswer from "@/public/images/projects/Aphelion/AphelionQuizCorrectAnswer.png";
import aphelionQuizOverview from "@/public/images/projects/Aphelion/AphelionQuizOverview.png";
import aphelionSolarSystemView from "@/public/images/projects/Aphelion/AphelionSolarSystemView.png";
import aphelionSunPlanetView from "@/public/images/projects/Aphelion/AphelionSunPlanetViewAndFacts.png";
import peerfitV1Feed from "@/public/images/projects/peerfit-v1/feed.png";
import peerfitV1Interests from "@/public/images/projects/peerfit-v1/interests.png";
import peerfitV1Landing from "@/public/images/projects/peerfit-v1/landing.png";
import peerfitV1Signup from "@/public/images/projects/peerfit-v1/signup.png";
import peerfitV2ActivitiesCalendar from "@/public/images/projects/peerfit-v2/PeerfitActivitiesCalender.png";
import peerfitV2EditProfile from "@/public/images/projects/peerfit-v2/PeerfitEditProfile.png";
import peerfitV2Feed from "@/public/images/projects/peerfit-v2/PeerfitFeed.png";
import peerfitV2FeedCards from "@/public/images/projects/peerfit-v2/PeerfitFeedCards.png";
import peerfitV2FeedFilters from "@/public/images/projects/peerfit-v2/PeerfitFeedFilters2.png";
import peerfitV2FeedNightMode from "@/public/images/projects/peerfit-v2/PeerfitFeedWithNightmode.png";
import peerfitV2FriendsRequests from "@/public/images/projects/peerfit-v2/PeerfitFriendsRequestSection.png";
import peerfitV2Home from "@/public/images/projects/peerfit-v2/peerfithomepage1.png";
import peerfitV2ProfileBadges from "@/public/images/projects/peerfit-v2/PeerfitProfileBadges.png";
import peerfitV2ProfilePage from "@/public/images/projects/peerfit-v2/PeerfitProfilePage.png";
import peerfitV2Settings from "@/public/images/projects/peerfit-v2/PeerfitSettings.png";
import peerfitV2SettingsAlt from "@/public/images/projects/peerfit-v2/PeerfitSettings2.png";
import peerfitV2SignupDob from "@/public/images/projects/peerfit-v2/PeerfitsignupDoB.png";
import peerfitV2SignupEmailVerification from "@/public/images/projects/peerfit-v2/peerfitSignupEmailVerification.png";
import peerfitV2SignupLoginPage from "@/public/images/projects/peerfit-v2/peerfitSignupLoginPage.png";
import peerfitV2SignupSms from "@/public/images/projects/peerfit-v2/PeerfitSignupSms.png";
import peerfitV2SignupTerms from "@/public/images/projects/peerfit-v2/PeerfitSignupTaC.png";

export type Screenshot = {
  src: StaticImageData;
  alt: string;
  caption: string;
};

export const projectPreviews = {
  aphelion: aphelionHome,
  peerfitV1: peerfitV1Landing,
  peerfitV1Signup,
  peerfitV2: peerfitV2Home,
  peerfitV2Profile: peerfitV2ProfilePage,
  peerfitV2Settings,
  peerfitV2Signup: peerfitV2SignupLoginPage,
};

export const peerfitV1Screenshots: Screenshot[] = [
  { src: peerfitV1Landing, alt: "PeerFit v1 - landing", caption: "Landing / Browse" },
  { src: peerfitV1Feed, alt: "PeerFit v1 - feed", caption: "Logged-in Feed" },
  { src: peerfitV1Signup, alt: "PeerFit v1 - signup", caption: "Auth (Signup)" },
  { src: peerfitV1Interests, alt: "PeerFit v1 - interests", caption: "Interests" },
];

export const peerfitV2Screenshots: Screenshot[] = [
  { src: peerfitV2Home, alt: "PeerFit v2 - home", caption: "Home Feed" },
  { src: peerfitV2Feed, alt: "PeerFit v2 - feed", caption: "Activity Feed" },
  { src: peerfitV2FeedCards, alt: "PeerFit v2 - feed cards", caption: "Feed Cards" },
  { src: peerfitV2FeedFilters, alt: "PeerFit v2 - filters", caption: "Filters" },
  { src: peerfitV2FeedNightMode, alt: "PeerFit v2 - night mode", caption: "Night Mode" },
  { src: peerfitV2ActivitiesCalendar, alt: "PeerFit v2 - calendar", caption: "Activities Calendar" },
  { src: peerfitV2FriendsRequests, alt: "PeerFit v2 - friends requests", caption: "Friends Requests" },
  { src: peerfitV2SignupLoginPage, alt: "PeerFit v2 - login", caption: "Login" },
  { src: peerfitV2SignupEmailVerification, alt: "PeerFit v2 - email verification", caption: "Email Verification" },
  { src: peerfitV2SignupDob, alt: "PeerFit v2 - signup details", caption: "Signup Details" },
  { src: peerfitV2SignupSms, alt: "PeerFit v2 - signup sms", caption: "SMS Verification" },
  { src: peerfitV2SignupTerms, alt: "PeerFit v2 - signup terms", caption: "Terms Acceptance" },
  { src: peerfitV2ProfilePage, alt: "PeerFit v2 - profile", caption: "Profile Page" },
  { src: peerfitV2ProfileBadges, alt: "PeerFit v2 - badges", caption: "Profile Badges" },
  { src: peerfitV2EditProfile, alt: "PeerFit v2 - edit profile", caption: "Edit Profile" },
  { src: peerfitV2Settings, alt: "PeerFit v2 - settings", caption: "Settings" },
  { src: peerfitV2SettingsAlt, alt: "PeerFit v2 - settings details", caption: "Settings Details" },
];

export const aphelionScreenshots: Screenshot[] = [
  { src: aphelionHome, alt: "Aphelion - home", caption: "Home" },
  { src: aphelionSolarSystemView, alt: "Aphelion - solar system view", caption: "Solar System View" },
  { src: aphelionSunPlanetView, alt: "Aphelion - sun and planet facts", caption: "Sun and Planet Facts" },
  { src: aphelionPlanetInformation, alt: "Aphelion - planet information", caption: "Planet Information" },
  { src: aphelionCompleteView, alt: "Aphelion - explore view", caption: "Explore View" },
  { src: aphelionQuizOverview, alt: "Aphelion - quiz overview", caption: "Quiz Overview" },
  { src: aphelionQuizCorrectAnswer, alt: "Aphelion - quiz result", caption: "Quiz Feedback" },
];
