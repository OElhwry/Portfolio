import type { StaticImageData } from "next/image";

// ── Aphelion ──────────────────────────────────────────────────────────────────
import aphelionLanding      from "@/public/images/projects/Aphelion/landingPage.png";
import aphelionQuickGuide   from "@/public/images/projects/Aphelion/quickGuide.png";
import aphelionSolarSystem  from "@/public/images/projects/Aphelion/SolarSystem.png";
import aphelionEarth        from "@/public/images/projects/Aphelion/earth.png";
import aphelionEarthPart2   from "@/public/images/projects/Aphelion/earthPart2.png";
import aphelionEarthFacts2  from "@/public/images/projects/Aphelion/EarthFacts2.png";
import aphelionEarthQuiz    from "@/public/images/projects/Aphelion/EarthQuiz.png";
import aphelionEarthResult  from "@/public/images/projects/Aphelion/EarthQuizResult.png";

// ── Deadcenter ────────────────────────────────────────────────────────────────
import deadcenterLanding        from "@/public/images/projects/deadcenter/landingPage.png";
import deadcenterLevels         from "@/public/images/projects/deadcenter/homescreenLevels.png";
import deadcenterLevelsSelected from "@/public/images/projects/deadcenter/homescreenLevelsSelected.png";
import deadcenterWarmup         from "@/public/images/projects/deadcenter/deadcenterwarmup.png";
import deadcenterLevelDesign    from "@/public/images/projects/deadcenter/levelDesign.png";
import deadcenterResults        from "@/public/images/projects/deadcenter/ResultsScreen.png";
import deadcenterSettings       from "@/public/images/projects/deadcenter/settings.png";

// ── Emplorio ──────────────────────────────────────────────────────────────────
import emplorioSignupLogin  from "@/public/images/projects/emplorio/signup_login.png";
import emplorioVerification from "@/public/images/projects/emplorio/signinverification.png";
import emplorioWelcome1     from "@/public/images/projects/emplorio/weclomePart1.png";
import emplorioWelcome2     from "@/public/images/projects/emplorio/welcomePart2.png";
import emplorioWelcome3     from "@/public/images/projects/emplorio/welcomePart3.png";
import emplorioWelcome4     from "@/public/images/projects/emplorio/welcomePart4.png";
import emplorioWelcome5     from "@/public/images/projects/emplorio/welcomePart5.png";
import emplorioDefaultFill  from "@/public/images/projects/emplorio/defaultfillpage.png";
import emplorioCoverLetter  from "@/public/images/projects/emplorio/coverletter.png";
import emplorioQuestions    from "@/public/images/projects/emplorio/questions.png";
import emplorioHistory      from "@/public/images/projects/emplorio/history.png";
import emplorioProfile      from "@/public/images/projects/emplorio/profile.png";
import emplorioSettings     from "@/public/images/projects/emplorio/settings.png";

// ── PeerFit v1 ────────────────────────────────────────────────────────────────
import peerfitV1Landing  from "@/public/images/projects/peerfit-v1/landing.png";
import peerfitV1Feed     from "@/public/images/projects/peerfit-v1/feed.png";
import peerfitV1Signup   from "@/public/images/projects/peerfit-v1/signup.png";
import peerfitV1Interests from "@/public/images/projects/peerfit-v1/interests.png";

// ── PeerFit v2 ────────────────────────────────────────────────────────────────
import peerfitV2Landing      from "@/public/images/projects/peerfit-v2/landingPage.png";
import peerfitV2Home1        from "@/public/images/projects/peerfit-v2/homePage1.png";
import peerfitV2Home2        from "@/public/images/projects/peerfit-v2/homePage2.png";
import peerfitV2Home3        from "@/public/images/projects/peerfit-v2/homePage3.png";
import peerfitV2Home4        from "@/public/images/projects/peerfit-v2/homePage4.png";
import peerfitV2Home5        from "@/public/images/projects/peerfit-v2/homePage5.png";
import peerfitV2Home6        from "@/public/images/projects/peerfit-v2/homePage6.png";
import peerfitV2Home7        from "@/public/images/projects/peerfit-v2/homePage7.png";
import peerfitV2Feed         from "@/public/images/projects/peerfit-v2/feed.png";
import peerfitV2Activities   from "@/public/images/projects/peerfit-v2/activities.png";
import peerfitV2Friends      from "@/public/images/projects/peerfit-v2/friends.png";
import peerfitV2Notification from "@/public/images/projects/peerfit-v2/notification.png";
import peerfitV2Login        from "@/public/images/projects/peerfit-v2/login.png";
import peerfitV2Signup       from "@/public/images/projects/peerfit-v2/signup.png";
import peerfitV2Signup2      from "@/public/images/projects/peerfit-v2/signup2.png";
import peerfitV2Signup3      from "@/public/images/projects/peerfit-v2/signup3.png";
import peerfitV2Signup4      from "@/public/images/projects/peerfit-v2/signup4.png";
import peerfitV2Signup5      from "@/public/images/projects/peerfit-v2/signup5.png";
import peerfitV2Profile      from "@/public/images/projects/peerfit-v2/profile.png";
import peerfitV2Settings     from "@/public/images/projects/peerfit-v2/settings.png";

