export const getMainProjects = async () => {
  const response = await fetch("/api/project", { method: "GET" });
  return await response.json();
};
