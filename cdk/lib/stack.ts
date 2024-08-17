import * as cdk from 'aws-cdk-lib';
import {
  AmazonLinuxCpuType,
  AmazonLinuxEdition,
  AmazonLinuxGeneration,
  AmazonLinuxImage,
  BlockDeviceVolume,
  CfnEIP,
  Instance,
  InstanceClass,
  InstanceSize,
  InstanceType,
  KeyPair,
  Peer,
  Port,
  SecurityGroup,
  SubnetType,
  UserData,
  Vpc
} from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export class Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new Vpc(this, 'express-toy-vpc', {
      maxAzs: 1,
      subnetConfiguration: [{
        cidrMask: 28,
        name: 'express-toy-subnet',
        subnetType: SubnetType.PUBLIC
      }]
    })

    const securityGroup = new SecurityGroup(this, 'express-toy-sg', {
      vpc,
      allowAllOutbound: true,
      securityGroupName: 'express-toy-sg'
    })

    securityGroup.addIngressRule(Peer.anyIpv4(), Port.HTTP, 'ui')
    securityGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(3000), 'api')
    securityGroup.addIngressRule(Peer.anyIpv4(), Port.SSH, 'ssh')

    const userData = UserData.forLinux()
    userData.addCommands(
      'dnf install -y docker',
      'groupadd docker',
      'gpasswd -a ec2-user docker',
      'systemctl enable docker',
      'systemctl start docker'
    )

    const machineImage = new AmazonLinuxImage({
      edition: AmazonLinuxEdition.STANDARD,
      generation: AmazonLinuxGeneration.AMAZON_LINUX_2023,
      cpuType: AmazonLinuxCpuType.ARM_64,
      userData
    })

    const jenkins = new Instance(this, 'jenkins', {
      vpc,
      securityGroup,
      machineImage,
      instanceName: 'jenkins',
      instanceType: InstanceType.of(InstanceClass.T4G, InstanceSize.LARGE),
      associatePublicIpAddress: true,
      blockDevices: [
        {
          deviceName: '/dev/xvda',
          volume: BlockDeviceVolume.ebs(60)
        }
      ],
      keyPair: KeyPair.fromKeyPairName(this, 'key-pair', 'jim-mbp-personal')
    })

    const jenkinsIp = new CfnEIP(this, 'jenkins-ip', {
      instanceId: jenkins.instanceId
    })
  }
}