// ── SplidIt ───────────────────────────────────────────────────────────────────
import splidItLanding from "@/public/images/projects/Splidit/landingPage.png";
import splidItEqual   from "@/public/images/projects/Splidit/equalPayment.png";
import splidItCustom  from "@/public/images/projects/Splidit/customPayment.png";
import splidItTime    from "@/public/images/projects/Splidit/timePayment.png";
import splidItShare   from "@/public/images/projects/Splidit/timePaymentImageCopiedOption.png";

// ─────────────────────────────────────────────────────────────────────────────

export type Screenshot = {
  src: StaticImageData;
  alt: string;
  caption: string;
};

export const projectPreviews = {
  aphelion:         aphelionLanding,
  deadcenter:       deadcenterLanding,
  splidit:          splidItCustom,
  emplorio:         emplorioDefaultFill,
  peerfitV1:        peerfitV1Landing,
  peerfitV1Signup,
  peerfitV2:        peerfitV2Home1,
  peerfitV2Profile: peerfitV2Profile,
  peerfitV2Settings: peerfitV2Settings,
  peerfitV2Signup:  peerfitV2Login,
};

export const peerfitV1Screenshots: Screenshot[] = [
  { src: peerfitV1Landing,   alt: "PeerFit v1 - landing",   caption: "Landing / Browse" },
  { src: peerfitV1Feed,      alt: "PeerFit v1 - feed",      caption: "Logged-in Feed"   },
  { src: peerfitV1Signup,    alt: "PeerFit v1 - signup",    caption: "Auth (Signup)"    },
  { src: peerfitV1Interests, alt: "PeerFit v1 - interests", caption: "Interests"        },
];

// 0–7: Homepage   8–11: Feed   12–17: Auth   18–19: Profile & Settings
export const peerfitV2Screenshots: Screenshot[] = [
  { src: peerfitV2Landing,      alt: "PeerFit v2 - landing",         caption: "Landing Page"             },
  { src: peerfitV2Home1,        alt: "PeerFit v2 - home",            caption: "Homepage"                 },
  { src: peerfitV2Home2,        alt: "PeerFit v2 - home 2",          caption: "Homepage | Discovery"     },
  { src: peerfitV2Home3,        alt: "PeerFit v2 - home 3",          caption: "Homepage | Community"     },
  { src: peerfitV2Home4,        alt: "PeerFit v2 - home 4",          caption: "Homepage | Features"      },
  { src: peerfitV2Home5,        alt: "PeerFit v2 - home 5",          caption: "Homepage | How It Works"  },
  { src: peerfitV2Home6,        alt: "PeerFit v2 - home 6",          caption: "Homepage | Social"        },
  { src: peerfitV2Home7,        alt: "PeerFit v2 - home 7",          caption: "Homepage | Get Started"   },
  { src: peerfitV2Feed,         alt: "PeerFit v2 - feed",            caption: "Activity Feed"            },
  { src: peerfitV2Activities,   alt: "PeerFit v2 - activities",      caption: "Activities Calendar"      },
  { src: peerfitV2Friends,      alt: "PeerFit v2 - friends",         caption: "Friends"                  },
  { src: peerfitV2Notification, alt: "PeerFit v2 - notifications",   caption: "Notifications"            },
  { src: peerfitV2Login,        alt: "PeerFit v2 - login",           caption: "Login"                    },
  { src: peerfitV2Signup,       alt: "PeerFit v2 - signup",          caption: "Signup"                   },
  { src: peerfitV2Signup2,      alt: "PeerFit v2 - signup step 2",   caption: "Signup | Step 2"          },
  { src: peerfitV2Signup3,      alt: "PeerFit v2 - signup step 3",   caption: "Signup | Step 3"          },
  { src: peerfitV2Signup4,      alt: "PeerFit v2 - signup step 4",   caption: "Signup | Step 4"          },
  { src: peerfitV2Signup5,      alt: "PeerFit v2 - signup step 5",   caption: "Signup | Step 5"          },
  { src: peerfitV2Profile,      alt: "PeerFit v2 - profile",         caption: "Profile Page"             },
  { src: peerfitV2Settings,     alt: "PeerFit v2 - settings",        caption: "Settings"                 },
];

