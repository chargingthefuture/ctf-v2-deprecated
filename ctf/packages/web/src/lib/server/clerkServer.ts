export const getClerkServerModule = async (_request?: Request) => {
  return import("@clerk/nextjs/server");
};
