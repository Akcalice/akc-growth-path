import booksHero from "@/assets/books-hero.jpg";
import booksStudy from "@/assets/books-study.jpg";
import coachingSession from "@/assets/coaching-session.jpg";
import communitySunset from "@/assets/community-sunset.jpg";
import consultantPortrait from "@/assets/consultant-portrait.jpg";
import familySupport from "@/assets/family-support.jpg";
import illusCoaching from "@/assets/illus-coaching.jpg";
import illusEducation from "@/assets/illus-education.jpg";
import illusGrowth from "@/assets/illus-growth.jpg";
import illusInsertion from "@/assets/illus-insertion.jpg";
import illusWellbeing from "@/assets/illus-wellbeing.jpg";

const counselingEducationPhoto =
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80";
const orientationCareerPhoto =
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80";

export const imageMap = {
  booksHero,
  booksStudy,
  coachingSession,
  communitySunset,
  consultantPortrait,
  familySupport,
  illusCoaching,
  illusEducation,
  illusGrowth,
  illusInsertion,
  illusWellbeing,
  counselingEducationPhoto,
  orientationCareerPhoto,
} as const;

export type ImageKey = keyof typeof imageMap;

export const resolveImageSrc = (keyOrPath: string | undefined, fallback: string) => {
  if (!keyOrPath) {
    return fallback;
  }
  if (keyOrPath in imageMap) {
    return imageMap[keyOrPath as ImageKey];
  }
  return keyOrPath;
};
