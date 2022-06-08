export const backendURL =
  process.env.NODE_ENV === "production"
    ? "https://study-frontend-lj.herokuapp.com/"
    : "http://localhost:4000/";

export const frontendURL: string =
  process.env.NODE_ENV === "production"
    ? "https://studyapp-lj.netlify.app/"
    : "http://localhost:3000/";
