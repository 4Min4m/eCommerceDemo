provider "aws" {
  region = "us-east-1"
}

# S3 for Terraform state
resource "aws_s3_bucket" "terraform_state" {
  bucket = "ecommerce-terraform-state-${random_string.suffix.result}"
}

resource "aws_s3_bucket_versioning" "terraform_state_versioning" {
  bucket = aws_s3_bucket.terraform_state.id
  versioning_configuration {
    status = "Enabled"
  }
}

# Random suffix to ensure unique bucket name
resource "random_string" "suffix" {
  length  = 8
  special = false
  upper   = false
}

# SNS Topic
resource "aws_sns_topic" "order_events" {
  name = "order-events"
}

# SQS Queue
resource "aws_sqs_queue" "order_processing_queue" {
  name = "order-processing-queue"
}

# SQS Subscription to SNS
resource "aws_sns_topic_subscription" "sqs_subscription" {
  topic_arn = aws_sns_topic.order_events.arn
  protocol  = "sqs"
  endpoint  = aws_sqs_queue.order_processing_queue.arn
}

# SQS Policy
resource "aws_sqs_queue_policy" "queue_policy" {
  queue_url = aws_sqs_queue.order_processing_queue.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = "*"
      Action = "sqs:SendMessage"
      Resource = aws_sqs_queue.order_processing_queue.arn
      Condition = {
        ArnEquals = {
          "aws:SourceArn" = aws_sns_topic.order_events.arn
        }
      }
    }]
  })
}

output "sns_topic_arn" {
  value = aws_sns_topic.order_events.arn
}