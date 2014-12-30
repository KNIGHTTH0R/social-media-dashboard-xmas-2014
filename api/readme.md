# How to use the api on your local machine
**Xampp**

1. If you use Xampp go to the vhosts file. For example `D:\xampp\apache\conf\extra` (it depends on where xampp is installed).
2. Open the `httpd-hosts.conf` file.
3. Paste the code below in the file.
4.

```

	<VirtualHost *:80>
			DocumentRoot "projectfolder\app"
			ServerName smdc
			ServerAlias smdc
			<Directory "projectfolder\app">
			AllowOverride All
			Require all Granted
			</Directory>
	</VirtualHost>
	<VirtualHost *:80>
			DocumentRoot "projectfolder\api"
			ServerName smdc.api
			ServerAlias smdc.api
			<Directory "projectfolder\api">

			AllowOverride All
			Require all Granted
			</Directory>
	</VirtualHost>

```

**Hosts**

1. Open your hosts file.
	- You can find that on an Windows Machine `C:\Windows\System32\drivers\etc`
	- On an mac you can find that `/etc/hosts`
2. Past the code below in it.
3.

```

	# socialmedia urls
	127.0.0.1	smdc
	127.0.0.1	smdc.api

```

