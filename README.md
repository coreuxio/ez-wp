# Who is this for?

A person using [Laravel Homestead](https://laravel.com/docs/9.x/homestead) to develop or test WordPress sites locally. (Mac OS, Linux)

# How does it help ?

It's a simple command to install a wp site locally using [Laravel Homestead](https://laravel.com/docs/9.x/homestead) box. Saves you about `1-2 minutes` of manuall work.

```
ez-wp sitename
```

# What does it do ?

1. Creates entry in `~/Homestead/Homestead.yaml` for sitename (change in options)[^1]
2. Adds database entry in `~/Homestead/Homestead.yaml`
3. Creates WP installation folder `./current-path/sitename`
4. Adds `sitename.test` to your `/etc/hosts` file using the IP in your `Homestead.yaml` file
5. Boots or Reloads vagrant box and adds `--provision` to the vagrant commmand.
6. Opens Default Browser on `sitename.test`

# Prerequisites

You must have [Laravel Homestead](https://laravel.com/docs/9.x/homestead) installed for the `ez-wp` command to work. 

## Installation

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/ez-wp/install/HEAD/install.sh)"
```

## Options

| Option               | Description                                                                           |
| -------------------- | ------------------------------------------------------------------------------------- |
| `-r --root`          | `.` by default, value can be relative path or absiolute path                          |
| `-d --domain`        | By default will user application name unless specififed                               |
| `-wv --wp-v`         | `lts` by default.Allows you to provide wp version                                     |
| `-p --php-v`         | `application-name.test` will be default if not specified                              |
| `-c --cron`          | `false` by default                                                                    |
| `-h --homesteadfile` | `/Homestead/Homestead.yaml` by default unles specifed                                 |
| `-p --provision`     | Will run `vagrant up --provision` or `vagrant reload --provision ` in currrent folder |
| `exec`               | any command to add to `vagrant up` or `vagrant reload`                                |
