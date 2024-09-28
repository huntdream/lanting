pipeline {
  agent {
    node {
      label 'lts'
    }

  }
  stages {
    stage('npm install') {
      steps {
        sh 'npm install'
      }
    }

  }
}