export const deadcenterScreenshots: Screenshot[] = [
  { src: deadcenterLanding,        alt: "Deadcenter - main menu",        caption: "Main Menu"          },
  { src: deadcenterLevels,         alt: "Deadcenter - level select",      caption: "Level Select"       },
  { src: deadcenterLevelsSelected, alt: "Deadcenter - levels selected",   caption: "Levels Selected"    },
  { src: deadcenterWarmup,         alt: "Deadcenter - warmup level",      caption: "Warmup Level"       },
  { src: deadcenterLevelDesign,    alt: "Deadcenter - level design",      caption: "Level Design"       },
  { src: deadcenterResults,        alt: "Deadcenter - results screen",    caption: "Results Screen"     },
  { src: deadcenterSettings,       alt: "Deadcenter - settings",          caption: "Settings"           },
];

export const splidItScreenshots: Screenshot[] = [
  { src: splidItLanding, alt: "SplidIt - home",          caption: "Home"                   },
  { src: splidItEqual,   alt: "SplidIt - equal split",   caption: "Equal Split"            },
  { src: splidItCustom,  alt: "SplidIt - custom split",  caption: "Custom Split"           },
  { src: splidItTime,    alt: "SplidIt - time payment",  caption: "Time-based Payment"     },
  { src: splidItShare,   alt: "SplidIt - share result",  caption: "Share Result"           },
];

export const aphelionScreenshots: Screenshot[] = [
  { src: aphelionLanding,     alt: "Aphelion - landing page",    caption: "Landing Page"      },
  { src: aphelionQuickGuide,  alt: "Aphelion - quick guide",     caption: "Quick Guide"       },
  { src: aphelionSolarSystem, alt: "Aphelion - solar system",    caption: "Solar System View" },
  { src: aphelionEarth,       alt: "Aphelion - earth",           caption: "Planet | Earth"    },
  { src: aphelionEarthPart2,  alt: "Aphelion - earth part 2",    caption: "Earth | Continued" },
  { src: aphelionEarthFacts2, alt: "Aphelion - earth facts",     caption: "Earth Facts"       },
  { src: aphelionEarthQuiz,   alt: "Aphelion - quiz",            caption: "Quiz"              },
  { src: aphelionEarthResult, alt: "Aphelion - quiz result",     caption: "Quiz Result"       },
];

export const emplorioScreenshots: Screenshot[] = [
  { src: emplorioSignupLogin,  alt: "Emplorio - sign in",           caption: "Sign In / Login"       },
  { src: emplorioVerification, alt: "Emplorio - verification",      caption: "Email Verification"    },
  { src: emplorioWelcome1,     alt: "Emplorio - welcome step 1",    caption: "Welcome | Setup"       },
  { src: emplorioWelcome2,     alt: "Emplorio - welcome step 2",    caption: "Welcome | Step 2"      },
  { src: emplorioWelcome3,     alt: "Emplorio - welcome step 3",    caption: "Welcome | Step 3"      },
  { src: emplorioWelcome4,     alt: "Emplorio - welcome step 4",    caption: "Welcome | Step 4"      },
  { src: emplorioWelcome5,     alt: "Emplorio - welcome step 5",    caption: "Welcome | Step 5"      },
  { src: emplorioDefaultFill,  alt: "Emplorio - auto fill",         caption: "Auto Fill in Action"   },
  { src: emplorioCoverLetter,  alt: "Emplorio - cover letter",      caption: "AI Cover Letter"       },
  { src: emplorioQuestions,    alt: "Emplorio - question answers",  caption: "Question Answers"      },
  { src: emplorioHistory,      alt: "Emplorio - application history", caption: "Application History" },
  { src: emplorioProfile,      alt: "Emplorio - profile",           caption: "Profile"               },
  { src: emplorioSettings,     alt: "Emplorio - settings",          caption: "Settings"              },
];
