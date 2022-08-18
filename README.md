# Who is this for?

A person using [Laravel Homestead](https://laravel.com/docs/9.x/homestead) and also working on wordpress projects.

# How does it help ?

It's a simple command to install a wp site locally using [Laravel Homestead](https://laravel.com/docs/9.x/homestead) box

```
ez-wp create my-blog
```

# What does it do ?

1. Create entry in `~/Homestead/Homestead.yaml` for site (change in options)[^1]
2. Adds database entry in `~/Homestead/Homestead.yaml`
3. Creates WP installation folder
4. Adds sitename.test to your `/etc/hosts` file
5. Provision Vagrant Box
6. Opens Default Browser on `sitename.test`

# Prerequisites

You must have Laravel Homestead install for this to work. 

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
