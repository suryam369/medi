pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = "suryamurala369"
    }

    triggers {
        githubPush()
    }

    stages {

        stage('Checkout Code') {
            steps {
                sshagent(['github-ssh-key']) {
                    git branch: 'main', url: 'git@github.com:suryam369/medi.git'
                }
            }
        }

        stage('Build Frontend Apps') {
            steps {
                dir('client') {
                    sh """
                        export REACT_APP_BACKEND_URL=http://medi-backend-service:5000
                        npm install
                        npm run build
                    """
                }
                dir('admin') {
                    sh """
                        export REACT_APP_BACKEND_URL=http://medi-backend-service:5000
                        npm install
                        npm run build
                    """
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh """
                    docker build -t $DOCKER_HUB_USER/medi-backend:latest ./backend
                    docker build -t $DOCKER_HUB_USER/medi-client:latest ./client
                    docker build -t $DOCKER_HUB_USER/medi-admin:latest ./admin
                """
            }
        }

        stage('Push Docker Images') {
            steps {
                withCredentials([string(credentialsId: 'dockerhub-pass', variable: 'DOCKER_PASS')]) {
                    sh """
                        echo $DOCKER_PASS | docker login -u $DOCKER_HUB_USER --password-stdin
                        docker push $DOCKER_HUB_USER/medi-backend:latest
                        docker push $DOCKER_HUB_USER/medi-client:latest
                        docker push $DOCKER_HUB_USER/medi-admin:latest
                    """
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh """
                    kubectl apply -f k8s/backend-deployment.yaml
                    kubectl apply -f k8s/admin-deployment.yaml
                    kubectl apply -f k8s/client-deployment.yaml
                    kubectl apply -f k8s/backend-service.yaml
                    kubectl apply -f k8s/admin-service.yaml
                    kubectl apply -f k8s/client-service.yaml
                """
            }
        }
    }

    post {
        success { echo "🚀 Deployment completed successfully!" }
        failure { echo "❌ Deployment failed!" }
    }
}
