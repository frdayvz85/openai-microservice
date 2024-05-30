module "devvpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.8.0"

  name = var.project_name
  cidr = "10.0.0.0/16"

  enable_nat_gateway     = true
  single_nat_gateway     = true
  one_nat_gateway_per_az = false

  azs             = ["eu-central-1a", "eu-central-1b"]
  private_subnets = ["10.0.11.0/19", "10.0.12.0/19"]
  public_subnets  = ["10.0.21.0/19", "10.0.22.0/19"]

  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Environment = "test"
  }
}
