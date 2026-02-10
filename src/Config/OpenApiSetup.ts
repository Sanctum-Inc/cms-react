// src/api/openApiSetup.ts
import { OpenAPI } from "../api/core/OpenAPI"; // adjust path to your generated folder

OpenAPI.BASE = import.meta.env.VITE_API_URL;
OpenAPI.WITH_CREDENTIALS = true;
