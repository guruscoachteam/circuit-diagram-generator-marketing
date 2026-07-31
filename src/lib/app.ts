/** App deep links — base: https://app.circuitdiagramgenerator.ai */
export const APP_BASE = 'https://app.circuitdiagramgenerator.ai';

export const app = {
  home: `${APP_BASE}/`,
  signup: `${APP_BASE}/signup`,
  signupBilling: `${APP_BASE}/signup?next=/billing`,
  login: `${APP_BASE}/login`,
  loginBilling: `${APP_BASE}/login?next=/billing`,
  billing: `${APP_BASE}/billing`,
  newCircuit: `${APP_BASE}/new`,
  projects: `${APP_BASE}/projects`,
} as const;
