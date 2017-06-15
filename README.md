# Remote Apprentice Bot
![Screenshot](https://s3.amazonaws.com/media.launchrock.com/assets/sites/site-bvrwu6f6280jiv2xrjws5zdaa/shobmz-citrudev_remoteapprentice.png)
#### install node and npm using NVM

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
```
or 

```bash
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
```
then
```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
```

```bash
nvm install v6.11.0
```
#### install SSL using LetsEncrypt
```bash
$ sudo apt-get install software-properties-common
$ sudo add-apt-repository ppa:certbot/certbot
$ sudo apt-get update
$ sudo apt-get install certbot
```
then
```bash
certbot certonly --standalone -d yoururl.com
```
then
```bash
certbot renew --dry-run
```
#### install PM2
```bash
npm install -g pm2
```

#### clone the repository
```bash
git clone https://github.com/Remote-Apprentice/RAB.git rab
```

#### create a .env file in the root directory
```bash
clientId=YOUR_CLIENT_ID
clientSecret=YOUR_CLIENT_SECRET
token=YOUR_BOT_TOKEN
githubSecret=YOUR_WEBHOOK_SECRET
siteUrl=YOUR_SITE_URL
```
#### start the server
```bash
cd rab
pm2 start app.js
```
#### stop the server
```bash
pm2 stop app
```
