pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    environment {
        IMAGE = "prime-number-app:latest"
        KUBECONFIG = "C:/Users/SaiGayathri/.kube/config"
        KUBECTL_EXE = "C:/Users/SaiGayathri/AppData/Local/Programs/DockerDesktop/resources/bin/kubectl.exe"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Run tests') {
            steps {
                bat '''
                    set "PATH=C:/Program Files/nodejs;%PATH%"
                    call "C:/Program Files/nodejs/npm.cmd" test
                '''
            }
        }

        stage('Build Docker image') {
            steps {
                bat '''
                    set "DOCKER_EXE="
                    if exist "C:/Users/SaiGayathri/AppData/Local/Programs/DockerDesktop/resources/bin/docker.exe" set "DOCKER_EXE=C:/Users/SaiGayathri/AppData/Local/Programs/DockerDesktop/resources/bin/docker.exe"
                    if not defined DOCKER_EXE set "DOCKER_EXE=docker"
                    "%DOCKER_EXE%" build -t "%IMAGE%" .
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                bat '''
                    if not exist "%KUBECONFIG%" (
                        echo Kubernetes kubeconfig was not found: %KUBECONFIG%
                        exit /b 1
                    )
                    "%KUBECTL_EXE%" apply -f k8s/deployment.yaml
                    "%KUBECTL_EXE%" apply -f k8s/service.yaml
                    "%KUBECTL_EXE%" rollout restart deployment/prime-number-app
                    "%KUBECTL_EXE%" rollout status deployment/prime-number-app --timeout=180s
                    "%KUBECTL_EXE%" get deployments,pods,services -l app=prime-number-app
                '''
            }
        }
    }

    post {
        success {
            echo 'Prime Number Checker was tested, built and deployed to Kubernetes successfully.'
        }
    }
}
