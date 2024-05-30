module "deveks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "18.29.0"

  cluster_name    = var.ai_cluster_name
  cluster_version = "1.24"

  cluster_endpoint_private_access = true
  cluster_endpoint_public_access  = true

  vpc_id     = module.devvpc.vpc_id
  subnet_ids = module.devvpc.private_subnets

  enable_irsa = true

  eks_managed_node_group_defaults = {
    disk_size = 20
  }

  eks_managed_node_groups = {
    primary = {
      desired_size = 2
      min_size     = 2
      max_size     = 5

      labels = {
        role = "primary"
      }

      instance_types = ["t4g.nano"]
      capacity_type  = "ON_DEMAND"
    }
  }

  tags = {
    Environment = "test"
  }
}
