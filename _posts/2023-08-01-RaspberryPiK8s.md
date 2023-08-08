---
title: Raspberry Pi Kubernetes Cluster
date: 2023-08-08 11:33:00 +0800
categories: [Kubernetes, Raspberry Pi]
tags: [Kubernutes, Raspberry Pi]
pin: true
math: true
mermaid: true
image:
  path: /assets/img/kube/cluster.jpeg
---

This is more meant to be a reference of how this cluster was build. I chose to build a two-node bare metal cluster to start but have some extra pi's laying around add later. 

I wanted to gain some new experiences with Kubernetes and docker, so I figured why not build a cluster. I plan to have some of my hobby projects live on it and have some fun experimenting  with new technologies. 

To start I used the ubuntu's cluster guide and random blog posts that I found. 

  <a href="https://ubuntu.com/tutorials/how-to-kubernetes-cluster-on-raspberry-pi#1-overview">Ubuntu cluster Guide</a>

<h2 class="mt-5">Parts</h2>
It was alittle dicey getting Raspberry Pis for a good while, so I was slow to get them and not pay a marked up price. 

Below is the parts list, the switch/router could  be omitted  since the raspberry pis can network into my homes Wi-Fi but I figure it was a good chance to work with a switch and additional router. The case and the charger are nice additions for keeping the cluster neat and tidy. 

### Part List:
1. 3x Raspberry Pi 4b 4GB
2. 3x SanDisk Micro SD card 32 GB
3. 4x 6" CAT6 Ethernet cables
4. 1x Cloudlet cluster case
5. 1x 8 port D-Link switch
6. 1x TP-Link Nano Router WLAN
7. Anker 10 port wall charger
8. Misc usb power cables

<h2 class="mt-5">Network Diagram</h2>
I'm a big fan of drawing things out so below is the basic network  diagram and how it all connects together. 
![Desktop View](/assets/img/kube/networkDiagram.jpg)

I wanted the cluster to sit on its own network as to not clog up my homes network. The nodes talk to the cluster  router through the cluster switch and the cluster router was in bridge mode to talk to work off the home routers connection. I used bridge mode so I could set a different network id for the cluster network (kubenet). 

<h2 class="mt-5">Flashing the Pi's</h2>
Once the setup and wiring was completed, I flashed each Pi using the Raspberry pi Imager. 

I chose to go with the 64 bit Ubuntu Server 23.04 package and set the following options before I flashed the three cards:

- Set the unique host name for each node in the network
- Enabled SSH and copied my key over 
- Created a non-root username and password
- Configured the wifi connection 
- Set the locale settings

<h2 class="mt-5">Installing MicroK8s</h2>
Now onto the fun part of the actual install. For this part I manually SSHed into each Pi but in the future I want to get some Ansible scripts to do it. 

Set up some base features on each pi. 

```shell
sudo sh -c "echo ' cgroup_enable=memory cgroup_memory=1' >> /boot/cmdline.txt"
export LC_ALL=C.UTF-8
export LANG=C.UTF-8
echo "LC_ALL=en_US.UTF-8" | sudo tee -a /etc/environment
echo "en_US.UTF-8 UTF-8" | sudo tee -a /etc/locale.gen
echo "LANG=en_US.UTF-8" | sudo tee -a /etc/locale.conf
sudo locale-gen en_US.UTF-8
sudo /vi/etc/hosts
sudo reboot now
```
> Be sure to add the ip's of the Pi's to the hosts file in both directions. 
Otherwise issues may arise when trying to add nodes. 
{: .prompt-warning }

Installing MicroK8s:
```shell
sudo apt install -y snapd
sudo snap install core
sudo snap install microk8s --classic
sudo usermod -a -G microk8s bpawling
sudo chown -f -R bpawling ~/.kube
```
Now that both Pi's have the base packages installed, we can then add a node to the master. 
On the master run:
```shell
 microk8s.add-node --token-ttl 300
```
Which will return this join command:
```shell
microk8s join 192.168.1.46:25000/05d4f63e1389888ab6bb2ea83871e82b/762d9514a6d9 --worker
```

This command was then run on the worker node and you can see the current nodes on the master by running:
```shell
microk8s.kubectl get node
NAME      STATUS   ROLES    AGE   VERSION
kubepi1   Ready    <none>   12d   v1.27.4
kubepi2   Ready    <none>   12d   v1.27.4
```

Lets install docker on each Pi next.
```shell
sudo apt upgrade -y
sudo apt install -y docker.io
```
> If you forget to install docker on both nodes like me, you will be wondering why only half you pods work..
{: .prompt-warning }

<h2 class="mt-5">Deploying the Dashboard</h2>
Enabling the dashboard is pretty straight forward, enable it, get its ip, and create a token. 

```shell
microk8s enable dns dashboard storage

#Check the current name spaces see the ip for the dashboard
microk8s kubectl get all --all-namespaces | grep kubernetes-dashboard
kube-system          service/kubernetes-dashboard         NodePort       10.152.183.226   <none>        443:30723/TCP            12d

#Generate login token
token=$(microk8s kubectl -n kube-system get secret | grep default-token | cut -d " " -f1) microk8s kubectl -n kube-system describe secret $token

#Use this to just see the token again
microk8s kubectl -n kube-system describe secret $token
```

Now head on over to your favorite browser, add in the the ip of the main cluster node and the opened port (x.x.x.x.x:30723)

Enter the token code:
![Desktop View](/assets/img/kube/KubeDashboard.jpg)

Welcome to your dashboard. Mine has some deployed apps already since I took the screen grab after the fact. 
![Desktop View](/assets/img/kube/KubeDashboard_Main.jpg)

<h2 class="mt-5">Adding your First App</h2>
Lets create our first app using the nginx dockerfile. 

First create a new folder and move into it. The create the Dockerfile. 

```shell
mkdir nginx | cd nginx
vi Dockerfile
```
Contents of Dockerfile

```yaml
#Super simple Dockerfile
FROM nginx
```
Next create a deployment yaml file. 

```shell
vi deploy.yaml
```

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: mynginx:local
        imagePullPolicy: Never
        ports:
          - containerPort: 80
```

Then build the docker image, copy it out to a .tar file, and import it into MicroK8s image store. After that we can deploy it, get the pod, then expose the service so we can reach it from other machines. 

```shell
#Build the image.
docker build . -t mynginx:local
#Check for the built image. 
docker images
#Save the image out to a tarball
docker save mynginx > myimage.tar
#Import the image into the MicroK8s image store
microk8s ctr image import myimage.tar
#Deploy the image
microk8s kubectl apply -f deploy.yaml
#Check the deployment
microk8s kubectl get pods
NAME                                          READY   STATUS    RESTARTS        AGE
nginx-deployment-6dc57b894b-mdxb9             1/1     Running   1 (3h41m ago)   6d1h
#Expose it on the local network
microk8s kubectl expose deployment h --type="NodePort" --port 80
#Grab the port
microk8s kubectl get svc nginx-deployment
NAME               TYPE       CLUSTER-IP       EXTERNAL-IP   PORT(S)        AGE
nginx-deployment   NodePort   10.152.183.185   <none>        80:30209/TCP   6d
```
Navigate to the exposed port and there you have it!
![Desktop View](/assets/img/kube/nginxWelcome.jpg)

