terraform {
  required_version = ">= 1.0"
  
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

# Enable required Google Cloud APIs
resource "google_project_service" "vertex_ai" {
  service            = "aiplatform.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "cloud_run" {
  service            = "run.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "bigquery" {
  service            = "bigquery.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "artifact_registry" {
  service            = "artifactregistry.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "cloud_build" {
  service            = "cloudbuild.googleapis.com"
  disable_on_destroy = false
}

# Artifact Registry for Docker images
resource "google_artifact_registry_repository" "sentinel_repo" {
  location      = var.region
  repository_id = "sentinel-x"
  description   = "Docker repository for SENTINEL-X containers"
  format        = "DOCKER"

  depends_on = [google_project_service.artifact_registry]
}

# Cloud Run service for Backend
resource "google_cloud_run_v2_service" "backend" {
  name     = "sentinel-backend"
  location = var.region

  template {
    containers {
      image = var.backend_image

      ports {
        container_port = 8080
      }

      env {
        name  = "GOOGLE_CLOUD_PROJECT"
        value = var.project_id
      }

      env {
        name = "GOOGLE_API_KEY"
        value_source {
          secret_key_ref {
            secret  = google_secret_manager_secret.google_api_key.secret_id
            version = "latest"
          }
        }
      }

      resources {
        limits = {
          cpu    = "2"
          memory = "2Gi"
        }
      }
    }

    scaling {
      min_instance_count = 0
      max_instance_count = 10
    }
  }

  traffic {
    type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
    percent = 100
  }

  depends_on = [
    google_project_service.cloud_run,
    google_project_service.vertex_ai
  ]
}

# Cloud Run service for Frontend
resource "google_cloud_run_v2_service" "frontend" {
  name     = "sentinel-frontend"
  location = var.region

  template {
    containers {
      image = var.frontend_image

      ports {
        container_port = 3000
      }

      env {
        name  = "NEXT_PUBLIC_API_URL"
        value = google_cloud_run_v2_service.backend.uri
      }

      env {
        name  = "NODE_ENV"
        value = "production"
      }

      resources {
        limits = {
          cpu    = "1"
          memory = "512Mi"
        }
      }
    }

    scaling {
      min_instance_count = 0
      max_instance_count = 5
    }
  }

  traffic {
    type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
    percent = 100
  }

  depends_on = [
    google_project_service.cloud_run,
    google_cloud_run_v2_service.backend
  ]
}

# IAM policy to allow unauthenticated access (adjust as needed)
resource "google_cloud_run_v2_service_iam_member" "backend_public" {
  name     = google_cloud_run_v2_service.backend.name
  location = google_cloud_run_v2_service.backend.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}

resource "google_cloud_run_v2_service_iam_member" "frontend_public" {
  name     = google_cloud_run_v2_service.frontend.name
  location = google_cloud_run_v2_service.frontend.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}

# Secret Manager for API keys
resource "google_secret_manager_secret" "google_api_key" {
  secret_id = "google-api-key"

  replication {
    auto {}
  }

  depends_on = [google_project_service.cloud_run]
}

resource "google_secret_manager_secret_version" "google_api_key_version" {
  secret      = google_secret_manager_secret.google_api_key.id
  secret_data = var.google_api_key
}

# BigQuery dataset for security logs
resource "google_bigquery_dataset" "sentinel_logs" {
  dataset_id                 = "sentinel_logs"
  friendly_name              = "SENTINEL-X Security Logs"
  description                = "Dataset for storing threat detection logs and agent actions"
  location                   = var.region
  default_table_expiration_ms = 7776000000 # 90 days

  depends_on = [google_project_service.bigquery]
}

# BigQuery table for threat detections
resource "google_bigquery_table" "threat_detections" {
  dataset_id = google_bigquery_dataset.sentinel_logs.dataset_id
  table_id   = "threat_detections"

  schema = jsonencode([
    {
      name = "timestamp"
      type = "TIMESTAMP"
      mode = "REQUIRED"
    },
    {
      name = "threat_type"
      type = "STRING"
      mode = "REQUIRED"
    },
    {
      name = "severity"
      type = "STRING"
      mode = "REQUIRED"
    },
    {
      name = "source_ip"
      type = "STRING"
      mode = "NULLABLE"
    },
    {
      name = "details"
      type = "JSON"
      mode = "NULLABLE"
    },
    {
      name = "agent_id"
      type = "STRING"
      mode = "REQUIRED"
    }
  ])

  time_partitioning {
    type  = "DAY"
    field = "timestamp"
  }
}

# BigQuery table for agent actions
resource "google_bigquery_table" "agent_actions" {
  dataset_id = google_bigquery_dataset.sentinel_logs.dataset_id
  table_id   = "agent_actions"

  schema = jsonencode([
    {
      name = "timestamp"
      type = "TIMESTAMP"
      mode = "REQUIRED"
    },
    {
      name = "agent_name"
      type = "STRING"
      mode = "REQUIRED"
    },
    {
      name = "action_type"
      type = "STRING"
      mode = "REQUIRED"
    },
    {
      name = "status"
      type = "STRING"
      mode = "REQUIRED"
    },
    {
      name = "details"
      type = "JSON"
      mode = "NULLABLE"
    }
  ])

  time_partitioning {
    type  = "DAY"
    field = "timestamp"
  }
}

# BigQuery table for system events
resource "google_bigquery_table" "system_events" {
  dataset_id = google_bigquery_dataset.sentinel_logs.dataset_id
  table_id   = "system_events"

  schema = jsonencode([
    {
      name = "timestamp"
      type = "TIMESTAMP"
      mode = "REQUIRED"
    },
    {
      name = "event_type"
      type = "STRING"
      mode = "REQUIRED"
    },
    {
      name = "message"
      type = "STRING"
      mode = "REQUIRED"
    },
    {
      name = "metadata"
      type = "JSON"
      mode = "NULLABLE"
    }
  ])

  time_partitioning {
    type  = "DAY"
    field = "timestamp"
  }
}
