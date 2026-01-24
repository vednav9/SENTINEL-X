variable "project_id" {
  description = "Google Cloud Project ID"
  type        = string
}

variable "region" {
  description = "Google Cloud region for resources"
  type        = string
  default     = "us-central1"
}

variable "google_api_key" {
  description = "Google API Key for Gemini API"
  type        = string
  sensitive   = true
}

variable "backend_image" {
  description = "Docker image URL for backend service"
  type        = string
  default     = "us-central1-docker.pkg.dev/PROJECT_ID/sentinel-x/backend:latest"
}

variable "frontend_image" {
  description = "Docker image URL for frontend service"
  type        = string
  default     = "us-central1-docker.pkg.dev/PROJECT_ID/sentinel-x/frontend:latest"
}
