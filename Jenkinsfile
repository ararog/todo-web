//project CI/CD pipeline config
pipeline {
    agent any
    environment {
        BASE_IMAGE = "registry.local:5000/training/todo-web" 
    }        
    stages {
        stage('Lint') {
            steps {
                script {
                    sh "docker run -e HADOLINT_FAILURE_THRESHOLD=error --rm -i hadolint/hadolint < Dockerfile"
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    sh "docker build -t ${env.BASE_IMAGE} --target builder ."
                }
            }
        }
        // stage('Test') {
        //     steps {
        //         script {
        //             sh "docker run --rm ${env.BASE_IMAGE} test"
        //         }
        //     }
        // }
        stage('Runtime') {
            steps {
                script {
                    sh "docker build -t ${env.BASE_IMAGE} --target runtime ."
                }
            }
        }
        stage('Publish') {
            steps {
                script {
                    sh "docker tag ${env.BASE_IMAGE} ${env.BASE_IMAGE}"
                    sh "docker push ${env.BASE_IMAGE}"
                }
            }
        }
        stage('Deploy') {
            steps {
                withKubeConfig([credentialsId: 'minikube', serverUrl: 'https://192.168.49.2:8443']){
                    sh 'curl -LO "https://storage.googleapis.com/kubernetes-release/release/v1.20.5/bin/linux/amd64/kubectl"'  
                    sh 'chmod u+x ./kubectl'                      
                    sh "./kubectl create -f app-config.yaml"                    
                    sh "./kubectl apply -f app-secrets.yaml -n default"
                    sh "./kubectl apply -f app-service.yaml -n default"
                    sh "./kubectl apply -f app-scaler.yaml -n default"
                    sh "./kubectl apply -f app-rollout.yaml -n default"
                    sh "./kubectl rollout restart deployment/todo-web-deployment"
                }
            }
        }        
    }
} 