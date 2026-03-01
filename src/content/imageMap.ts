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
