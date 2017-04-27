# Prism Dashboard #
---------------------
This is Dashboard for Prism's Agent and Merchant. Please refer to this for AngularJS Best Practices: https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md

Prerequities?
---------------------
This project uses npm for installing development tools, bower for installing application dependencies and gulp for building the application's assets based on specific environment. First, you need to install bower and gulp client globally into your system :

* Npm - `brew install npm`
* Yarn - `npm install -g yarn`
* Bower - `npm install -g bower`
* Gulp - `npm install -g gulp-cli`
* Karma - `npm install -g karma-cli`

How to Start Development?
---------------------
For the first time : `yarn install && bower install` (download all npm and bower dependencies, build on to development environment)

Second time and after : `npm run start-dev` (run a server and watcher for any changes in less and images folder)

How to Run?
---------------------
For the first time build : `yarn install && bower install`
For the second time and after : run `NODE_ENV=development ./docker/start.sh` then open `localhost:8080` on browser

How to Build?
---------------------
`gulp <environment_name>`

Ex: `gulp development`, `gulp staging`, `gulp production`

How to Deploy? (current development)
---------------------
1. commit and push to bitbucket
2. from server, git pull from bitbucket
3. enter the directory and run `gulp staging` or `gulp production`  
4. with nginx, routing path to [rootapp]/environment_name
5. restart nginx

How to Test?
--------------------
`karma start`

Gulp Tasks
---------------------
To run a specific task, please specify your environment name by running `gulp <task_name> --environment_name`. Ex: `gulp index --staging`.

1. `gulp build-css`: Concatenated all css/less assets and minify to a single file `app.min.css`
2. `gulp build-app-css` : Concatenated all css/less assets into a single file app.css with sourcemaps
3. `gulp build-js`: Concatenated all js assets into a single file `app.min.js`
4. `gulp favicon` : Copy all favicon assets into certain destination folder based on specified environment
5. `gulp images`: Copy all image assets into certain destination folder based on specified environment
6. `gulp fonts`: Copy all fonts assets into certain destination folder based on specified environment
7. `gulp index`: Injecting all css and js source into `index.html` based on specified index template in 8. `assets/templates/index.tpl.html`
8. `gulp html`: Copy all html assets into certain destination folder based on specified environment
9. `gulp env`: Create `app.config.js` based on specified config template in `assets/templates/config.tpl.ejs`
10. `gulp watch`: Watching changes in less, js, and images and run specific task based on the changes

Livereload enables browser to automatically refresh whenever there is changes in files that is being watched.

Important Files
---------------------
- `package.json`: includes the list of development tools (mainly gulp dependencies).
- `bower.json`: includes the list of css and js dependencies used by the application.
- `gulpfile.js`: define the tasks for building the application assets based on specific environment.
- `gulpfile.config.js`: configuration variables and objects for building gulp tasks.


Merchants Setting Template
---------------------
Response for `merchants/setting?island=chat`

```json
{
  "status": "success",
  "message": "OK",
  "data": {
    "chat": {
      "templates": [
        {
          "id": "1c605bf1-fad6-4511-96bf-591f65ec9582",
          "command": "hello",
          "message": "Halo Kakak, ada yang bisa dibantu?"
        }
      ]
    }
  }
}
```

Response for `merchants/setting?island=checkout`

```json
{
  "status": "success",
  "message": "OK",
  "data": {
    "checkout": {
      "payment_methods": [
        {
          "type": "cod",
          "transfer": {
            "bank_name": "",
            "account_number": ""
          }
        },
        {
          "type": "transfer",
          "transfer": {
            "bank_name": "BNI",
            "account_number": "123456"
          }
        }
      ]
    }
  }
}
```
