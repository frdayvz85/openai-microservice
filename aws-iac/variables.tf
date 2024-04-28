#### provider Variables defined #######
variable "region" {
  type        = string
  description = "Name of the region to select"
  default     = "eu-central-1"
}


##### Global Variables defined #######

variable "project_name" {
  type        = string
  description = "Global project name"
  default     = "ai-dev"
}

##### VPC Variables defined #######

variable "vpc_name" {
  type        = string
  description = "Name to be used on all the resources as identifier"
  default     = "ai-dev"
}
variable "public_subnets" {
  type        = list(string)
  description = "A list of public subnets inside the VPC"
  default     = ["10.2.1.0/24", "10.2.2.0/24"]
}
variable "private_subnets" {
  type        = list(string)
  description = "A list of private subnets inside the VPC"
  default     = ["10.2.11.0/24", "10.2.12.0/24"]
}

variable "azs" {
  type        = list(string)
  description = "A list of availability zones specified as argument to this module"
  default     = ["eu-central-1a", "eu-central-1b"]
}
variable "enable_nat_gateway" {
  type        = bool
  description = "Should be true if you want to provision NAT Gateways for each of your private networks"
  default     = false
}
variable "single_nat_gateway" {
  type        = bool
  description = "Should be false"
  default     = false
}

variable "one_nat_gateway_per_az" {
  type        = bool
  description = "Should be true if you want only one NAT Gateway per availability zone"
  default     = false
}
variable "enable_dns_hostnames" {
  type        = bool
  description = "Should be true to enable DNS hostnames in the VPC"
  default     = false
}
variable "enable_dns_support" {
  type        = bool
  description = "Should be true to enable DNS support in the VPC"
  default     = true
}
variable "vpc_tags" {
  type    = map(string)
  default = {}
}
variable "igw_tags" {
  type = map(string)
  default = {
    Name = "ai-dev-igw"
  }
}

#### EkS AI Cluster Variables defined #######
variable "ai_cluster_name" {
  type        = string
  description = "Name of the EKS cluster"
  default     = "ai-dev"
}

variable "ai_cluster_endpoint_private_access" {
  type        = bool
  description = "Indicates whether or not the Amazon EKS private API server endpoint is enabled"
  default     = true
}
variable "ai_cluster_endpoint_public_access" {
  type        = bool
  description = "Indicates whether or not the Amazon EKS public API server endpoint is enabled"
  default     = true
}
variable "ai_enable_irsa" {
  type        = bool
  description = "Determines whether to create an OpenID Connect Provider for EKS to enable IRSA"
  default     = true
}
variable "ai_cluster_create_iam_role" {
  type        = bool
  description = "Determines whether to create an IAM role for use with the Amazon EKS cluster"
  default     = false  # Set to true to create the IAM role; set to false if you already have an existing IAM role
}
variable "ai_cluster_iam_role_arn" {
  type        = string
  description = "The Amazon Resource Name (ARN) of the IAM role to be associated with the Amazon EKS cluster"
  default     = "arn:aws:iam::266180588953:role/EKSClusterPolicy"  # Replace with the actual ARN of your IAM role
}

#### EkS NaC Cluster NODE Variables defined #######
variable "ai_node_create_iam_role" {
  type        = bool
  description = "Determines whether to create an IAM role for the Amazon EKS node group"
  default     = false  # Set to true to create the IAM role; set to false if you already have an existing IAM role
}
variable "ai_node_iam_role_arn" {
  type        = string
  description = "The Amazon Resource Name (ARN) of the Amazon EKS node group"
  default     = "arn:aws:iam::266180588953:role/eksCtl"  # Replace with the actual ARN of your IAM role
}
variable "ai_create_node_security_group" {
  type        = bool
  description = "Determines whether to create a security group for the Amazon EKS node group"
  default     = false  # Set to true to create a security group; set to false if you already have an existing security group
}
variable "ai_node_desired_size" {
  type        = number
  description = "The desired number of worker nodes in the Amazon EKS node group"
  default     = 4  # Adjust the default value to your desired number of nodes
}
variable "ai_node_min_size" {
  type        = number
  description = "The minimum number of worker nodes in the Amazon EKS node group"
  default     = 4  # Adjust the default value to your desired minimum number of nodes
}
variable "ai_node_max_size" {
  type        = number
  description = "The maximum number of worker nodes in the Amazon EKS node group"
  default     = 6  # Adjust the default value to your desired maximum number of nodes
}
variable "ai_disk_size" {
  type        = number
  description = "The size of the root volume for worker nodes in the Amazon EKS node group (in GiB)"
  default     = 20  # Adjust the default value to your desired root volume size
}
variable "ai_use_custom_launch_template" {
  type        = bool
  description = "Determines whether to use a custom launch template for the Amazon EKS node group"
  default     = false  # Set to true if using a custom launch template; set to false to use the default launch template
}
variable "ai_create_launch_template" {
  type        = bool
  description = "Determines whether to create a custom launch template for the Amazon EKS node group"
  default     = false  # Set to true to create a custom launch template; set to false if you already have an existing template
}
variable "ai_eks_tags" {
  type = map(string)
  default = {
    Environment = "dev"
  }
}

