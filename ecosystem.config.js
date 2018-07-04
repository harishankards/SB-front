module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
      {
      name      : "S-Burger-frontend",
      script    : "app.js",
      env: {
        COMMON_VARIABLE: "true"
      },
      env_production : {
        NODE_ENV: "production"
      },
      "log_date_format" : "YYYY-MM-DD HH:mm Z"
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    staging: {
      user: "burger",
      host: "studentburger.com",
      ref: "origin/frontend-one",
      repo: "git@git.spritle.com:student-burger/webapp.git",
      path: "/home/burger/apps/student-burger-frontend",
      "post-deploy": "npm install && pm2 startOrRestart ecosystem.config.js --env production"
    }
  }
}
