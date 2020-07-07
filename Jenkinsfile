pipeline {
  agent {
    docker {
      image 'node:12-alpine'
    }

  }
  stages {
    stage('Install') {
      steps {
        echo 'Installing node modules'
        sh 'node -v'
        sh 'npm config set registry https://registry.npm.taobao.org'
        sh 'npm install'
      }
    }

    stage('Test') {
      steps {
        echo 'Testing'
      }
    }

    stage('Build') {
      steps {
        echo 'Building'
        sh 'npm run build'
      }
    }

    stage('Deploy') {
      steps {
        echo 'Deploying'
        sh 'npm run gh-pages'
      }
    }

  }
}