import { baseConfig } from "@trady-perch/config/eslint";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [...baseConfig, ...nextCoreWebVitals, ...nextTypescript];

export default eslintConfig;
