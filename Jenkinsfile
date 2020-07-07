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
        sh 'npm install'
      }
    }

    stage('Test') {
      steps {
        echo 'Testing'
        sh 'npm test'
      }
    }

    stage('Build') {
      steps {
        echo 'Building'
        sh 'npm build'
      }
    }

    stage('Deploy') {
      steps {
        echo 'Deploying'
      }
    }

  }
}