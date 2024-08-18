import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export class Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'express-toy-vpc', {
      maxAzs: 1,
      subnetConfiguration: [{
        cidrMask: 28,
        name: 'express-toy-subnet',
        subnetType: ec2.SubnetType.PUBLIC
      }]
    })

    const securityGroup = new ec2.SecurityGroup(this, 'express-toy-sg', {
      vpc,
      allowAllOutbound: true,
      securityGroupName: 'express-toy-sg'
    })

    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.HTTP, 'ui')
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(3000), 'api')
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.SSH, 'ssh')

    const userData = ec2.UserData.forLinux()
    userData.addCommands(
      'dnf install -y docker',
      'groupadd docker',
      'gpasswd -a ec2-user docker',
      'systemctl enable docker',
      'systemctl start docker'
    )

    const machineImage = new ec2.AmazonLinuxImage({
      edition: ec2.AmazonLinuxEdition.STANDARD,
      generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2023,
      cpuType: ec2.AmazonLinuxCpuType.ARM_64,
      userData
    })

    const instanceNames = [ 'jenkins', 'express-toy' ]

    instanceNames.forEach(n => {
      const instance = new ec2.Instance(this, n, {
        vpc,
        securityGroup,
        machineImage,
        instanceName: n,
        instanceType: ec2.InstanceType.of(ec2.InstanceClass.T4G, ec2.InstanceSize.LARGE),
        associatePublicIpAddress: true,
        blockDevices: [
          {
            deviceName: '/dev/xvda',
            volume: ec2.BlockDeviceVolume.ebs(20)
          }
        ],
        keyPair: ec2.KeyPair.fromKeyPairName(this, `${n}-key-pair`, 'jim-mbp-personal')
      })

      new ec2.CfnEIP(this, `${n}-ip`, {
        instanceId: instance.instanceId
      })
    })
  }
}
