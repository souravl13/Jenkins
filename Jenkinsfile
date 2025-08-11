pipeline {
    agent { label 'docker' }

    environment {
        IMAGE_NAME = 'myuser/jenkins-demo'   // Change to your Docker Hub repo
        DOCKER_CREDENTIALS_ID = 'dockerhub-creds' // Jenkins credentials ID
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} ."
                }
            }
        }

        stage('Test') {
            steps {
                sh "docker run --rm ${IMAGE_NAME}:${BUILD_NUMBER} npm test"
            }
        }

        stage('Push to Docker Hub') {
            when {
                expression { return params.PUSH_TO_REGISTRY == true }
            }
            steps {
                withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                    sh "docker tag ${IMAGE_NAME}:${BUILD_NUMBER} ${IMAGE_NAME}:latest"
                    sh "docker push ${IMAGE_NAME}:${BUILD_NUMBER}"
                    sh "docker push ${IMAGE_NAME}:latest"
                }
            }
        }

        stage('Run Container') {
            steps {
                sh "docker run -d -p 3000:3000 ${IMAGE_NAME}:${BUILD_NUMBER}"
            }
        }
    }

    parameters {
        booleanParam(name: 'PUSH_TO_REGISTRY', defaultValue: false, description: 'Push image to Docker Hub?')
    }
}
