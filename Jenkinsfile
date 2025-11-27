pipeline {
    agent any

    environment {
        DOCKER_CRED = credentials('dockerhub-cred')
        REGISTRY = "docker.io/${DOCKER_CRED_USR}"
    }

    stages {
        stage('Checkout') {
    steps {
        git branch: 'main',
            url: 'https://github.com/suryam369/medi.git',
            credentialsId: 'github-cred'
    }
}


        stage('Build Docker Images') {
            steps {
                sh '''
                echo $DOCKER_CRED_PSW | docker login -u $DOCKER_CRED_USR --password-stdin
                
                docker build -t $REGISTRY/medi-backend:latest ./backend
                docker build -t $REGISTRY/medi-client:latest ./client
                docker build -t $REGISTRY/medi-admin:latest ./admin
                '''
            }
        }

        stage('Push Images') {
            steps {
                sh '''
                docker push $REGISTRY/medi-backend:latest
                docker push $REGISTRY/medi-client:latest
                docker push $REGISTRY/medi-admin:latest
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                kubectl apply -f k8s/
                kubectl get pods
                '''
            }
        }
    }

    post {
        always {
            sh 'docker logout || true'
        }
    }
}
