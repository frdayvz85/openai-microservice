### Terraform Quick Start Guide
1. Run `terraform init` in your project directory to initialize your Terraform working directory and download any necessary providers and modules.
```bash
 terraform init
```
2. Run `terraform plan` to generate an execution plan. Terraform will analyze your configuration and show you what actions it will take to reach the desired state.
```bash
 terraform plan
```
3. If the plan looks good, apply it by running `terraform apply`. Terraform will create, update, or delete resources as necessary to match the desired state defined in your configuration.
```bash
 terraform apply
```
4.  If you want to tear down the infrastructure created by Terraform, you can run `terraform destroy`. Be cautious, as this will permanently delete all resources defined in your configuration.
```bash
 terraform destroy
```

Happy Terraforming! 🚀