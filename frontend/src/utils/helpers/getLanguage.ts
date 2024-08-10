import { LanguagesEnum } from "../constants/language";

export const getLanguage = (lang: LanguagesEnum) => {
  switch (lang.toLowerCase()) {
    case LanguagesEnum.KANNADA:
      return LanguagesEnum.KANNADA;
    case LanguagesEnum.ENGLISH:
      return LanguagesEnum.ENGLISH;
    default:
      return LanguagesEnum.ENGLISH;
  }
};