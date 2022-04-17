declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API: string;
      NEXT_PUBLIC_STRAPI_API: string;
      NEXT_PUBLIC_EMAIL_LINK: string;
      NEXT_PUBLIC_GITHUB_PROFILE: string;
      NEXT_PUBLIC_STACKOVERFLOW_PROFILE: string;
      NEXT_PUBLIC_LINKEDIN_PROFILE: string;
      EMAIL_HOST: string;
      EMAIL_PORT: string;
      EMAIL_USER: string | undefined;
      EMAIL_PASSWORD: string | undefined;
      EMAIL_DESTINATION: string;
    }
  }
}

export {};
