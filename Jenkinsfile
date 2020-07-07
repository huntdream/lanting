pipeline {
  agent any

  environment {
    CI = true
  }

  stages {
    stage('Install') {
      steps {
        echo 'Installing node modules'
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

    stage('Deploy'){
      steps {
        echo 'Deploying'
      }
    }
  }
}