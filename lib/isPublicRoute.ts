// lib/utils/isPublicRoute.ts
export const isPublicRoute = (pathname: string): boolean => {
  const publicRoutes = ["/", "/login", "/register"];
  return publicRoutes.includes(pathname);
};
