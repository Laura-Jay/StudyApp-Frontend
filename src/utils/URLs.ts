export const backendURL =
  process.env.NODE_ENV === "production"
    ? "https://study-resources-c4c2.herokuapp.com/"
    : "http://localhost:4004/";

export const frontendURL: string =
  process.env.NODE_ENV === "production"
    ? "https://academy-study-resources.netlify.app/"
    : "http://localhost:44665/";
