declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
    }
  }
  interface Window {
    cloudinary: {
      createUploadWidget: (
        options: {
          cloudName: string;
          uploadPreset?: string;
          folder?: string;
          resourceType?: "auto" | "image" | "video" | "raw" = "auto";
          multiple?: boolean;
        },
        cb: (error: any, result: any) => void
      ) => { open: () => void };
    };
  }
}

export {};
